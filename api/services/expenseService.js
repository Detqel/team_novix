const {
  fetchExpenses,
  createExpense,
} = require("../models/expenseModel");

async function getExpenses() {
  return await fetchExpenses();
}

async function addExpense(expense) {
  return await createExpense(expense);
}

module.exports = {
  getExpenses,
  addExpense,
};