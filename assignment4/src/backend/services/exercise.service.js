const Exercise = require("../models/exercise.model");

// Return all the default exercises and exercises created by the user.
async function getAll(user) {
  return await Exercise.find({
    $or: [
      {user: null}, 
      {user: user}
    ],
  });
}

async function getById(id) {
  return await Exercise.findById(id);
}

async function getByName(name) {
  return await Exercise.findOne({name});
}

async function create(user, exerciseName, muscleGroup) {
  const _exercise = await Exercise.findOne({
    exerciseName,
    $or: [
      {user: null}, 
      {user: user}
    ],
  });

  if (_exercise) throw "An exercise with the name " + exerciseName + " already exists!";
  return await Exercise.create({user, email: user.email, exerciseName, muscleGroup});
}

// Let's a user delete an exercise if they are the one who also created it.
async function deleteExercise(user, exerciseName) {
  const _exercise = await Exercise.deleteOne({
    exerciseName,
    user
  });
  return _exercise;
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  deleteExercise,
}