function MinimalTemplate({ data, scale = 1 }) {
  // ✅ Normalize education safely
  const educationArray = Array.isArray(data.education)
    ? data.education
    : [];

  const hasOldEducationString =
    typeof data.education === "string" && data.education.trim();

  return (
    <div
      className="minimal-template"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: scale < 1 ? "700px" : "100%",
      }}
    >
      {/* ================= HEADER ================= */}
      <div className="minimal-header">
        <h1>{data.name || "Your Name"}</h1>
        <p className="minimal-contact">
          {data.email || "email@example.com"} ·{" "}
          {data.phone || "Phone"}
        </p>
      </div>

      {/* ================= SUMMARY ================= */}
      <section className="minimal-section">
        <p className="minimal-label">Summary</p>
        <p className="minimal-text">
          {data.summary || "Brief professional summary."}
        </p>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="minimal-section">
        <p className="minimal-label">Experience</p>

        {Array.isArray(data.experiences) &&
        data.experiences.length > 0 ? (
          data.experiences.map((exp, i) => (
            <div className="minimal-experience" key={i}>
              <p className="minimal-role">
                {exp.role || "Role"} —{" "}
                <span>{exp.company || "Company"}</span>
              </p>
              <p className="minimal-desc">
                {exp.description || "Work description"}
              </p>
            </div>
          ))
        ) : (
          <p className="muted-text">No experience added</p>
        )}
      </section>

      {/* ================= EDUCATION (SAFE & FIXED) ================= */}
      <section className="minimal-section">
        <p className="minimal-label">Education</p>

        {educationArray.length > 0 ? (
          educationArray.map((edu, i) => (
            <div className="minimal-education" key={i}>
              <p className="minimal-edu-title">
                {edu.institute || "Institute Name"}
              </p>
              <p className="minimal-edu-meta">
                {edu.course || "Course"} ·{" "}
                {edu.duration || "Year"}
              </p>
            </div>
          ))
        ) : hasOldEducationString ? (
          <p className="minimal-text">{data.education}</p>
        ) : (
          <p className="muted-text">No education added</p>
        )}
      </section>

      {/* ================= SKILLS ================= */}
      <section className="minimal-section">
        <p className="minimal-label">Skills</p>
        <p className="minimal-text">
          {data.skills
            ? data.skills
                .split(",")
                .map((s) => s.trim())
                .join(" · ")
            : "Your skills"}
        </p>
      </section>
    </div>
  );
}

export default MinimalTemplate;
