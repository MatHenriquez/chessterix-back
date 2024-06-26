import express, { Request, Response, Express, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import 'reflect-metadata';
import { HttpError } from './utils/httpError';
import { AuthRoutes } from './presentation/routes';

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('Auth service is running');
});

app.use(
  (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    res.status(err.statusCode || 500).send({
      error: true,
      message: err.message
    });

    next();
  }
);

app.use('/', new AuthRoutes().getRouter());

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
