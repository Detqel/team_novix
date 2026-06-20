const express = require("express");
const cors = require("cors");
const expensesRouter = require("./routes/expenses");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/expenses", expensesRouter);

app.get("/", (req, res) => {
  res.send("Team Novix API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});