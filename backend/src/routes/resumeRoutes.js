const express = require("express");
const router = express.Router();

const {
  createResume,
  getMyResumes,
  getResumeById,
  updateResume,
} = require("../controllers/resumeController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, createResume);
router.get("/", protect, getMyResumes);
router.get("/:id", protect, getResumeById);
router.put("/:id", protect, updateResume);

module.exports = router;
