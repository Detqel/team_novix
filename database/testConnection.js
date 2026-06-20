require("dotenv").config();

console.log("HOST =", process.env.DB_HOST);
console.log("PORT =", process.env.DB_PORT);
console.log("DB =", process.env.DB_NAME);
console.log("USER =", process.env.DB_USER);
console.log("PASSWORD =", process.env.DB_PASSWORD);

const pool = require("./connection");

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Connected to PostgreSQL!");
    console.log(result.rows[0]);
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    await pool.end();
  }
}

testConnection();