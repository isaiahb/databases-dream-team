USE weliftapp;

CREATE TABLE Workout( 
  mail CHAR(255) NOT NULL UNIQUE,
  fName CHAR(50) NOT NULL,
  lName CHAR(50) NOT NUlL, 
  password CHAR(20) NOT NULL,
  dOB DATE NOT NULL, 
  weight INT, 
  sex CHAR, 
  rating INT, 
  PRIMARY KEY(email) 
)