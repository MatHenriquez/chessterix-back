import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app: Express = express();

app.use(morgan('dev'));

app.use(
  '/auth',
  createProxyMiddleware({
    target: process.env.AUTH_URL || 'http://localhost:8001',
    changeOrigin: true
  })
);

app.get('/', (req: Request, res: Response) => {
  res.send('Chessterix API');
});

export default app;
