const TemplateAnalytics = require("../models/TemplateAnalytics");

// 👀 Increment View Count
exports.incrementAnalytics = async (req, res) => {
  try {
    const { templateKey, source } = req.body;

    if (!templateKey) {
      return res.status(400).json({ message: "templateKey is required" });
    }

    const analytics = await TemplateAnalytics.findOneAndUpdate(
      { templateKey },
      {
        $inc: { views: 1 },
        $setOnInsert: { source },
      },
      { upsert: true, new: true }
    );

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
