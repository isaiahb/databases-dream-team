USE weliftapp;

CREATE TABLE Goal( 
  goalID CHAR(9) NOT NULL UNIQUE, 
  email CHAR(255) NOT NULL,
  setID CHAR (9), 
  isCompleted BOOLEAN, 
  goalDate DATETIME NOT NULL,
  PRIMARY KEY (goalID),
  FOREIGN KEY (email) REFERENCES user(email) ON DELETE NO ACTION
);