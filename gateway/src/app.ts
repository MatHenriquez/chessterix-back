import app from './index';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Gateway service is running on port ${port}`);
});
