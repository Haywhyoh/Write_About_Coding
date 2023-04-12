const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const cartSchema = new Schema({
  items: [{
    item: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 }
  }],
  total: { type: Number, default: 0 },
  user: {
    type: String,
    ref: 'user'
  }
}, { timestamps: true });

module.exports = Mongoose.model('Cart', cartSchema);
