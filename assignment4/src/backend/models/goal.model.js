const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  email: { type: String, required: true },
  setID: { type: String, required: false },
  goalID: { type: String, required: false },
  exerciseName: { type: String, required: true },
  
  isComplete: { type: Boolean, required: true, default: false },
  createdDate: { type: Date, required: true, default: () => new Date() },

  // Mongoose only properties
  exercise: { type: mongoose.Schema.ObjectId, ref: ("Exercise"), required: true},
  user: { type: mongoose.Schema.ObjectId, ref: ("User"), required: true},
  set: { type: mongoose.Schema.ObjectId, ref: ("WorkoutSet"), required: true},
});

module.exports = mongoose.model('Goal', GoalSchema);

// GOAL
// goalID: string,
// setID: string,
// email: string,
// isComplete: boolean,
// createdDate: Date,