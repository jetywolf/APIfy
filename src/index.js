import { handleGenerate } from './generate.js';
import { handleApis }     from './apis.js';
import { handleExec }     from './exec.js';
import { html }           from './frontend.js';
import { json, CORS }     from './utils.js';

// Schema is created once per isolate warm-up
let schemaReady = false;
async function ensureSchema(db) {
  if (schemaReady) return;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS apis (
      id          TEXT    PRIMARY KEY,
      name        TEXT    NOT NULL,
      description TEXT    NOT NULL,
      code        TEXT    NOT NULL,
      endpoints   TEXT    NOT NULL,
      calls_count INTEGER NOT NULL DEFAULT 0,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `);
  schemaReady = true;
}

export default {
  async fetch(request, env, ctx) {
    // CORS preflight
    if (request.method === 'OPTIONS')
      return new Response(null, { status: 204, headers: CORS });

    const url      = new URL(request.url);
    const pathname = url.pathname;

    try {
      await ensureSchema(env.DB);

      if (pathname === '/api/generate' && request.method === 'POST')
        return await handleGenerate(request, env);

      if (pathname.startsWith('/api/apis'))
        return await handleApis(request, env, pathname);

      if (pathname.startsWith('/exec/'))
        return await handleExec(request, env, ctx, url, pathname);

      if (pathname === '/health')
        return json({ ok: true, ts: Date.now() });

      // Serve frontend for every other path (SPA)
      return new Response(html(env.BASE_URL || url.origin), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    } catch (err) {
      console.error(err.stack || err.message);
      return json({ error: err.message }, 500);
    }
  },
};
