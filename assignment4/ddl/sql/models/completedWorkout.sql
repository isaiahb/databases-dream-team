USE weliftapp;

CREATE TABLE CompletedWorkout( 
  completedWorkoutID CHAR(9) NOT NULL UNIQUE,
  email CHAR(255) NOT NULL,
  PRIMARY KEY (completedWorkoutID), 
  FOREIGN KEY (email) REFERENCES user(email) ON DELETE NO ACTION 
);
