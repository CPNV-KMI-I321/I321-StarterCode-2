import app from './app.js';

const port = Number(process.env.PORT || 3000);
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`API : http://localhost:${port}/api/pizzas`);
  console.log(`Swagger : http://localhost:${port}/docs`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
