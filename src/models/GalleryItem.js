const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    src: { type: String, required: true },
    alt: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
