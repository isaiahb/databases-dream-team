const User = require("../models/user.model");
const bcrypt = require("bcrypt");

async function updateProfile(user, update) {
  const conditions = { _id: user._id };
  const _update = {
    ...update,
    password: update.password ? await bcrypt.hash(update.password) : user.password,
  }
  const _user = await User.findOneAndUpdate(conditions, _update);
  if (!_user) throw "user param is not a valid user!";
  return _user;
}

async function login(email, password) {
  
  const user = await User.findOne({email});
  console.log("login", user);
  if (!user) throw "no user exists with the email: " + email;
  if (await bcrypt.compare(password, user.password)) {
    return user;
  }
  throw "Incorrect password";
}

async function signup({fName, lName, email, password, dOB, weight, sex}) {
  const user = await User.findOne({email});
  if (user) throw "user with the email: " + email + " already exists!";
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({fName, lName, email, password: hashedPassword, dOB, weight, sex});
}

async function getById(id) {
  return await User.findById(id);
}

async function getByEmail(email) {
  return await User.findOne({email});
}

async function checkIfEmailIsAvailable(email) {
  return !(await User.findOne({email}));
}

module.exports = {
  updateProfile,
  login,
  signup,
  getById,
  getByEmail,
  checkIfEmailIsAvailable,
}