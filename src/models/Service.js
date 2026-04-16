const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: String, required: true },
    features: { type: [String], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
