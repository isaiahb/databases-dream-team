-- queries

-- first, last name and rating of users born after 2000
SELECT fName, lName, rating
FROM user
WHERE dOB > '2000-01-01';

-- returns first name, last name and number of workouts completed after 2021-11-20
SELECT fName, lName, COUNT(workoutID)
FROM user
INNER JOIN completedworkout
ON user.email=completedworkout.email
WHERE completedworkout.dateCompleted >= '2021-11-20'
GROUP BY user.email;

-- number of sets associated with each workout as well as exerciseName, weight, reps
SELECT u.fName, u.lName, w.workoutId, COUNT(ws.setId), ws.exerciseName, ws.weight, ws.reps
FROM user u, workout w, workoutset ws
WHERE w.workoutId=ws.workoutID AND u.email=w.email
GROUP BY w.workoutId, exerciseName;

-- select all users that have incomplete goals
SELECT fName, lName
FROM user
WHERE EXISTS(SELECT goalId FROM goal WHERE goal.email=user.email AND goal.isCompleted=0);

-- select highest one rep max for each exercise for specific user, ordered by date
SELECT u.fName, u.lName, exerciseName, MAX(o.weight)
FROM onerepmax o, user u
WHERE u.email=o.email AND u.email='olamumot@hotmail.com'
GROUP BY exerciseName
ORDER BY oneRepMaxDate;

SELECT u.fName, u.lName, sw.intensity
FROM suggestedworkout sw, user u, workout w
WHERE u.email=w.email AND sw.workoutId=w.workoutId
AND w.workoutId IN (SELECT
workoutId
FROM workoutSet 
WHERE workoutId=sw.workoutId
AND exerciseName='squats');

-- return all workouts that have been completed within the last month for all users that have a fitness rating>1
SELECT ws.exerciseName, cw.workoutID FROM completedworkout cw, user u, workoutSet ws
WHERE u.rating > 1
AND cw.email = u.email 
AND u.email = 'cferna@hotmail.com'
AND ws.workoutID = cw.workoutID
AND cw.dateCompleted BETWEEN (SELECT DATE_ADD(CURRENT_DATE(),INTERVAL -1 MONTH)) AND CURRENT_DATE()