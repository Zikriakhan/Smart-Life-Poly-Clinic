const Booking = require('../models/Booking');

async function getAllBookings(_req, res) {
  const items = await Booking.find().sort({ createdAt: -1 }).lean();
  res.json(items);
}

async function createBooking(req, res) {
  const payload = req.body;
  const item = await Booking.findOneAndUpdate(
    { id: payload.id },
    payload,
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  res.status(201).json(item);
}

async function updateBooking(req, res) {
  const { id } = req.params;
  const payload = req.body;
  const item = await Booking.findOneAndUpdate({ id }, payload, { new: true });
  if (!item) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  return res.json(item);
}

async function deleteBooking(req, res) {
  const { id } = req.params;
  await Booking.findOneAndDelete({ id });
  res.status(204).send();
}

module.exports = {
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking
};
