exports.catchError = async (err, req, res, next) => {
  if (!req.url.startsWith("/api/v1/")) {
    return res.status(400).render("_errorPage", {
      //   statusCode: err.statusCode,
      //   status: err.status,
      //   error: err.message,
    });
  }
};
