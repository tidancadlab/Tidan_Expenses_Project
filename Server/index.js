const express = require("express");
const app = express();
const userData = require("./Module/User");
const ExpensesData = require("./Module/expensesModule");
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
const { json } = require("express");
const { parse } = require("dotenv");
require("dotenv").config();
const port = process.env.port || 5500;

app.use(
  cors({
    origin: "*",
  }),
  express.json()
);

mongoose
  .connect(process.env.DB_CONNECT, { useNewUrlParser: true })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Not connect");
  });

app.get("/search/:key", async (req, res) => {
  let data = await await userData.find({
    $or: [
      { userName: { $regex: req.params.key } },
      { userEmail: { $regex: req.params.key } },
    ],
  });
  res.send(data);
});
app.post("/", async (req, res) => {
  let result = await userData.create(req.body);
  res.send(result);
});

app.get("/addExpenses", async (req, res) => {
  let result = await ExpensesData.find({});
  res.send(result);
  console.log("res.status");
})

app.post("/addExpenses", async (req, res) => {
  let result = await ExpensesData.create(req.body);
  res.send(result);
});

app.listen(port, () => {
  console.log(`server Running on ${port}`);
});
