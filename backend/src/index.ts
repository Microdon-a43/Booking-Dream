import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3002;
const DB = process.env.DB_URL;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

mongoose
  .connect(DB as string)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log('Server is up on port - ', PORT);
});
