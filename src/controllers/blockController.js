const ContentBlock = require('../models/ContentBlock');

async function getAllBlocks(_req, res) {
  const items = await ContentBlock.find().sort({ createdAt: -1 }).lean();
  res.json(items);
}

async function createBlock(req, res) {
  const payload = req.body;
  const item = await ContentBlock.findOneAndUpdate(
    { id: payload.id },
    payload,
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  res.status(201).json(item);
}

async function updateBlock(req, res) {
  const item = await ContentBlock.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  if (!item) {
    return res.status(404).json({ message: 'Content block not found' });
  }
  return res.json(item);
}

async function deleteBlock(req, res) {
  await ContentBlock.findOneAndDelete({ id: req.params.id });
  res.status(204).send();
}

module.exports = {
  getAllBlocks,
  createBlock,
  updateBlock,
  deleteBlock
};
