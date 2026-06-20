const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "team_novix",
  user: "postgres",
  password: "postgres",
});

module.exports = pool;