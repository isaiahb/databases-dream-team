//login #with text code, or phonenumber + password
//signup #first choose phone number && password
//is phone number valid
//verify phone number

const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const ExerciseService = require("../services/exercise.service");

async function create(req, res) {
  try {
    const exercise = await ExerciseService.create(req.user, req.body.exerciseName, req.body.muscleGroup);
    return res.json(exercise);
  }
  catch (error) {
    return res.status(500).send(error);
  }
}

async function deleteExercise(req, res) {
  try {
    const exercise = await ExerciseService.deleteExercise(req.user, req.params.exerciseName);
    return res.json(exercise);
  }
  catch (error) {
    return res.status(500).send(error);
  }
}

async function getAll(req, res) {
  try {
    const exercises = await ExerciseService.getAll(req.user);
    return res.json(exercises);
  }
  catch (error) {
    return res.status(500).send(error);
  }
}

router.post('/exercise/create/', authMiddleware.loggedIn, create);
router.delete('/exercise/delete/:exerciseName', authMiddleware.loggedIn, deleteExercise);
router.get('/exercise/all/', authMiddleware.loggedIn, getAll);

module.exports = router;