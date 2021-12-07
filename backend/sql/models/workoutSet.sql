USE weliftapp;

CREATE TABLE WorkoutSet (
  setID CHAR(9) NOT NULL UNIQUE, 
  workoutPlanID CHAR(9), 
  completedWorkoutID CHAR(9), 
  exerciseName CHAR(30), 
  weight INT, 
  reps INT, 
  PRIMARY KEY (setID), 
  FOREIGN KEY (exerciseName) REFERENCES Exercise(exerciseName),
  FOREIGN KEY (completedWorkoutID) REFERENCES Workout(workoutID)
  FOREIGN KEY (workoutPlanID) REFERENCES Workout(workoutID)
);
