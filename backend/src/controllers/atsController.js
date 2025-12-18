const ATSRules = require("../models/ATSRules");

/* =========================
   GET ACTIVE ATS RULES
========================= */
exports.getRules = async (req, res) => {
  try {
    const rules = await ATSRules.findOne().sort({ createdAt: -1 });
    res.json(rules);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch ATS rules",
    });
  }
};

/* =========================
   UPDATE ATS RULES (ADMIN)
========================= */
exports.updateRules = async (req, res) => {
  try {
    const updated = await ATSRules.findOneAndUpdate(
      {},
      {
        minWords: req.body.minWords || 0,
        requiredSections: req.body.requiredSections || [],
        requiredKeywords: req.body.requiredKeywords || [],
      },
      { new: true, upsert: true }
    );

    res.json({
      message: "ATS rules saved successfully",
      rules: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save ATS rules",
    });
  }
};

/* =========================
   RUN ATS CHECK (USER)
========================= */
exports.runATSCheck = async (req, res) => {
  try {
    const { resumeText = "", sections = [] } = req.body;

    const rules = await ATSRules.findOne();

    /* =========================
       NO RULES → FULL SCORE
    ========================= */
    if (!rules) {
      return res.json({
        score: 100,
        checks: [],
      });
    }

    let score = 100;
    const checks = [];

    /* =========================
       WORD COUNT CHECK
    ========================= */
    const wordCount = resumeText.trim().split(/\s+/).length;

    if (wordCount < rules.minWords) {
      score -= 15;
      checks.push({
        type: "wordCount",
        status: "fail",
        message: `Resume too short (${wordCount}/${rules.minWords} words)`,
      });
    } else {
      checks.push({
        type: "wordCount",
        status: "pass",
        message: `Word count sufficient (${wordCount} words)`,
      });
    }

    /* =========================
       REQUIRED SECTIONS CHECK
    ========================= */
    rules.requiredSections.forEach((sec) => {
      if (sections.includes(sec)) {
        checks.push({
          type: "section",
          name: sec,
          status: "pass",
          message: `${sec} section present`,
        });
      } else {
        score -= 10;
        checks.push({
          type: "section",
          name: sec,
          status: "fail",
          message: `Missing section: ${sec}`,
        });
      }
    });

    /* =========================
       REQUIRED KEYWORDS CHECK
    ========================= */
    rules.requiredKeywords.forEach((kw) => {
      if (resumeText.toLowerCase().includes(kw.toLowerCase())) {
        checks.push({
          type: "keyword",
          name: kw,
          status: "pass",
          message: `Keyword found: ${kw}`,
        });
      } else {
        score -= 5;
        checks.push({
          type: "keyword",
          name: kw,
          status: "fail",
          message: `Missing keyword: ${kw}`,
        });
      }
    });

    /* =========================
       FINAL RESPONSE
    ========================= */
    res.json({
      score: Math.max(score, 0),
      checks,
    });
  } catch (error) {
    res.status(500).json({
      message: "ATS check failed",
    });
  }
};
