import * as Pizza from '../entities/Pizza.js';
import { fail, validateId, validatePizza } from '../validation.js';

export function list(req, res) {
  res.json(Pizza.findAll());
}

export function get(req, res) {
  const pizza = Pizza.findById(validateId(req.params.id));
  if (!pizza) fail(404, 'Pizza introuvable.');
  res.json(pizza);
}

export function create(req, res) {
  const pizza = Pizza.create(validatePizza(req.body));
  res.location(`/api/pizzas/${pizza.id}`).status(201).json(pizza);
}

export function update(req, res) {
  const id = validateId(req.params.id);
  if (!Pizza.findById(id)) fail(404, 'Pizza introuvable.');
  res.json(Pizza.update(id, validatePizza(req.body)));
}

export function remove(req, res) {
  if (!Pizza.remove(validateId(req.params.id))) fail(404, 'Pizza introuvable.');
  res.sendStatus(204);
}
