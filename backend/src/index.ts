import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import multer from 'multer';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import myHotelRoutes from './routes/my-hotels';
import hotelRoutes from './routes/hotels';

const app = express();
const PORT = process.env.PORT || 3002;
const DB = process.env.DB_URL;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(morgan('dev'));

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 //5mb
  }
});

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/my-hotels', upload.array('imgFiles', 6), myHotelRoutes);
app.use('/api/hotels', hotelRoutes);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

mongoose.connect(DB as string);

app.listen(PORT, () => {
  console.log('Server is up on port - ', PORT);
});
