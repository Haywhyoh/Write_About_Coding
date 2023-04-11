const db = require('../services/db');
const Cart = require('../model/product');

exports.addNewCart = async (req, res, next) => {
  const { item, quantity, price } = req.body;
  await Cart.create({
    item, quantity, price, total: price * quantity
  }).then(cart => {
    res.json({ cart });
  });
};

exports.retrieveItems = async (req, res, next) => {
  const items = await db.getAll();
  res.status(201).json({
    message: 'Items reterieved',
    items
  });
};

exports.getItem = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const items = await db.getOne(id);
  res.status(201).json({
    message: ' Item reterieved',
    items
  });
};

exports.deleteItem = async (req, res, next) => {
  const id = req.params.id;
  const items = await db.deleteItem({ _id: id });
  res.status(201).json({
    message: 'Items deleted',
    items
  });
};

exports.updateItem = async (req, res, next) => {
  const { id, item, quantity, price } = req.body;
  await db.updateItem(id, item, quantity, price).then(cart => {
    res.json({ cart });
  }).catch(err => {
    res.json({ error: err.message });
  });
};
