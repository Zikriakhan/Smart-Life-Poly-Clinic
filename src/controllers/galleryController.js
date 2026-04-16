const GalleryItem = require('../models/GalleryItem');

async function getAllGalleryItems(_req, res) {
  const items = await GalleryItem.find().sort({ createdAt: -1 }).lean();
  res.json(items);
}

async function createGalleryItem(req, res) {
  const payload = req.body;
  const item = await GalleryItem.findOneAndUpdate(
    { id: payload.id },
    payload,
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  res.status(201).json(item);
}

async function updateGalleryItem(req, res) {
  const item = await GalleryItem.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  if (!item) {
    return res.status(404).json({ message: 'Gallery item not found' });
  }
  return res.json(item);
}

async function deleteGalleryItem(req, res) {
  await GalleryItem.findOneAndDelete({ id: req.params.id });
  res.status(204).send();
}

module.exports = {
  getAllGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
};
