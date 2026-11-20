import express, { Request, Response, NextFunction } from 'express';
import cesarRoutes from './routes/cesarRoutes';

const app = express();

app.use(express.json());

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ erro: 'JSON inválido no corpo da requisição.' });
    return;
  }
  next();
});

// Documentação interativa Swagger // quando for criado

// Rotas da API
app.use('/', cesarRoutes);

export default app;