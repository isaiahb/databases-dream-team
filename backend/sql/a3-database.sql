USE weliftapp;

CREATE TABLE user
( email CHAR(255) NOT NULL UNIQUE,
fName CHAR(50) NOT NULL,
lName CHAR(50) NOT NUlL, 
password CHAR(20) NOT NULL,
dOB DATE NOT NULL, 
weight INT, 
sex CHAR, 
rating INT, 
PRIMARY KEY(email) );

CREATE TABLE Exercise
( exerciseName CHAR(50) NOT NULL, 
muscleGroup CHAR(50), PRIMARY KEY (exerciseName) );

CREATE TABLE Workout
( workoutId CHAR(9) NOT NULL UNIQUE,
email CHAR(255) NOT NULL,
PRIMARY KEY (workoutID), 
FOREIGN KEY (email) REFERENCES user(email) ON DELETE NO ACTION );

-- workout ids from 1001-2000
CREATE TABLE UserCreatedWorkout
( workoutID CHAR(9) NOT NULL UNIQUE, 
FOREIGN KEY (workoutID) REFERENCES workout(workoutID) ON DELETE NO ACTION );

-- workout ids from 1-1000
CREATE TABLE SuggestedWorkout
( workoutID CHAR(9) NOT NULL UNIQUE, 
intensity CHAR(9),
FOREIGN KEY (workoutID) REFERENCES workout(workoutID) ON DELETE NO ACTION );

CREATE TABLE CompletedWorkout
( dateCompleted DATETIME NOT NULL, 
email CHAR(255),
workoutID CHAR(9), 
PRIMARY KEY (dateCompleted), 
FOREIGN KEY (email) REFERENCES user(email) ON DELETE NO ACTION, 
FOREIGN KEY (workoutID) REFERENCES Workout(workoutID));

CREATE TABLE WorkoutSet 
(setID CHAR(9) NOT NULL UNIQUE, 
workoutID CHAR(9), 
exerciseName CHAR(30), 
weight INT, 
reps INT, 
PRIMARY KEY (setID), 
FOREIGN KEY (exerciseName) REFERENCES Exercise(exerciseName),
FOREIGN KEY (workoutID) REFERENCES Workout(workoutID));

CREATE TABLE OneRepMax
(oneRepMaxID CHAR(9) NOT NULL UNIQUE, 
email CHAR(255), 
exerciseName CHAR(30), 
weight INT, 
oneRepMaxDate DATETIME, 
PRIMARY KEY (oneRepMaxID), 
FOREIGN KEY (email) REFERENCES user(email) ON DELETE NO ACTION, 
FOREIGN KEY (exerciseName) REFERENCES Exercise(exerciseName) ON DELETE NO ACTION );

CREATE TABLE Goal
( goalID CHAR(9) NOT NULL UNIQUE, 
email CHAR(255) NOT NULL,
setID CHAR (9), 
isCompleted BOOLEAN, 
goalDate DATETIME NOT NULL,
PRIMARY KEY (goalID),
FOREIGN KEY (email) REFERENCES user(email) ON DELETE NO ACTION );