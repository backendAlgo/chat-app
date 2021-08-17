const express = require("express");
const { signup, signin, signout } = require("../controllers/auth");
const { validate } = require("../validator");
const { userSignupValidator } = require("../validator/validationRules");

const router = express.Router();

router.post("/signup", validate(userSignupValidator), signup);
router.post("/signin", signin);
router.get("/signout", signout);
module.exports = router;
