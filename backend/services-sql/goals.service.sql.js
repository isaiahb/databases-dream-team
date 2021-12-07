

// Return all the default exercises and exercises created by the user.
async function getUsersGoals(user) {
  const query = await sql.query(
    `SELECT * ` +
    `FROM goal ` +
    `WHERE email=${user.email} `
  );
  return query;
}

async function getById(id) {
  const query = await sql.query(
    `SELECT 1 ` +
    `FROM goal ` +
    `WHERE goalID=${id} `
  );
  return query;
}

async function create(user, exerciseName, reps, weight) {

  const query0 = await sql.query(
    `INSERT INTO workoutSet (exerciseName, reps, weight)` +
    `VALUES (${exerciseName}, ${reps}, ${weight});`
  );

  const query = await sql.query(
    `INSERT INTO goal (email, exerciseName, setID)` +
    `VALUES (${user.email}, ${exerciseName}, ${query0.setID});`
  );

  return query;
}

// Let's a user delete an exercise if they are the one who also created it.
async function deleteGoal(user, goalId) {
  const query = await sql.query(
    `DELETE FROM goal g` +
    `WHERE '${user.email}'=g.email AND '${goalId}' = g.goalID` 
  );
  return query;
}

module.exports = {
  getUsersGoals,
  getById,
  create,
  deleteGoal,
}