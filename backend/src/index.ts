import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3002;
const DB = process.env.DB_URL;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(DB as string);

app.listen(PORT, () => {
  console.log('Server is up on port - ', PORT);
});
