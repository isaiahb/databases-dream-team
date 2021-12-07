const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {type: String, required: true},
  fName: {type: String, required: true},
  lName: {type: String, required: true},
  password: {type: String, required: true},
  dOB: {type: Date, required: true},
  weight: {type: Number, required: true},
  sex: {type: String, required: true},
  rating: {type: Number, required: false},
});

module.exports = mongoose.model('User', UserSchema);

// USER SQL
// email: string,
// fName: string,
// lName: string,
// password: string,
// dOB: Date,
// weight: Number,
// sex: string,
// rating: Number,