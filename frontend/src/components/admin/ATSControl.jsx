import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const API = "http://localhost:5001/api/ats";

function ATSControl() {
  const { token } = useContext(AuthContext);

  const [rules, setRules] = useState({
    minWords: 150,
    requiredSections: "",
    requiredKeywords: "",
  });

  const [saving, setSaving] = useState(false);

  /* ================= LOAD RULES ================= */
  useEffect(() => {
    fetch(`${API}/rules`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setRules({
            minWords: data.minWords,
            requiredSections: data.requiredSections.join(", "),
            requiredKeywords: data.requiredKeywords.join(", "),
          });
        }
      });
  }, []);

  /* ================= SAVE ================= */
  const saveRules = async () => {
    setSaving(true);

    await fetch(`${API}/rules`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        minWords: Number(rules.minWords),
        requiredSections: rules.requiredSections
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        requiredKeywords: rules.requiredKeywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
      }),
    });

    setSaving(false);
    alert("ATS rules updated successfully");
  };

  return (
    <div className="ats-page">
      <div className="ats-wrapper">
        {/* HEADER */}
        <div className="ats-header">
          <h2>ATS & System Rules</h2>
          <p>Control how resumes are evaluated by the ATS engine</p>
        </div>

        {/* FORM CARD */}
        <div className="ats-card">
          <div className="ats-field">
            <label>Minimum Word Count</label>
            <input
              type="number"
              value={rules.minWords}
              onChange={(e) =>
                setRules({ ...rules, minWords: e.target.value })
              }
            />
            <small>
              Resumes below this word count will lose ATS score
            </small>
          </div>

          <div className="ats-field">
            <label>Required Sections</label>
            <input
              placeholder="summary, experience, education, skills"
              value={rules.requiredSections}
              onChange={(e) =>
                setRules({ ...rules, requiredSections: e.target.value })
              }
            />
            <small>
              Missing sections will negatively impact ATS score
            </small>
          </div>

          <div className="ats-field">
            <label>Required Keywords</label>
            <input
              placeholder="javascript, react, teamwork"
              value={rules.requiredKeywords}
              onChange={(e) =>
                setRules({ ...rules, requiredKeywords: e.target.value })
              }
            />
            <small>
              Keywords improve ATS ranking if present in resume
            </small>
          </div>

          <div className="ats-actions">
            <button onClick={saveRules} disabled={saving}>
              {saving ? "Saving..." : "💾 Save ATS Rules"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ATSControl;
