const DoctorProfile = require('../models/DoctorProfile');

async function getAllDoctorProfiles(_req, res) {
  const items = await DoctorProfile.find().sort({ createdAt: -1 }).lean();
  res.json(items);
}

async function createDoctorProfile(req, res) {
  const payload = req.body;
  const item = await DoctorProfile.findOneAndUpdate(
    { id: payload.id },
    payload,
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  res.status(201).json(item);
}

async function updateDoctorProfile(req, res) {
  const { id } = req.params;
  const item = await DoctorProfile.findOneAndUpdate({ id }, req.body, { new: true });
  if (!item) {
    return res.status(404).json({ message: 'Doctor profile not found' });
  }
  return res.json(item);
}

async function deleteDoctorProfile(req, res) {
  await DoctorProfile.findOneAndDelete({ id: req.params.id });
  res.status(204).send();
}

module.exports = {
  getAllDoctorProfiles,
  createDoctorProfile,
  updateDoctorProfile,
  deleteDoctorProfile
};