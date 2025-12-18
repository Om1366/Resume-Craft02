const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getInterviewTips = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const prompt = `
Give 6 concise interview preparation tips for a ${role}.
Return the answer as bullet points.
Keep it practical and short.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const tips = response.choices[0].message.content;

    res.json({ tips });
  } catch (error) {
    res.status(500).json({ message: "AI service failed" });
  }
};
