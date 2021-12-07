const OneRepMax = require("../models/oneRepMax.model");
const ExerciseService = require("./exercise.service.sql");

// Return all the default exercises and exercises created by the user.
async function getUsersOneRepMaxs(user) {
  const query = await sql.query(
    `SELECT * ` +
    `FROM oneRepMax ` +
    `WHERE email=${user.email} `
  );
  return query;
}

async function getById(id) {
  const query = await sql.query(
    `SELECT 1 ` +
    `FROM oneRepMax ` +
    `WHERE oneRepMaxIS=${id} `
  );
  return query;
}

async function create(user, exerciseName, weight) {
  // // Ensure exercise is a real exercise
  const query0 = await sql.query(
    `SELECT 1 FROM oneRepMax WHERE exerciseName=${exerciseName}`
  );
  if (!query0) throw exerciseName + " : is not a valid exercise name";

  const query = await sql.query(
    `INSERT INTO oneRepMax (email, exerciseName, weight)` +
    `VALUES (${user.email}, ${exerciseName}, ${weight});`
  );

  return query;
}

// Let's a user delete an exercise if they are the one who also created it.
async function deleteOneRepMax(user, id) {
  const query = await sql.query(
    `DELETE FROM oneRepMax o` +
    `WHERE '${user.email}'=o.email AND '${id}' = o.oneRepMaxId` 
  );
  return query;
}

module.exports = {
  getUsersOneRepMaxs,
  getById,
  create,
  deleteOneRepMax,
}