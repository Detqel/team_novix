require("dotenv").config();
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