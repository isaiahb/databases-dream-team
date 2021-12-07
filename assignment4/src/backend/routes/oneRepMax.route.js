const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const OneRepMaxService = require("../services/oneRepMax.service");

async function create(req, res) {
  try {
    const oneRepMax = await OneRepMaxService.create(req.user, req.body.exerciseName, req.body.weight);
    return res.json(oneRepMax);
  }
  catch (error) {
    return res.status(500).send(error);
  }
}

async function deleteOneRepMax(req, res) {
  try {
    const oneRepMax = await OneRepMaxService.deleteOneRepMax(req.user, req.params.id);
    return res.json(oneRepMax);
  }
  catch (error) {
    return res.status(500).send(error);
  }
}

async function getUsersOneRepMaxs(req, res) {
  try {
    const oneRepMaxs = await OneRepMaxService.getUsersOneRepMaxs(req.user);
    return res.json(oneRepMaxs);
  }
  catch (error) {
    return res.status(500).send(error);
  }
}

router.post('/one-rep-max/create/', authMiddleware.loggedIn, create);
router.delete('/one-rep-max/delete/:id', authMiddleware.loggedIn, deleteOneRepMax);
router.get('/one-rep-max/my/', authMiddleware.loggedIn, getUsersOneRepMaxs);

module.exports = router;