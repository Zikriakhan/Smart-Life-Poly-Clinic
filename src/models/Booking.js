const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    message: { type: String, default: '' },
    status: { type: String, enum: ['Pending', 'Confirmed'], default: 'Pending' },
    submittedAt: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
