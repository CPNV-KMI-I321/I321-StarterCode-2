export default function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  const status = error.status || 500;
  if (status >= 500) console.error(error.message);
  res.status(status).json({ error: status === 500 ? 'Erreur interne du serveur.' : error.message });
}
