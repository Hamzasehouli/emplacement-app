const Question = require("../models/questionModel");
exports.postQuestion = async function (req, res, next) {
  try {
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
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

    console.log(
      title,
      content,
      req.params.userId,
      req.params.lat,
      req.params.lng
    );

    const question = await Question.create({
      title,
      content,
      user: req.params.userId,
      location: {
        type: "Point",
        coordinates: [req.params.lng, req.params.lat],
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
