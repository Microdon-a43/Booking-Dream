import { body } from 'express-validator';

export const 
hotelValidation = [
  body('name', 'Name is required!').notEmpty(),
  body('city').notEmpty().withMessage('City is required!'),
  body('country').notEmpty().withMessage('Country is required!'),
  body('description').notEmpty().withMessage('Description is required!'),
  body('type').notEmpty().withMessage('Type is required!'),
  body('pricePerNight')
    .notEmpty()
    .isNumeric()
    .withMessage('Price per night is required and musr be a number'),
  body('facilities')
    .notEmpty()
    .isArray()
    .withMessage('Facilities are required!'),
  body('facilities')
    .notEmpty()
    .isArray()
    .withMessage('Facilities are required!')
];
