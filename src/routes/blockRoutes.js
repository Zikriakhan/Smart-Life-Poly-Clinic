const express = require('express');
const {
  getAllBlocks,
  createBlock,
  updateBlock,
  deleteBlock
} = require('../controllers/blockController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllBlocks);
router.post('/', requireAuth, createBlock);
router.put('/:id', requireAuth, updateBlock);
router.delete('/:id', requireAuth, deleteBlock);

module.exports = router;
