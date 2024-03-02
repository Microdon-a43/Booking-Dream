import express from 'express';
import { myHotelCtrl } from '../controllers/myHotelCtrl';
import { verifyToken } from '../middlewares/auth';
import { hotelValidation } from '../validations/hotel';

const router = express.Router();

router.post('/', verifyToken, hotelValidation, myHotelCtrl.create);
router.get('/', verifyToken, myHotelCtrl.getAll);
router.get('/:id', verifyToken, myHotelCtrl.editHotel);
router.put('/:hotelId', verifyToken, myHotelCtrl.updateHotel);

export default router;
