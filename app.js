const express = require("express");
const cookieParser = require("cookie-parse");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(new Date());
  next();
});

app.use("/api/v1/users", userRoutes);

app.all("*", (req, res, next) => {
  next("err");
});

app.use((err, req, res, next) => {
  console.log(err);
});

module.exports = app;
