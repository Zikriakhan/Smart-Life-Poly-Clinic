const express = require('express');
const {
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createBooking);
router.get('/', requireAuth, getAllBookings);
router.put('/:id', requireAuth, updateBooking);
router.delete('/:id', requireAuth, deleteBooking);

module.exports = router;
