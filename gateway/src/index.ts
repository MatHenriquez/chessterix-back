import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app: Express = express();
app.use(morgan('dev'));
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Chessterix API');
});

export default app;
