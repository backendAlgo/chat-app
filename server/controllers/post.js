const Post = require("../models/post");
const { errorInSaving } = require("../utils/DbError");
exports.getPosts = (req, res) => {
  const posts = Post.find()
    .select("_id title body")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log("Error in getting Database " + err));
};

exports.createPost = (req, res) => {
  const post = new Post(req.body);
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => errorInSaving(res, err));
};
