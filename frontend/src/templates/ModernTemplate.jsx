function ModernTemplate({ data, scale = 1 }) {
  // ✅ Normalize education safely
  const educationArray = Array.isArray(data.education)
    ? data.education
    : [];

  const hasOldEducationString =
    typeof data.education === "string" && data.education.trim();

  return (
    <div
      className="modern-template"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: scale < 1 ? "700px" : "100%",
      }}
    >
      {/* ================= HEADER ================= */}
      <div className="modern-header">
        <div>
          <h1>{data.name || "Your Name"}</h1>
          <p className="modern-contact">
            {data.email || "email@example.com"} •{" "}
            {data.phone || "Phone"}
          </p>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <section className="modern-section">
        <h2>Professional Summary</h2>
        <p>
          {data.summary ||
            "A concise professional summary highlighting your experience and strengths."}
        </p>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="modern-section">
        <h2>Experience</h2>

        {Array.isArray(data.experiences) && data.experiences.length > 0 ? (
          data.experiences.map((exp, i) => (
            <div className="modern-experience" key={i}>
              <div className="exp-header">
                <strong>{exp.role || "Role"}</strong>
                <span>
                  {exp.company || "Company"} •{" "}
                  {exp.duration || "Duration"}
                </span>
              </div>
              <p>
                {exp.description ||
                  "Describe your responsibilities and achievements."}
              </p>
            </div>
          ))
        ) : (
          <p className="muted-text">No experience added</p>
        )}
      </section>

      {/* ================= EDUCATION (FIXED & SAFE) ================= */}
      <section className="modern-section">
        <h2>Education</h2>

        {educationArray.length > 0 ? (
          educationArray.map((edu, i) => (
            <div className="modern-education" key={i}>
              <strong>{edu.institute || "Institute Name"}</strong>
              <div className="edu-meta">
                <span>{edu.course || "Course / Degree"}</span>
                <span>{edu.duration || "Year"}</span>
              </div>
            </div>
          ))
        ) : hasOldEducationString ? (
          <p>{data.education}</p>
        ) : (
          <p className="muted-text">No education added</p>
        )}
      </section>

      {/* ================= SKILLS ================= */}
      <section className="modern-section">
        <h2>Skills</h2>
        <div className="modern-skills">
          {data.skills ? (
            data.skills.split(",").map((s, i) => (
              <span key={i} className="skill-chip">
                {s.trim()}
              </span>
            ))
          ) : (
            <span className="skill-chip">Your Skill</span>
          )}
        </div>
      </section>
    </div>
  );
}

export default ModernTemplate;
