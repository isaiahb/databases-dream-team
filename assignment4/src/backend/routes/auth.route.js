const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');
const dotenv = require('dotenv');
dotenv.config();

const JWT_PRIVATE_KEY = process.env._JWT_PRIVATE_KEY;

async function signup(req, res) {
  try {
    const user = await UserService.signup(req.body);
    // set user jwt cookie
		const signed_jwt = jwt.sign({id: user._id, email: user.email}, JWT_PRIVATE_KEY);
		res.cookie('user', signed_jwt);
    return res.json(user);
  }
  catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function login(req, res) {
  try {
    const user = await UserService.login(req.body.email, req.body.password);

		// set user jwt cookie
    const signed_jwt = jwt.sign({id: user._id, email: user.email}, JWT_PRIVATE_KEY);
		res.cookie('user', signed_jwt);
    return res.json(user);
  }
  catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function checkIfEmailIsAvailable(req, res) {
  try {
    const available = await UserService.checkIfEmailIsAvailable(req.params.email);
    return res.json(available);
  }
  catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.get('/auth/isEmailAvailable/:email', checkIfEmailIsAvailable);

module.exports = router;