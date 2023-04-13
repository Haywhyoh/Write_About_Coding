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

  async getOne (username) {
    return Cart.findOne({ username });
  }

  async getAll () {
    return Cart.find({});
  }

  async deleteItem (username) {
    return Cart.findOneAndDelete({ username: username });
  }
}

const dbClient = new DbClient();
module.exports = dbClient;
