const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const WorkoutService = require("../services/workout.service");

async function createWorkoutPlan(req, res) {
  try {
    const workoutPlan = await WorkoutService.createWorkoutPlan(req.user, req.body.name, req.body.sets);
    return res.json(workoutPlan);
  }
  catch (error) {
    return res.status(500).send(error);
  }
}

async function deleteWorkoutPlan(req, res) {
  try {
    const workoutPlan = await WorkoutService.deleteWorkoutPlanById(req.user, req.params.id);
    return res.json(workoutPlan);
  }
  catch (error) {
    return res.status(500).send(error);
  }
}

async function getUsersWorkoutPlans(req, res) {
  try {
    const workoutPlans = await WorkoutService.getUsersWorkoutPlans(req.user);
    return res.json(workoutPlans);
  }
  catch (error) {
    return res.status(500).send(error);
  }
}

router.post('/workout/create-plan/', authMiddleware.loggedIn, createWorkoutPlan);
router.delete('/workout/delete-plan/:id', authMiddleware.loggedIn, deleteWorkoutPlan);
router.get('/workout/my-plans/', authMiddleware.loggedIn, getUsersWorkoutPlans);

module.exports = router;