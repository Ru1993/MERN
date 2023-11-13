const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carsSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Cars = mongoose.model('Cars', carsSchema);

module.exports = Cars;
