import { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import Hotel from '../models/hotel';
import { validationResult } from 'express-validator';
import { HotelType } from '../shared/types';

export const myHotelCtrl = {
  create: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json(errors.array());

      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      const imageUrls = await uploadImages(imageFiles);

      newHotel.imgUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).send(hotel);
    } catch (e) {
      console.log('Error creating hotel', e);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const hotels = await Hotel.find({ userId: req.userId }).sort(
        '-updatedAt'
      );
      res.json(hotels);
    } catch (error) {
      console.log('Error creating hotel', error);
      res.status(500).json({ message: 'Error fetching hotels' });
    }
  },
  editHotel: async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    try {
      const hotel = await Hotel.findOne({ _id: id, userId: req.userId });
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching hotels' });
    }
  },
  updateHotel: async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();
      console.log(req.params);

      const hotel = await Hotel.findByIdAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId
        },
        updatedHotel,
        { new: true }
      );
      if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      hotel.imgUrls = [...updatedImageUrls, ...(updatedHotel.imgUrls || [])];

      await hotel.save();

      res.status(201).json(hotel);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString('base64');
    let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI, {
      overwrite: true,
      invalidate: true
    });
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
