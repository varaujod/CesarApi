import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import cesarRoutes from './routes/cesarRoutes';
import { swaggerDocument } from './docs/swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ erro: 'JSON inválido no corpo da requisição.' });
    return;
  }
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', cesarRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger UI disponível em http://localhost:${PORT}/api-docs`);
});