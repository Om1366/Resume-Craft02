const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getRules,
  updateRules,
  runATSCheck,
} = require("../controllers/atsController");

/* =====================================================
   USER ROUTES (Public)
===================================================== */

// 🧪 Run ATS check on a resume
// POST /api/ats/check
router.post("/check", runATSCheck);

// 📄 Get active ATS rules (read-only, optional for users)
router.get("/rules", getRules);

/* =====================================================
   ADMIN ROUTES (Protected)
===================================================== */

// ⚙️ Create / Update ATS rules
// PUT /api/ats/rules
router.put("/rules", protect, adminOnly, updateRules);

module.exports = router;
