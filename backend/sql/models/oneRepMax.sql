USE weliftapp;

CREATE TABLE OneRepMax(
  oneRepMaxID CHAR(9) NOT NULL UNIQUE, 
  email CHAR(255), 
  exerciseName CHAR(30), 
  weight INT, 
  oneRepMaxDate DATETIME, 
  PRIMARY KEY (oneRepMaxID), 
  FOREIGN KEY (email) REFERENCES user(email) ON DELETE NO ACTION, 
  FOREIGN KEY (exerciseName) REFERENCES Exercise(exerciseName) ON DELETE NO ACTION 
);
