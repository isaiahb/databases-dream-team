const mongoose = require('mongoose');

const WorkoutSetSchema = new mongoose.Schema({
  exerciseName: { type: String, required: false },
  email: { type: String, required: false },

  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  
  // Mongoose only properties
  user: { type: mongoose.Schema.ObjectId, ref: ("User"), required: false},
  exercise: { type: mongoose.Schema.ObjectId, ref: ("Exercise"), required: false},
});

module.exports = mongoose.model('WorkoutSet', WorkoutSetSchema);

// Exercise SQL
// exerciseName: string, - Exercise Primary Key
// email: string | null, - User Primary Key
// reps: number,
// weight: number,