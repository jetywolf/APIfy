import { json } from './utils.js';

export async function handleApis(request, env, pathname) {
  const baseUrl  = env.BASE_URL || 'https://apiify.workers.dev';
  const idMatch  = pathname.match(/^\/api\/apis\/([a-zA-Z0-9]+)$/);

  function withMeta(api) {
    return {
      ...api,
      endpoints: JSON.parse(api.endpoints),
      endpoint:  baseUrl + '/exec/' + api.id,
    };
  }

  // GET /api/apis
  if (pathname === '/api/apis' && request.method === 'GET') {
    const { results } = await env.DB
      .prepare('SELECT id,name,description,endpoints,calls_count,created_at FROM apis ORDER BY created_at DESC')
      .all();
    return json(results.map(withMeta));
  }

  // GET /api/apis/:id
  if (idMatch && request.method === 'GET') {
    const api = await env.DB.prepare('SELECT * FROM apis WHERE id = ?').bind(idMatch[1]).first();
    if (!api) return json({ error: 'API not found' }, 404);
    return json(withMeta(api));
  }

  // DELETE /api/apis/:id
  if (idMatch && request.method === 'DELETE') {
    const id = idMatch[1];
    await Promise.all([
      env.DB.prepare('DELETE FROM apis WHERE id = ?').bind(id).run(),
      env.R2.delete('state/' + id + '.json').catch(() => {}),
    ]);
    return json({ ok: true });
  }

  return json({ error: 'Not found' }, 404);
}
