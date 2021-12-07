USE weliftapp;

CREATE TABLE WorkoutPlan( 
  workoutPlanID CHAR(9) NOT NULL UNIQUE,
  email CHAR(255) NOT NULL,
  PRIMARY KEY (workoutPlanID), 
  FOREIGN KEY (email) REFERENCES user(email) ON DELETE NO ACTION 
);
