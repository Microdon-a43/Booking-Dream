import express from 'express';
import { hotelCtrl } from '../controllers/hotelCtrl';
import { verifyToken } from '../middlewares/auth';
import { hotelValidation } from '../validations/hotel';

const router = express.Router();

router.post('/', verifyToken, hotelValidation, hotelCtrl.create);
router.get('/', verifyToken, hotelCtrl.getAll);
router.get('/:id', verifyToken, hotelCtrl.editHotel);
router.put('/:hotelId', verifyToken, hotelCtrl.updateHotel);

export default router;
