const Response = require("../models/responseModel");

exports.postResponse = async function (req, res, next) {
  try {
    const { content, dist } = req.body;

    if (!content.trim()) {
      return console.log("content is missing");
    }

    const response = await Response.create({
      content,
      question: req.params.questionId,
      user: req.params.userId,
      dist,
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
