const Goal = require("../models/goal.model");
const ExerciseService = require("./exercise.service");
const SetService = require("./set.service");

// Return all the default exercises and exercises created by the user.
async function getUsersGoals(user) {
  return await Goal.find({user}).populate("set");
}

async function getById(id) {
  return await Goal.findById(id);
}

async function create(user, exerciseName, reps, weight) {
  // Ensure exercise is a real exercise
  const exercise = await ExerciseService.getByName(exerciseName);
  if (!exercise) throw exerciseName + " : is not a valid exercise name";

  // Create and save set object
  const set = await SetService.createSetForGoal(user, exercise, reps, weight);
  return await Goal.create({
    user, 
    email: user.email, 
    exerciseName,
    exercise,
    set,
    setID: set._id,
  });
}

// Let's a user delete an exercise if they are the one who also created it.
async function deleteGoal(user, goalId) {
  const _goal = await Goal.findOneAndDelete({_id: goalId, user: user});
  await SetService.deleteSet(_goal.setID);
  return _goal;
}

module.exports = {
  getUsersGoals,
  getById,
  create,
  deleteGoal,
}