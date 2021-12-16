const express = require("express");
const userController = require("../controllers/userController");
const questionRoutes = require("./questionRoutes");
const responseRoutes = require("./responseRoutes");
const favoriteRoutes = require("./favoriteRoutes");

const router = express.Router();
router.route("/").get(userController.getAllUsers).post(userController.addUser);
router.use("/:userId/latitude/:lat/longitude/:lng/questions", questionRoutes);
router.use("/:userId/questions/:questionId/responses", responseRoutes);
router.use("/:userId/questions/:questionId/favorites", favoriteRoutes);

module.exports = router;
