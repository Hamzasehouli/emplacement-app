exports.signup = async function (req, res, next) {
  try {
    const body = {
      email: req.body.email,
      password: req.body.password,
    };
    if (
      !email.trim() ||
      !email.trim().includes("@") ||
      !email.trim().split("@")[1].includes(".")
    ) {
      return;
    }
    if (!password.trim() || pasword.trim().length < 8) {
      return;
    }
    bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
      // Store hash in your password DB.
    });
  } catch (err) {}
};
