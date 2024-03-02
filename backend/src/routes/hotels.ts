import express from 'express';
import { searchHotels } from '../controllers/hotelsCtrl';

const router = express.Router();

router.get('/search', searchHotels);

export default router;
