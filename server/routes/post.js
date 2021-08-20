const express = require("express");
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
} = require("../controllers/post");
const { validate } = require("../validator");
const { postValidator } = require("../validator/validationRules");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const router = express.Router();

router.get("/posts", getPosts);
router.post(
  "/users/:userId/posts",
  requireSignin,
  createPost,
  validate(postValidator)
);

router.get("/users/:userId/posts", requireSignin, postsByUser);
router.delete("/posts/:postId", requireSignin, isPoster, deletePost);
router.put("/posts/:postId", requireSignin, isPoster, updatePost);

// any route containing :userId, our app will first execute userById()
router.param("userId", userById);
// any route containing :postId, our app will first execute postById()
router.param("postId", postById);
module.exports = router;
