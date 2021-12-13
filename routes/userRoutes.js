const express = require("express");
const userController = require("../controllers/userController");
const questionRoutes = require("./questionRoutes");

const router = express.Router();
router.route("/").get(userController.getAllUsers).post(userController.addUser);
router.use("/:userId/questions", questionRoutes);

module.exports = router;
