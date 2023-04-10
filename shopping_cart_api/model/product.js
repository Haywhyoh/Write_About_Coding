const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const cartSchema = new Schema({
  item: [{
    item: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 }
  }],
  total: { type: Number, required: true }
}, { timestamps: true });

module.exports = Mongoose.model('Cart', cartSchema);
