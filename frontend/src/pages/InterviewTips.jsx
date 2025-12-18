import { useState, useContext } from "react";
import { getInterviewTips } from "../services/aiService";
import { AuthContext } from "../context/AuthContext";

function InterviewTips() {
  const { token } = useContext(AuthContext);

  const [role, setRole] = useState("");
  const [tips, setTips] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTips = async () => {
    if (!role.trim()) {
      alert("Please enter a job role");
      return;
    }

    try {
      setLoading(true);
      const result = await getInterviewTips(role, token);
      setTips(result);
    } catch (err) {
      alert(err.message || "Failed to generate tips");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="interview-page">
      {/* ================= HEADER ================= */}
      <div className="interview-header">
        <h1>Interview Preparation</h1>
        <p>
          Get AI-powered interview tips tailored to your job role
        </p>
      </div>

      {/* ================= INPUT CARD ================= */}
      <div className="interview-input-card">
        <input
          type="text"
          placeholder="Enter job role (e.g. Frontend Developer)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <button onClick={fetchTips} disabled={loading}>
          {loading ? "Generating Tips..." : "✨ Get AI Tips"}
        </button>
      </div>

      {/* ================= RESULT ================= */}
      {tips && (
        <div className="interview-result-card">
          <h3>AI Suggested Interview Tips</h3>
          <div className="tips-content">
            {tips}
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewTips;
