const mongoose = require("mongoose");

const templateAnalyticsSchema = new mongoose.Schema(
  {
    templateKey: {
      type: String,
      required: true,
      unique: true, // e.g. "api-modern-1"
    },

    source: {
      type: String,
      enum: ["db", "api"],
      required: true,
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

module.exports = mongoose.model(
  "TemplateAnalytics",
  templateAnalyticsSchema
);
