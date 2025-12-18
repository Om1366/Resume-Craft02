const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const { protect } = require("../middlewares/authMiddleware");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * ✨ Enhance Resume Content (Summary / Experience)
 * POST /api/ai/enhance
 */
router.post("/enhance", protect, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const prompt = `
Rewrite the following resume content into professional, ATS-friendly bullet points.
Keep it concise, impactful, and action-oriented.

Text:
${text}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    const enhancedText = response.choices[0].message.content;

    res.json({ enhancedText });
  } catch (error) {
    console.error("AI Enhance Error:", error);
    res.status(500).json({ message: "AI enhancement failed" });
  }
});

/**
 * 🎯 Interview Preparation Tips
 * POST /api/ai/interview-tips
 */
router.post("/interview-tips", protect, async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Job role is required" });
    }

    const prompt = `
Give 6 practical interview preparation tips for a ${role}.
Return the response as clear bullet points.
Keep language simple and professional.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });

    const tips = response.choices[0].message.content;

    res.json({ tips });
  } catch (error) {
    console.error("Interview Tips Error:", error);
    res.status(500).json({ message: "Failed to generate interview tips" });
  }
});

module.exports = router;
