// const WorkoutPlan = require("../models/workoutPlan.model");
// const WorkoutSet = require("../models/workoutSet.model");

// // Return all the default exercises and exercises created by the user.
// async function getUsersWorkoutPlans(user) {
//   return await WorkoutPlan.find({ user });
// }

// async function getWorkoutPlanById(id) {
//   return await WorkoutPlan.findById(id);
// }

// async function deleteWorkoutPlanById(user, id) {
//   return await WorkoutPlan.findOneAndDelete({_id: id, user: user});
// }

// async function createWorkoutPlan(user, name, sets) {

//   // Create sets
//   const _sets = [];
//   for (const set of sets) {
//     const _set = await WorkoutSet.create({ ...set, user, email: user.email, });
//     _sets.push(_set);
//   }

//   // Create and save set object
//   const workoutPlan = await WorkoutPlan.create({
//     user,
//     name,
//     sets: _sets,

//     email: user.email,
//   });

//   return workoutPlan;
// }

// module.exports = {
//   getUsersWorkoutPlans,
//   getWorkoutPlanById,
//   createWorkoutPlan,
//   deleteWorkoutPlanById,
// }