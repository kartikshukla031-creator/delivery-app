const express = require("express");
const router = express.Router();

// 🔥 simple demo login (DB wali complexity hata di for now)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // test credentials
  if (email === "admin" && password === "123") {
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

module.exports = router;