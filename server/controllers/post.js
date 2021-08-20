const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const { errorInSaving } = require("../utils/DbError");
const _ = require("lodash");

exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else if (!post) {
        return res.status(404).json({
          error: "Post not found",
        });
      }
      req.post = post;
      next();
    });
};
exports.getPosts = (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .select("_id title body")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log("Error in getting Database " + err));
};

exports.createPost = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let post = new Post(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    try {
      const result = await post.save();
      res.json(result);
    } catch (err) {
      errorInSaving(res, err);
    }
  });
};

exports.postsByUser = (req, res) => {
  Post.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name")
    .sort("_created")
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(posts);
    });
};
exports.isPoster = (req, res, next) => {
  const isPoster =
    req.post && req.auth && req.post.postedBy._id == req.auth._id;
  if (!isPoster) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};
exports.updatePost = (req, res) => {
  let post = req.post;
  post = _.extend(post, req.body);
  post.updated = Date.now();
  post.save((err, post) => {
    if (err) {
      console.error("Error in updating post: ", err);
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(post);
  });
};
exports.deletePost = (req, res) => {
  let post = req.post;
  post.remove((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ message: "Post deleted successfully" });
  });
};
