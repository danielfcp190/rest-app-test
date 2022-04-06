const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Oi Express" });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected with MongoDB");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
