import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

process.env.DB_PATH = ':memory:';
const { default: app } = await import('../src/app.js');
const { db } = await import('../src/config/database.js');
let server;
let base;
before(async () => {
  server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
  await new Promise(resolve => server.close(resolve));
  db.close();
});
async function request(path, method = 'GET', body) {
  return fetch(base + path, { method,
    headers: { 'Content-Type': 'application/json' },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
}

test('CRUD pizzas et validation HTTP', async () => {
  const input = { name: 'Margherita', description: 'Classique', price: 14.5 };
  let response = await request('/api/pizzas', 'POST', input);
  assert.equal(response.status, 201);
  const pizza = await response.json();
  assert.equal(response.headers.get('location'), `/api/pizzas/${pizza.id}`);
  assert.equal((await (await request('/api/pizzas')).json()).length, 1);
  assert.equal((await (await request(`/api/pizzas/${pizza.id}`)).json()).name, input.name);
  response = await request(`/api/pizzas/${pizza.id}`, 'PUT', { ...input, price: 16 });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).price, 16);
  assert.equal((await request('/api/pizzas', 'POST', { ...input, price: -1 })).status, 400);
  assert.equal((await request('/api/pizzas', 'POST', { ...input, name: ' ' })).status, 400);
  assert.equal((await request('/api/pizzas/abc')).status, 400);
  assert.equal((await request(`/api/pizzas/${pizza.id}`, 'DELETE')).status, 204);
  assert.equal((await request(`/api/pizzas/${pizza.id}`)).status, 404);
  assert.equal((await request(`/api/pizzas/${pizza.id}`, 'PUT', input)).status, 404);
  assert.equal((await request(`/api/pizzas/${pizza.id}`, 'DELETE')).status, 404);
  assert.equal((await request('/openapi.json')).status, 200);
  assert.equal((await request('/docs/')).status, 200);
  const malformed = await fetch(base + '/api/pizzas', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{'
  });
  assert.equal(malformed.status, 400);
});


test('CRUD ingrédients sans régression pizzas', async () => {
  let response = await request('/api/ingredients', 'POST', { name: 'Mozzarella', price: 2 });
  assert.equal(response.status, 201);
  const ingredient = await response.json();
  const path = `/api/ingredients/${ingredient.id}`;
  assert.equal((await (await request('/api/ingredients')).json()).length, 1);
  assert.equal((await (await request(path)).json()).name, 'Mozzarella');
  response = await request(path, 'PUT', { name: 'Mozzarella', price: 3 });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).price, 3);
  for (const body of [{}, { name: '', price: 1 }, { name: 'Sel', price: '1' }, { name: 'Sel', price: -1 }]) {
    assert.equal((await request('/api/ingredients', 'POST', body)).status, 400);
  }
  assert.equal((await request(path, 'DELETE')).status, 204);
  assert.equal((await request(path)).status, 404);
  assert.equal((await request('/api/pizzas')).status, 200);
});
