const db = require('../services/db');
const Cart = require('../model/product');

exports.addItem = async (req, res, next) => {
  const items = req.body.items;
  const username = req.username;
  const total = items.map(item => {
    const totalArray = [];
    const itemCost = parseInt(item.price * item.quantity);
    totalArray.push(itemCost);
    return totalArray;
  }).reduce((accumulator, currentVal) =>
    parseInt(accumulator) + parseInt(currentVal)
  );
  await Cart.findOneAndUpdate(
    { username },
    { $set: { items, total, username } },
    { upsert: true, new: true }
  ).then(cart => {
    res.json({ cart });
  });
};

exports.retrieveAllCart = async (req, res, next) => {
  const items = await db.getAll();
  res.status(201).json({
    message: 'All Carts reterieved',
    items
  });
};

exports.getCart = async (req, res, next) => {
  const username = req.username;
  const items = await db.getOne(username);
  res.status(201).json({
    message: ' Cart reterieved',
    items
  });
};

exports.deleteCart = async (req, res, next) => {
  const username = req.username;
  const items = await db.deleteItem(username);
  res.status(201).json({
    message: 'Cart deleted',
    items
  });
};
