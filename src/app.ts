import express, { Request, Response, NextFunction } from 'express';
import cesarRoutes from './routes/cesarRoutes';
import { ErrorResponse } from './model/CesarModel';

const app = express();

app.use(express.json());

// Documentação interativa Swagger // quando for criado

// Rotas da API
app.use('/', cesarRoutes);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof SyntaxError && 'body' in err) {
    const payload: ErrorResponse = { erro: 'JSON inválido no corpo da requisição.' };
    res.status(400).json(payload);
    return;
  }

  const payload: ErrorResponse = { erro: 'Erro interno no servidor.' };
  res.status(500).json(payload);
});

export default app;