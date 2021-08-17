const { body, check } = require("express-validator");

exports.postValidator = [
  body("title", "Write a title").notEmpty(),
  body("title", "Title must be 4 to 150 characters").isLength({
    min: 4,
    max: 150,
  }),
  body("body", "Write a body").notEmpty(),
  body("body", "Body must be 4 to 2000 characters").isLength({
    min: 4,
    max: 2000,
  }),
];

exports.userSignupValidator = [
  body("name", "Name is required").notEmpty(),
  body("email")
    .matches(/.+@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 2000,
    })
    .withMessage("Email must be between 3 to 32 characters"),
  body("password", "Password is required").notEmpty(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
];
