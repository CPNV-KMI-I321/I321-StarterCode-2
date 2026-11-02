export function fail(status, message) {
  throw Object.assign(new Error(message), { status });
}

export function validateId(value) {
  if (!/^[1-9]\d*$/.test(String(value)) || !Number.isSafeInteger(Number(value))) {
    fail(400, 'Identifiant invalide.');
  }
  return Number(value);
}

export function validateIngredient(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) fail(400, 'Objet JSON attendu.');
  const { name, price } = body;
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 100) {
    fail(400, 'Le nom est obligatoire (100 caractères maximum).');
  }
  if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
    fail(400, 'Le prix doit être un nombre positif ou nul.');
  }
  return { name: name.trim(), price };
}

export function validatePizza(body) {
  const { name, price } = validateIngredient(body);
  const { description = '', imageUrl = null } = body;
  if (typeof description !== 'string') fail(400, 'La description doit être un texte.');
  if (imageUrl !== null) {
    try {
      if (!['http:', 'https:'].includes(new URL(imageUrl).protocol)) throw new Error();
      if (typeof imageUrl !== 'string') throw new Error();
    } catch {
      fail(400, "L'image doit être une URL HTTP ou HTTPS.");
    }
  }
  return { name: name.trim(), description, price, imageUrl };
}
