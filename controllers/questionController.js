const Question = require("../models/questionModel");
exports.postQuestion = async function (req, res, next) {
  try {
    const { title, content } = req.body;

    if (!title) {
      return next("pleas enter a title");
    }
    if (!content) {
      return next("pleas enter a title");
    }

    if (req.params.userId !== req.user.id) {
      return next(
        "you are not allowed to post a question, please make sure that your logged in "
      );
    }

    const question = await Question.create({
      title,
      content,
      user: req.params.userId,
      location: {
        type: "Point",
        coordinates: [req.params.lng * 1, req.params.lat * 1],
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

exports.getQuestions = async function (req, res, next) {
  const questions = await Question.find({
    $text: {
      $search: req.query.term,
      $caseSensitive: false,
      $diacriticSensitive: false,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      questions,
    },
  });
};
