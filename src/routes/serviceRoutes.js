const express = require('express');
const {
  getAllServices,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllServices);
router.post('/', requireAuth, createService);
router.put('/:id', requireAuth, updateService);
router.delete('/:id', requireAuth, deleteService);

module.exports = router;
