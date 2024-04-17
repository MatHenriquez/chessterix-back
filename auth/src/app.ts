import app from './index';
import { initializeDb } from './config/orm.config';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await initializeDb();
  console.log(`Auth server is running on port ${port}`);
});
