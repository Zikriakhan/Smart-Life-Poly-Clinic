const express = require('express');
const {
  getAllDoctorProfiles,
  createDoctorProfile,
  updateDoctorProfile,
  deleteDoctorProfile
} = require('../controllers/doctorProfileController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllDoctorProfiles);
router.post('/', requireAuth, createDoctorProfile);
router.put('/:id', requireAuth, updateDoctorProfile);
router.delete('/:id', requireAuth, deleteDoctorProfile);

module.exports = router;