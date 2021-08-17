const User = require("../models/user");
const { errorInSaving } = require("../utils/DbError");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.signup = async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(403).json({
      error: "Email is taken.",
    });
  }
  try {
    const user = await new User(req.body);
    await user.save();
    res.json({ message: "Signup success! Please login." });
  } catch (err) {
    errorInSaving(res, err);
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }
    const { _id, name, email } = user;

    const token = jwt.sign({ _id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    return res.json({ token, user: { _id, email, name } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Signout success" });
};
