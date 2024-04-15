import express, { Request, Response, Express, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { HttpError } from './exception/httpExceptions';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('Auth service is running');
});

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).send({
    error: true,
    message: err.message
  });

  next();
});

export const server = app.listen(port, () => {
  console.log(`Gateway server is running on port ${port}`);
});
