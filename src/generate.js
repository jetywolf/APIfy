import { json }                from './utils.js';
import { generateApiWithLLM } from './llm.js';

export async function handleGenerate(request, env) {
  const body = await request.json().catch(() => ({}));
  const { description } = body;

  if (!description || description.trim().length < 5)
    return json({ error: 'Description must be at least 5 characters.' }, 400);

  if (description.length > 2000)
    return json({ error: 'Description too long (max 2000 characters).' }, 400);

  if (!env.OPENAI_API_KEY)
    return json({ error: 'OPENAI_API_KEY secret is not configured on this Worker.' }, 500);

  const generated = await generateApiWithLLM(description.trim(), env.OPENAI_API_KEY);

  const id      = crypto.randomUUID().replace(/-/g, '').slice(0, 16);
  const baseUrl = env.BASE_URL || 'https://apiify.workers.dev';

  await env.DB
    .prepare('INSERT INTO apis (id, name, description, code, endpoints) VALUES (?, ?, ?, ?, ?)')
    .bind(id, generated.name, generated.description, generated.code, JSON.stringify(generated.endpoints))
    .run();

  return json({
    id,
    name:        generated.name,
    description: generated.description,
    endpoint:    baseUrl + '/exec/' + id,
    endpoints:   generated.endpoints,
    createdAt:   new Date().toISOString(),
  });
}
