const mongoose = require('mongoose');

const WorkoutPlanSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  WorkoutPlanID: { type: String, required: false },
  public: { type: Boolean, required: true, default: true },
  
  // Mongoose only properties
  user: { type: mongoose.Schema.ObjectId, ref: ("User"), required: true},
  sets: { type: [{type: mongoose.Schema.ObjectId, ref: ("WorkoutSet")}], required: true, default: []},
});

module.exports = mongoose.model('WorkoutPlan', WorkoutPlanSchema);

// WorkoutPlan SQL
// WorkoutPlanID: string, - Exercise Primary Key
// name: string 
// email: string | null, - User Forien Key
