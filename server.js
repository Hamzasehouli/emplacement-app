const mongoose = require("mongoose");
const app = require("./app.js");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

const database = process.env.DB.replace("<password>", process.env.DB_PASSWORD);

mongoose
  .connect(database)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.log(err);
  });
