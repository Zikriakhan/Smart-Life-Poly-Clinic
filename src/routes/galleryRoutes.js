const express = require('express');
const {
  getAllGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllGalleryItems);
router.post('/', requireAuth, createGalleryItem);
router.put('/:id', requireAuth, updateGalleryItem);
router.delete('/:id', requireAuth, deleteGalleryItem);

module.exports = router;
