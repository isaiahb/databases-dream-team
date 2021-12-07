const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const GoalsService = require("../services/goals.service");

async function create(req, res) {
  try {
    const goal = await GoalsService.create(req.user, req.body.exerciseName, req.body.reps, req.body.weight);
    return res.json(goal);
  }
  catch (error) {
    return res.status(500).send(error);
  }
}

async function deleteGoal(req, res) {
  try {
    const goal = await GoalsService.deleteGoal(req.user, req.params.id);
    return res.json(goal);
  }
  catch (error) {
    return res.status(500).send(error);
  }
}

async function getUsersGoals(req, res) {
  try {
    const goals = await GoalsService.getUsersGoals(req.user);
    return res.json(goals);
  }
  catch (error) {
    return res.status(500).send(error);
  }
}

router.post('/goals/create/', authMiddleware.loggedIn, create);
router.delete('/goals/delete/:id', authMiddleware.loggedIn, deleteGoal);
router.get('/goals/my-goals/', authMiddleware.loggedIn, getUsersGoals);

module.exports = router;