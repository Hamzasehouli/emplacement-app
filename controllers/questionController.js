const Question = require("../models/questionModel");
exports.postQuestion = async function (req, res, next) {
  try {
    console.log(req.params);
    const { title, content } = req.body;
    if (!title) {
      return console.log("pleas enter a title");
    }
    if (!content) {
      return console.log("pleas enter a title");
    }

    if (req.params.userId !== req.user.id) {
      return console.log(
        "you are not allowed to post a question, please make sure that your logged in "
      );
    }

    const question = await Question.create({
      title,
      content,
      user: req.user.id,
      location: {
        type: "Point",
        coordinates: [-5.79975, 35.76727],
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        question,
      },
    });
  } catch (err) {}
};
