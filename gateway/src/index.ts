import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(
  '/auth',
  createProxyMiddleware({
    target: process.env.AUTH_URL || 'http://localhost:8001',
    changeOrigin: true
  })
);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export const server = app.listen(port, () => {
  console.log(`Gateway server is running on port ${port}`);
});
