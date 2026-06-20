const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const subscriptionRoutes = require("./routes/subscription.routes");

app.use("/api/subscription", subscriptionRoutes);

module.exports = app;