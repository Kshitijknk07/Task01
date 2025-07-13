const express = require("express");
const router = express.Router();
const {
  createInitialUsers,
  getUsers,
  claimPoints,
  addUser,
} = require("../controllers/userController");

router.get("/seed", createInitialUsers);
router.get("/", getUsers);
router.post("/", addUser);
router.post("/claim/:userId", claimPoints);

module.exports = router;
