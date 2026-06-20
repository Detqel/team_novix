const pool = require("../database/connection");

async function fetchExpenses() {
  const result = await pool.query("SELECT * FROM expenses");
  return result.rows;
}
async function createExpense(expense) {
  const { description, amount, category, expense_date, payment_mode } = expense;

  const result = await pool.query(
    `INSERT INTO expenses
    (description, amount, category, expense_date, payment_mode)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [description, amount, category, expense_date, payment_mode]
  );

  return result.rows[0];
}
module.exports = {
  fetchExpenses,
  createExpense,
};