console.log("✅ templateRoutes loaded");

const express = require("express");
const router = express.Router();

const {
  createTemplate,
  getTemplates,
  deleteTemplate,
  incrementViews,
  incrementDownloads,
} = require("../controllers/templateController");

const { protect, adminOnly } = require("../middlewares/authMiddleware");

/* =====================================================
   PUBLIC ROUTES
===================================================== */

// 📄 Get all templates (users + admin)
router.get("/", getTemplates);

// 👀 Increment template views
router.patch("/:id/view", incrementViews);

// ⬇️ Increment template downloads
router.patch("/:id/download", incrementDownloads);

/* =====================================================
   ADMIN ROUTES
===================================================== */

// ➕ Create template
router.post("/", protect, adminOnly, createTemplate);

// ❌ Delete template
router.delete("/:id", protect, adminOnly, deleteTemplate);

module.exports = router;
