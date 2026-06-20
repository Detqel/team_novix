const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// CREATE
router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      service_name,
      amount,
      billing_cycle,
      next_billing_date,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO subscriptions 
      (user_id, service_name, amount, billing_cycle, next_billing_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [user_id, service_name, amount, billing_cycle, next_billing_date]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM subscriptions ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;