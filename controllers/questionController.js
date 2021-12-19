const Question = require("../models/questionModel");
exports.postQuestion = async function (req, res, next) {
  try {
    const { title, content } = req.body;
    console.log(title, content);
    if (!title) {
      return next("pleas enter a title");
    }
    if (!content) {
      return next("pleas enter a title");
    }

    if (req.params.userId !== req.user.id) {
      console.log("dddd");
      return next(
        "you are not allowed to post a question, please make sure that your logged in "
      );
    }

    // console.log(
    //   title,
    //   content,
    //   req.params.userId,
    //   req.params.lat,
    //   req.params.lng
    // );

    const question = await Question.create({
      title,
      content,
      user: req.params.userId,
      location: {
        type: "Point",
        coordinates: [req.params.lng * 1, req.params.lat * 1],
      },
    });
    console.log(question);

    res.status(201).json({
      status: "success",
      data: {
        question,
      },
    });
  } catch (err) {}
};

exports.getQuestions = async function (req, res, next) {
  console.log(req.query);
  const questions = await Question.find({
    $text: {
      $search: req.query.term,
      $caseSensitive: false,
      $diacriticSensitive: false,
    },
  });

  console.log(questions);
  res.status(200).json({
    status: "success",
    data: {
      questions,
    },
  });
};
