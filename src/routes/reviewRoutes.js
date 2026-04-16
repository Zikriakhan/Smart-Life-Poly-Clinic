const express = require('express');
const {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllReviews);
router.post('/', requireAuth, createReview);
router.put('/:id', requireAuth, updateReview);
router.delete('/:id', requireAuth, deleteReview);

module.exports = router;
