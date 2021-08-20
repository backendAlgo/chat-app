const express = require("express");
const {
  allUsers,
  userById,
  getUser,
  updateUser,
  deleteUser,
  hasAuthorization,
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
// const { userSignupValidator } = require("../validator/validationRules");

const router = express.Router();

router.get("/users", allUsers);
router.get("/users/:userId", requireSignin, getUser);
router.put("/users/:userId", requireSignin, hasAuthorization, updateUser);
router.delete("/users/:userId", requireSignin, hasAuthorization, deleteUser);
// any route containing :userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router;
