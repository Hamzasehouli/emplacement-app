const express = require("express");

const app = express();

app.use(express.json());

app.use(() => {
  console.log(new Date());
});

app.all("*", (req, res, next) => {});

app.use();

module.exports = app;
