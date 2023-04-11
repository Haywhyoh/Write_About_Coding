const express = require('express');
const router = express.Router();
const { addNewCart, retrieveItems, getItem, deleteItem, updateItem } = require('../controllers/CartController');

router.route('/cart/:id').get(getItem);
router.route('/cart').get(retrieveItems);
router.route('/cart').post(addNewCart);
router.route('/cart/:id').put(updateItem);
router.route('/cart/:id').delete(deleteItem);

module.exports = router;
