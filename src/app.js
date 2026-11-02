import express from 'express';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/index.js';
import specification from './openapi.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(express.json({ limit: '100kb' }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/openapi.json', (req, res) => res.json(specification));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specification));
app.use('/api', routes);
app.use((req, res) => res.status(404).json({ error: 'Route introuvable.' }));
app.use(errorHandler);
export default app;
