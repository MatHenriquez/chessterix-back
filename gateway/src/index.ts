import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app: Express = express();
app.use(morgan('dev'));
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export const server = app.listen(port, () => {
  console.log(`Gateway server is running on port ${port}`);
});
