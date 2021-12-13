const express = require("express");

const app = express();

app.use(express.json());

app.use(() => {
  console.log(new Date());
});

module.exports = app;
