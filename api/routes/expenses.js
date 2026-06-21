const express = require("express");
const {
  getExpenses,
  addExpense,
} = require("../services/expenseService");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const expense = await addExpense(req.body);

    res.status(201).json(expense);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create expense",
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const expenses = await getExpenses();
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
});

module.exports = router;