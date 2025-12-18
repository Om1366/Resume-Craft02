const mongoose = require("mongoose");

const atsRuleSchema = new mongoose.Schema(
  {
    minWords: {
      type: Number,
      default: 150,
    },

    requiredSections: {
      type: [String],
      default: ["summary", "experience", "education", "skills"],
    },

    requiredKeywords: {
      type: [String],
      default: [],
    },

    allowTables: {
      type: Boolean,
      default: false,
    },

    allowImages: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ATSRules", atsRuleSchema);
