const express = require("express");
const expensesRouter = require("./routes/expenses");
const app = express();
app.use("/expenses", expensesRouter);
app.get("/", (req, res) => {
  res.send("Team Novix API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});