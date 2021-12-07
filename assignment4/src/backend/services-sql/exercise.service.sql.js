const sql = require("../clients/sql");
const dotenv = require('dotenv');


// Return all the default exercises and exercises created by the user.
async function getAll(user) {
  const query = await sql.query(
    `SELECT * ` +
    `FROM exercise ` +
    `WHERE email=${user.email} OR NULL`
  );
  return query;
};


async function getByName(name) {
  const query = await sql.query(
    `SELECT 1 ` +
    `FROM exercise ` +
    `WHERE exerciseName=${name} `
  );
  return query;
}

async function create(user, exerciseName, muscleGroup) {
  const query = await sql.query(
    `INSERT INTO exercise (email, exerciseName, muscleGroup)` +
    `VALUES (${user.email}, ${exerciseName}, ${muscleGroup});`
  );
  return query;
}

// Let's a user delete an exercise if they are the one who also created it.
async function deleteExercise(user, exerciseName) {
  const query = await sql.query(
    `DELETE FROM exercise e` +
    `WHERE '${user.email}'=e.email AND '${exerciseName}' = e.exerciseName` 
  );
  return query;
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  deleteExercise,
}