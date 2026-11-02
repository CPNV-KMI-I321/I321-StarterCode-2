const pizza = {
  type: 'object', required: ['name', 'price'],
  properties: {
    id: { type: 'integer', readOnly: true },
    name: { type: 'string', minLength: 1, maxLength: 100, example: 'Margherita' },
    description: { type: 'string', example: 'Tomate et mozzarella' },
    price: { type: 'number', minimum: 0, example: 14.5 },
    imageUrl: { type: 'string', nullable: true, example: 'https://example.com/pizza.jpg' }
  }
};
const ingredient = {
  type: 'object', required: ['name', 'price'],
  properties: {
    id: { type: 'integer', readOnly: true },
    name: { type: 'string', minLength: 1, maxLength: 100, example: 'Mozzarella' },
    price: { type: 'number', minimum: 0, example: 2 }
  }
};

function crudPaths(resource, schema) {
  const content = { 'application/json': { schema } };
  const body = { required: true, content };
  const errors = {
    400: { description: 'Requête invalide' }, 404: { description: 'Ressource introuvable' },
    409: { description: 'Conflit' }, 500: { description: 'Erreur interne' },
    503: { description: 'Service indisponible' }
  };
  return {
    [`/api/${resource}`]: {
      get: { tags: [resource], summary: 'Lister', responses: {
        200: { description: 'Liste', content: { 'application/json': { schema: { type: 'array', items: schema } } } }
      } },
      post: { tags: [resource], summary: 'Créer', requestBody: body,
        responses: { 201: { description: 'Création réussie', content }, ...errors } }
    },
    [`/api/${resource}/{id}`]: {
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', minimum: 1 } }],
      get: { tags: [resource], summary: 'Consulter', responses: { 200: { description: 'Ressource', content }, ...errors } },
      put: { tags: [resource], summary: 'Remplacer', requestBody: body,
        responses: { 200: { description: 'Modification réussie', content }, ...errors } },
      delete: { tags: [resource], summary: 'Supprimer', responses: { 204: { description: 'Suppression réussie' }, ...errors } }
    }
  };
}

export default {
  openapi: '3.0.3', info: { title: 'Foodtruck API', version: '2.0.0' },
  paths: { ...crudPaths('pizzas', pizza), ...crudPaths('ingredients', ingredient) }
};
