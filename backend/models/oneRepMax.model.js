const mongoose = require('mongoose');

const OneRepMaxSchema = new mongoose.Schema({
  exerciseName: { type: String, required: true },
  weight: { type: Number, required: true },
  dateComplete: { type: Date, required: true, default: () => new Date() },

  email: { type: String, required: true },
  oneRepMaxID: { type: String, required: false },

  // Mongoose only properties
  user: { type: mongoose.Schema.ObjectId, ref: ("User"), required: true },
  exercise: { type: mongoose.Schema.ObjectId, ref: ("Exercise"), required: true },

});

module.exports = mongoose.model('OneRepMax', OneRepMaxSchema);

// -- OneRepMax SQL --
// oneRepMaxID: string,
// email: string,
// exerciseName: string,
// weight: number,