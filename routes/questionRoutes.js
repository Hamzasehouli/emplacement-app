const express = require("express");
const questionController = require("../controllers/questionController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });
router.use(authController.isLoggedIn);
router.route("/").post(questionController.postQuestion);
//   .get(questionController.getAllQuestions)

module.exports = router;
