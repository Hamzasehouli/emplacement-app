const Question = require("../models/questionModel");
exports.postQuestion = async function (req, res, next) {
  try {
    const { title, content } = req.body;
    if (!title) {
      return console.log("pleas enter a title");
    }
    if (!content) {
      return console.log("pleas enter a title");
    }

    const question = await Question.create({
      title,
      content,
      location,
      user: user.id,
    });
  } catch (err) {}
};
