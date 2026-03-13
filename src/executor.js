/**
 * Execute a dynamically-generated API handler inside a new Function() scope.
 * Requires the `unsafe_eval` compatibility flag in wrangler.toml.
 *
 * Security note: generated code shares the Worker's V8 isolate, which already
 * has no filesystem or OS access. For stricter sandboxing, consider Worker-to-Worker.
 */
export async function execute(code, req, apiId, env, ctx) {
  // ── Load persistent state from R2 ──────────────────────────────────────────
  const stateKey = 'state/' + apiId + '.json';
  let storeData  = {};
  try {
    const obj = await env.R2.get(stateKey);
    if (obj) storeData = await obj.json();
  } catch {
    // First call or R2 miss — start with empty store
  }

  let dirty = false;
  const store = {
    get(k)    { return storeData[k]; },
    set(k, v) { storeData[k] = v; dirty = true; },
    delete(k) { delete storeData[k]; dirty = true; },
    list()    { return Object.keys(storeData); },
  };

  // ── Execute generated code ──────────────────────────────────────────────────
  let result;
  try {
    // new Function() is enabled by `compatibility_flags = ["unsafe_eval"]`
    // The generated `code` defines `async function handler(req, store)`.
    // Calling handler() returns a Promise we can await outside.
    const fn = new Function('req', 'store', code + '\nreturn handler(req, store);');
    result   = await fn(req, store);
  } catch (err) {
    return { status: 500, body: { error: err.message } };
  }

  // ── Persist state changes asynchronously (non-blocking) ────────────────────
  if (dirty) {
    ctx.waitUntil(
      env.R2.put(stateKey, JSON.stringify(storeData), {
        httpMetadata: { contentType: 'application/json' },
      }),
    );
  }

  // Normalise result shape
  if (!result || typeof result.status !== 'number') {
    return { status: 200, body: result ?? null };
  }
  return result;
}
