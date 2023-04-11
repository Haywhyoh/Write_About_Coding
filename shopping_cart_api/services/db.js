const Mongoose = require('mongoose');

const Cart = require('../model/product');
class DbClient {
  constructor () {
    const url = 'mongodb://localhost/shopping_cart';
    this.client = Mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  }

  isAlive () {
    const db = Mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('Connected to MongoDb');
    });
  }

  async getOne (id) {
    return Cart.findById(id);
  }

  async getAll () {
    return Cart.find({});
  }

  async deleteItem (id) {
    return Cart.deleteOne({ _id: id });
  }

  async updateItem (id, item, quantity, price) {
    const total = price * quantity;
    Cart.updateOne({ id }, { item, quantity, price, total }, (err, updatedCart) => {
      if (err) {
        return err;
      }
      return updatedCart;
    }
    );
  }
}

const dbClient = new DbClient();
module.exports = dbClient;
