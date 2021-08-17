const express = require("express");
const { getPosts, createPost } = require("../controllers/post");
const { validate } = require("../validator");
const { postValidator } = require("../validator/validationRules");

const router = express.Router();

router.get("/", getPosts);
router.post("/post", validate(postValidator), createPost);

module.exports = router;
