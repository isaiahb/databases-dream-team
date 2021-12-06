const express = require('express');
const api = express.Router();

//routes
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const exerciseRoute = require("./exercise.route");
const goalsRoute = require("./goals.route");
const oneRepMax = require("./oneRepMax.route");

api.use(authRoute);
api.use(userRoute);
api.use(exerciseRoute);
api.use(goalsRoute);
api.use(oneRepMax);

module.exports = api;