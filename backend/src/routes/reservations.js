const express = require('express');
const { body } = require('express-validator');
const { createReservation, getReservations } = require('../controllers/reservationController');
const validate = require('../middleware/validate');

const router = express.Router();

const reservationValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('date').notEmpty().withMessage('Date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('guests').notEmpty().withMessage('Number of guests is required'),
];

router.route('/')
  .post(validate(reservationValidation), createReservation)
  .get(getReservations);

module.exports = router;
