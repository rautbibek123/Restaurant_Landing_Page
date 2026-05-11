const Reservation = require('../models/Reservation');
const sendEmail = require('../config/nodemailer');

// @desc    Create a new reservation
// @route   POST /api/reservations
// @access  Public
exports.createReservation = async (req, res, next) => {
  try {
    const { name, email, phone, date, time, guests, message } = req.body;

    const reservation = await Reservation.create({
      name,
      email,
      phone,
      date,
      time,
      guests,
      message,
    });

    // Send confirmation email to guest
    const emailMessage = `
      Dear ${name},
      
      Thank you for choosing Annapurna Kitchen! 🏔️
      
      Your reservation request has been received for:
      Date: ${date}
      Time: ${time}
      Guests: ${guests}
      
      We look forward to serving you authentic Himalayan flavors.
      
      Warm regards,
      The Annapurna Kitchen Team
    `;

    await sendEmail({
      email: reservation.email,
      subject: 'Annapurna Kitchen - Reservation Received',
      message: emailMessage,
    });

    res.status(201).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private/Admin
exports.getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find().sort('-createdAt');
    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    next(error);
  }
};
