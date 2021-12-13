const express = require("express");
const questionController = require("../controllers/questionController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.isLoggedIn);
router
  .route("/")
  //   .get(questionController.getAllQuestions)
  .post(questionController.postQuestion);

module.exports = router;
