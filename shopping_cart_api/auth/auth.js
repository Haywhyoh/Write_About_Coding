const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../model/user');

const secretKey = 'nanodaodnoae042342fiaduvj0qjda0942342488';

exports.register = async (req, res, next) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 19);

  if (password.length < 7) {
    return res.status(400).json({ error: 'Password too short' });
  }

  try {
    user.create({
      username,
      password: hashed
    }).then(user => {
      const maxTime = 1 * 60 * 60;
      const token = jwt.sign({ id: user._id, username, role: user.role },
        secretKey,
        {
          expiresIn: maxTime
        });
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: maxTime * 1000
      });
      res.status(201).json({
        message: 'User created',
        userId: user._id
      });
    });
  } catch (err) {
    res.status(401).json({
      error: err.message,
      message: 'User not created'
    });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(403).json({
      error: 'Username and Password missed'
    });
  }

  try {
    const userDetails = await user.findOne({ username });
    if (!userDetails) {
      res.status(401).json({
        message: 'Login not successful',
        error: 'User not Found'
      });
    } else {
      bcrypt.compare(password, userDetails.password).then(
        result => {
          if (result) {
            const maxTime = 3 * 60 * 60;
            const token = jwt.sign({
              id: userDetails.id,
              username,
              role: userDetails.role
            }, secretKey, {
              expiresIn: maxTime
            });
            res.cookie('jwt', token,
              {
                httpOnly: true,
                maxAge: maxTime * 10000
              }
            );

            res.status(200).json({
              message: 'User found',
              id: userDetails.id
            });
          } else {
            res.status(400).json({
              message: 'Login unsuccessful'
            });
          }
        });
    }
  } catch (err) {
    res.status(400).json({
      message: 'An error occured',
      error: err.message
    });
  }
};
