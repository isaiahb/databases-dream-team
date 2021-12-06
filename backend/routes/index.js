const express = require('express');
const api = express.Router();

//routes
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const exerciseRoute = require("./exercise.route");

api.use(authRoute);
api.use(userRoute);
api.use(exerciseRoute);

module.exports = api;