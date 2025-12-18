const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.get("/user", protect, (req, res) => {
  res.json({
    message: "User route accessed",
    user: req.user,
  });
});

router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Admin route accessed",
  });
});

module.exports = router;
