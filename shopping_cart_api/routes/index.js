const express = require('express');
const router = express.Router();
const { addNewCart, retrieveItems, getItem, deleteItem, updateItem } = require('../controllers/CartController');
const { login, register } = require('../auth/auth');
const { userAuth } = require('../middlewares/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/cart/:id').get(getItem);
router.route('/cart').get(retrieveItems);
router.route('/cart').post(userAuth, addNewCart);
router.route('/cart/:id').put(userAuth, updateItem);
router.route('/cart/:id').delete(userAuth, deleteItem);

module.exports = router;
