const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
// const questionRoutes = require("./routes/questionRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(new Date());
  next();
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.all("*", (req, res, next) => {
  next("err");
});

app.use((err, req, res, next) => {
  console.log(err);
});

module.exports = app;
