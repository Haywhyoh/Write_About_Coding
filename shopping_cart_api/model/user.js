const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  role: { type: String, default: 'user', required: true }
}, { timestamps: true });

module.exports = Mongoose.model('user', userSchema)
;
