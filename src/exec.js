import { json }    from './utils.js';
import { execute } from './executor.js';

export async function handleExec(request, env, ctx, url, pathname) {
  // pathname = /exec/:id[/rest/of/path]
  const parts = pathname.slice(1).split('/');   // ['exec','<id>','sub','path',…]
  const apiId = parts[1];
  if (!apiId) return json({ error: 'Missing API ID.' }, 400);

  const subPath = '/' + parts.slice(2).join('/');

  // Load code from D1
  const api = await env.DB.prepare('SELECT code FROM apis WHERE id = ?').bind(apiId).first();
  if (!api) return json({ error: 'API not found.' }, 404);

  // Parse request body
  let body = null;
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    const ct = request.headers.get('content-type') || '';
    try {
      body = ct.includes('application/json') ? await request.json() : await request.text();
    } catch { body = null; }
  }

  const req = {
    method:  request.method,
    path:    subPath || '/',
    query:   Object.fromEntries(url.searchParams),
    body,
    headers: Object.fromEntries(request.headers),
  };

  const result = await execute(api.code, req, apiId, env, ctx);

  // Increment call counter (fire-and-forget)
  ctx.waitUntil(
    env.DB.prepare('UPDATE apis SET calls_count = calls_count + 1 WHERE id = ?').bind(apiId).run(),
  );

  return new Response(JSON.stringify(result.body ?? null), {
    status: result.status || 200,
    headers: {
      'Content-Type':                'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      ...(result.headers || {}),
    },
  });
}
