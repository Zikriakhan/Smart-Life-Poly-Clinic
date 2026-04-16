const Service = require('../models/Service');

async function getAllServices(_req, res) {
  const items = await Service.find().sort({ createdAt: -1 }).lean();
  res.json(items);
}

async function createService(req, res) {
  const payload = req.body;
  const item = await Service.findOneAndUpdate(
    { id: payload.id },
    payload,
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  res.status(201).json(item);
}

async function updateService(req, res) {
  const { id } = req.params;
  const item = await Service.findOneAndUpdate({ id }, req.body, { new: true });
  if (!item) {
    return res.status(404).json({ message: 'Service not found' });
  }
  return res.json(item);
}

async function deleteService(req, res) {
  await Service.findOneAndDelete({ id: req.params.id });
  res.status(204).send();
}

module.exports = {
  getAllServices,
  createService,
  updateService,
  deleteService
};
