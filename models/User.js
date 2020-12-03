// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
// It manages relationships between data, provides schema validation,
// and is used to translate between objects in code and the representation of those objects in MongoDB.

const mongoose = require('mongoose');

// Defines schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Defines model, assign to User, then export User model
module.exports = User = mongoose.model('user', UserSchema);
