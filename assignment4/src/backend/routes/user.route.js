//login #with text code, or phonenumber + password
//signup #first choose phone number && password
//is phone number valid
//verify phone number

const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const UserService = require("../services/user.service");

async function updateProfile(req, res) {
  try {
    const user = await UserService.updateProfile(req.user, req.body);
    return res.json(user);
  }
  catch (error) {
    return res.status(500).send(error);
  }
}

async function me(req, res) {
  try {
    const user = req.user;
    if (!user) throw "not signed in";
    return res.json(user);
  }
  catch (error) {
    return res.status(500).send(error);
  }
}

router.put('/user/profile/', authMiddleware.loggedIn, updateProfile);
router.get('/user/me/', authMiddleware.loggedIn, me);

module.exports = router;