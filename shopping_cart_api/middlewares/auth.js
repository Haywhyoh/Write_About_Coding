const jwt = require('jsonwebtoken');
const secretKey = 'nanodaodnoae042342fiaduvj0qjda0942342488';

exports.userAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secretKey, (err, decodedData) => {
      if (err) {
        return res.status(401).json({ message: 'Not Authorized' });
      } else {
        if (decodedData.role !== 'user') {
          return res.status(401).json({ message: 'You are not a user' });
        } else {
          req.username = decodedData.username;
          next();
        }
      }
    });
  } else {
    return res.status(401).json({ message: 'Not Authorized as token not found' });
  }
}
;

exports.adminAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secretKey, (err, decodedData) => {
      if (err) {
        return res.status(401).json({ message: 'Not Authorized' });
      } else {
        if (decodedData.role !== 'admin') {
          return res.status(401).json({ message: 'You are not an admin' });
        } else {
          req.username = decodedData.username;
          next();
        }
      }
    });
  } else {
    return res.status(401).json({ message: 'Not Authorized as token not found' });
  }
}
;
