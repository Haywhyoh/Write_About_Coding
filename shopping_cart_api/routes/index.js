const express = require('express');
const router = express.Router();
const { addItem, retrieveAllCart, getCart, deleteCart } = require('../controllers/CartController');
const { login, register } = require('../auth/auth');
const { userAuth, adminAuth } = require('../middlewares/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/cart').get(userAuth, getCart);
router.route('/cart').get(adminAuth, retrieveAllCart);
router.route('/cart').post(userAuth, addItem);
router.route('/cart').put(userAuth, addItem);
router.route('/cart').delete(userAuth, deleteCart);

module.exports = router;
