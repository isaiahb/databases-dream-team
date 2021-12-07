const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  exerciseName: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  email: { type: String, required: true },
  
  // Mongoose only properties
  user: { type: mongoose.Schema.ObjectId, ref: ("User"), required: false, default: null },
});

module.exports = mongoose.model('Exercise', ExerciseSchema);

// Exercise SQL
// exerciseName: string,
// muscleGroup: string,
// email: string | null,