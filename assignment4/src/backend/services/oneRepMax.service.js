const OneRepMax = require("../models/oneRepMax.model");
const ExerciseService = require("./exercise.service");

// Return all the default exercises and exercises created by the user.
async function getUsersOneRepMaxs(user) {
  return await OneRepMax.find({user});
}

async function getById(id) {
  return await OneRepMax.findById(id);
}

async function create(user, exerciseName, weight) {
  // Ensure exercise is a real exercise
  const exercise = await ExerciseService.getByName(exerciseName);
  if (!exercise) throw exerciseName + " : is not a valid exercise name";

  // Create and save set object
  return await OneRepMax.create({
    user, 
    exercise,
    weight,

    email: user.email, 
    exerciseName,
  });
}

// Let's a user delete an exercise if they are the one who also created it.
async function deleteOneRepMax(user, id) {
  return await OneRepMax.findOneAndDelete({_id: id, user: user});
}

module.exports = {
  getUsersOneRepMaxs,
  getById,
  create,
  deleteOneRepMax,
}