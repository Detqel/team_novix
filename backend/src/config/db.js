const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.DB_USER || "postgres",
  password: process.env.PASSWORD,
  database: process.env.DB,
});

// test connection (optional but safe)
pool.connect()
  .then(() => console.log("DB CONNECTED SUCCESS"))
  .catch(err => console.log("DB ERROR", err.message));

module.exports = pool;