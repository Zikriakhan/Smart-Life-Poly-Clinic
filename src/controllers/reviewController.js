const Review = require('../models/Review');

async function getAllReviews(_req, res) {
  const items = await Review.find().sort({ createdAt: -1 }).lean();
  res.json(items);
}

async function createReview(req, res) {
  const payload = req.body;
  const item = await Review.findOneAndUpdate(
    { id: payload.id },
    payload,
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  res.status(201).json(item);
}

async function updateReview(req, res) {
  const item = await Review.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  if (!item) {
    return res.status(404).json({ message: 'Review not found' });
  }
  return res.json(item);
}

async function deleteReview(req, res) {
  await Review.findOneAndDelete({ id: req.params.id });
  res.status(204).send();
}

module.exports = {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview
};
