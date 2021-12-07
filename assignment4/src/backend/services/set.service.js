const WorkoutSet = require("../models/workoutSet.model");

async function getById(id) {
  return await WorkoutSet.findById(id);
}

async function createSetForGoal(user, exercise, reps, weight) {
  return await WorkoutSet.create({
    user, 
    exercise,
    reps, weight,
    
    email: user.email, 
    exerciseName: exercise.exerciseName,
  });
}

// async function createSetForWorkoutPlan(user, exercise, reps, weight) {

//   return await WorkoutSet.create({
//     user, 
//     exercise,
//     reps, weight,
    
//     email: user.email, 
//     exerciseName: exercise.exerciseName,
//   });
// }


// Let's a user delete an exercise if they are the one who also created it.
async function deleteSet(setId) {
  const workoutSet = await WorkoutSet.findOneAndDelete({_id: setId});
  return workoutSet;
}

module.exports = {
  getById,
  createSetForGoal,
  deleteSet,
}