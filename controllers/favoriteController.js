const Favorite = require("../models/favoriteModel");
exports.addFavorite = async function (req, res, next) {
  try {
    const favorite = await Favorite.create({
      question: req.params.questionId,
      user: req.params.userId,
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
