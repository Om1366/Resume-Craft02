const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    // Template name (shown to users)
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Layout configuration (can be string OR structured JSON)
    // Example:
    // "modern"
    // OR { sections: [...], font: "...", theme: "..." }
    layout: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    // Optional preview image (future use / admin upload)
    previewImage: {
      type: String,
      default: "",
    },

    // 👀 How many times template was viewed
    views: {
      type: Number,
      default: 0,
    },

    // ⬇️ How many times resumes were downloaded using this template
    downloads: {
      type: Number,
      default: 0,
    },

    // Admin who created this template
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Template", templateSchema);
