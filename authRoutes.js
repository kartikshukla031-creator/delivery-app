const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin" && password === "123") {
    return res.json({ success: true });
  }

  return res.json({ success: false });
});

module.exports = router;