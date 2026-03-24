const express = require("express");
const router = express.Router();

const User = require("./User");

// register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });
  await user.save();

  res.send("success");
});

// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username: username,
    password: password
  });

  if (user) {
    res.send("success");
  } else {
    res.send("fail");
  }
});

module.exports = router;