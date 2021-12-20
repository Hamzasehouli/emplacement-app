const Favorite = require("../models/favoriteModel");
exports.addFavorite = async function (req, res, next) {
  try {
    console.log(req.body);
    const favorite = await Favorite.create({
      question: req.params.questionId,
      user: req.params.userId,
      dist: req.body.dist,
    });
    res.status(201).json({
      status: "success",
      data: {
        favorite,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
