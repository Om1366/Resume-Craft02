const BASE_URL = "http://localhost:5001/api/ai";

/**
 * ✨ Enhance Resume Content (Summary / Experience)
 */
export const enhanceText = async (text, token) => {
  const res = await fetch(`${BASE_URL}/enhance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "AI enhancement failed");
  }

  return data.enhancedText;
};

/**
 * 🎯 Get Interview Preparation Tips
 */
export const getInterviewTips = async (role, token) => {
  const res = await fetch(`${BASE_URL}/interview-tips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to get interview tips");
  }

  return data.tips;
};
