const mongoose = require("mongoose");

/* =========================
   SUB SCHEMAS
========================= */

// Experience
const experienceSchema = new mongoose.Schema(
  {
    company: { type: String },
    role: { type: String },
    duration: { type: String },
    description: { type: String },
  },
  { _id: false }
);

// Education
const educationSchema = new mongoose.Schema(
  {
    institute: { type: String },
    course: { type: String },
    duration: { type: String },
  },
  { _id: false }
);

/* =========================
   MAIN RESUME SCHEMA
========================= */

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },

    title: {
      type: String,
      default: "My Resume",
    },

    content: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },

      summary: { type: String },

      skills: {
        type: [String],
        default: [],
      },

      experiences: {
        type: [experienceSchema],
        default: [],
      },

      education: {
        type: [educationSchema],
        default: [],
      },
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },

    downloads: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
