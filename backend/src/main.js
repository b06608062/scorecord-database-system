import express from 'express';
import cors from 'cors';
import myRoute from './route/index';
import connectDB from './mongo';
import bodyParser from 'body-parser';

connectDB();

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/api', myRoute);

const port = process.env.PORT || 4000
  app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
  });
