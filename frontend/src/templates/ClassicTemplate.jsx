function ClassicTemplate({ data, scale = 1 }) {
  // ✅ Normalize education safely
  const educationArray = Array.isArray(data.education)
    ? data.education
    : [];

  const hasOldEducationString =
    typeof data.education === "string" && data.education.trim();

  return (
    <div
      className="classic-template"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: scale < 1 ? "700px" : "100%",
      }}
    >
      {/* ================= HEADER ================= */}
      <div className="classic-header">
        <h1>{data.name || "Your Name"}</h1>
        <p>
          {data.email || "email@example.com"} |{" "}
          {data.phone || "Phone"}
        </p>
      </div>

      <hr className="classic-divider" />

      {/* ================= EDUCATION (SAFE & FIXED) ================= */}
      <section className="classic-section">
        <h2>Education</h2>

        {educationArray.length > 0 ? (
          educationArray.map((edu, i) => (
            <div className="classic-education" key={i}>
              <p className="classic-edu-title">
                <strong>{edu.institute || "Institute Name"}</strong>
              </p>
              <p className="classic-edu-meta">
                {edu.course || "Course / Degree"} •{" "}
                {edu.duration || "Year"}
              </p>
            </div>
          ))
        ) : hasOldEducationString ? (
          <p>{data.education}</p>
        ) : (
          <p className="muted-text">No education added</p>
        )}
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="classic-section">
        <h2>Experience</h2>

        {Array.isArray(data.experiences) &&
        data.experiences.length > 0 ? (
          data.experiences.map((exp, i) => (
            <div className="classic-experience" key={i}>
              <p className="classic-role">
                <strong>{exp.role || "Role"}</strong>,{" "}
                {exp.company || "Company"}
              </p>
              <p className="classic-duration">
                {exp.duration || "Duration"}
              </p>
              <p className="classic-desc">
                {exp.description ||
                  "Describe your responsibilities and achievements."}
              </p>
            </div>
          ))
        ) : (
          <p className="muted-text">No experience added</p>
        )}
      </section>

      {/* ================= SKILLS ================= */}
      <section className="classic-section">
        <h2>Skills</h2>
        <p>
          {data.skills
            ? data.skills
                .split(",")
                .map((s) => s.trim())
                .join(", ")
            : "Your skills"}
        </p>
      </section>
    </div>
  );
}

export default ClassicTemplate;
