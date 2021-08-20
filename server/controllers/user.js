const User = require("../models/user");
const _ = require("lodash");
const mongoose = require("mongoose");

exports.userById = async (req, res, next, id) => {
  let user;
  try {
    user = await User.findById(id).exec();
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  } catch (err) {
    console.error("error in finding: ", err);
    return res.status(400).json({ error: err });
  }
};

exports.hasAuthorization = (req, res, next) => {
  const authorize = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorize) {
    return res
      .status(403)
      .json({ error: "User is not authorized to perform this action" });
  }
  next();
};

exports.allUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email updated created").exec();
    res.json({ users });
  } catch (err) {
    console.error("error occurred getting users: ", err);
    res.status(400).json({ error: err });
  }
};

exports.getUser = (req, res) => {
  const { name, _id, email, created, updated } = req.profile;
  return res.json({ _id, name, email, created, updated });
};

exports.updateUser = (req, res) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({
        error: "You are not authorized to perform this action",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ user });
  });
};

exports.deleteUser = async (req, res) => {
  try {
    let user = req.profile;
    await user.remove();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error in deleting user: ", err);
    return res.status(400).json({
      error: err,
    });
  }
};
