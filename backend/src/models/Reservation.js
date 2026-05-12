const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: null
  },
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  date: {
    type: String,
    required: [true, 'Please provide a date'],
  },
  time: {
    type: String,
    required: [true, 'Please provide a time'],
  },
  guests: {
    type: String,
    required: [true, 'Please specify the number of guests'],
  },
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  tableNumber: {
    type: Number,
    min: 1,
    max: 12,
    default: null
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reservation', reservationSchema);
