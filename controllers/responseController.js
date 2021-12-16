const Response = require("../models/responseModel");
exports.postResponse = async function (req, res, next) {
  console.log(req.body);
  console.log(req.params);
  try {
    const { content } = req.body;
    if (!content.trim()) {
      return console.log("content is missing");
    }
    const response = await Response.create({
      content,
      question: req.params.questionId,
      user: req.params.userId,
    });
    res.status(201).json({
      status: "success",
      data: {
        response,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
