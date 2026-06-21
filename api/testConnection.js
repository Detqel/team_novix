const pool = require("./database/connection");

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Connected!");
    console.log(result.rows[0]);
  } catch (error) {
    console.error(error);
  }
}

testConnection();