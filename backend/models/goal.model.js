const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  email: { type: String, required: true },
  setID: { type: String, required: false },
  goalID: { type: String, required: false },
  isComplete: { type: Boolean, required: true, default: false },
  createdDate: { type: Date, required: true, default: () => new Date() },

  // Mongoose only properties
  user: { type: mongoose.Schema.ObjectId, ref: ("User"), required: true},
  // set: { type: mongoose.Schema.ObjectId, ref: ("Set"), required: false},
});

module.exports = mongoose.model('Goal', GoalSchema);

// GOAL
// goalID: string,
// setID: string,
// email: string,
// isComplete: boolean,
// createdDate: Date,