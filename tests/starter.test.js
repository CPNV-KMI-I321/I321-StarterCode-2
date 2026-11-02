import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';

process.env.DB_PATH = ':memory:';
const { default: app } = await import('../src/app.js');
const { db } = await import('../src/config/database.js');
let server;
let base;
before(async () => {
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
  await new Promise(resolve => server.close(resolve));
  db.close();
});
async function request(path, method = 'GET', body) {
  return fetch(base + path, { method, headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(5000),
    ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
}

test('le serveur, Swagger et le contrat HTTP sont disponibles', async () => {
  assert.deepEqual(await (await request('/health')).json(), { status: 'ok' });
  assert.equal((await request('/docs/')).status, 200);
  assert.equal((await request('/openapi.json')).status, 200);
  assert.equal((await request('/api/pizzas')).status, 200);
});


test('le CRUD Pizzas acquis à la séance précédente fonctionne', async () => {
  const response = await request('/api/pizzas', 'POST', { name: 'Exemple', price: 12 });
  assert.equal(response.status, 201);
  const pizza = await response.json();
  assert.equal((await request(`/api/pizzas/${pizza.id}`, 'DELETE')).status, 204);
});
