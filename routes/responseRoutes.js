const express = require("express");
const responseController = require("../controllers/responseController");
// const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });
// router.use(authController.isLoggedIn);
router.route("/").post(responseController.postResponse);
//   .get(questionController.getAllQuestions)

module.exports = router;
