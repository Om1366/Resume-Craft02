import { useState, useContext, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";

import {
  createResume,
  getResumeById,
  updateResume,
} from "../services/resumeService";

import { incrementTemplateDownload } from "../services/templateService";
import { enhanceText } from "../services/aiService";
import { AuthContext } from "../context/AuthContext";

// Templates
import ModernTemplate from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";

const ATS_API = "http://localhost:5001/api/ats/check";

function CreateResume() {
  const { templateId, id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const isEditMode = Boolean(id);
  const selectedTemplate = location.state?.template;

  /* ================= FORM STATE ================= */
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    phone: "",
    summary: "",
    education: [{ institute: "", course: "", duration: "" }],
    skills: "",
    experiences: [
      { company: "", role: "", duration: "", description: "" },
    ],
  });

  const [atsResult, setAtsResult] = useState(null);
  const [atsLoading, setAtsLoading] = useState(false);

  /* ================= FETCH RESUME ================= */
  useEffect(() => {
    if (isEditMode) {
      getResumeById(id, token).then((resume) => {
        setFormData({
          title: resume.title,
          ...resume.content,
          education: Array.isArray(resume.content.education)
            ? resume.content.education
            : [{ institute: resume.content.education || "", course: "", duration: "" }],
          skills: resume.content.skills.join(", "),
        });
      });
    }
  }, [id, token, isEditMode]);

  /* ================= INPUT HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ===== EXPERIENCE ===== */
  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = [...prev.experiences];
      updated[index] = { ...updated[index], [name]: value };
      return { ...prev, experiences: updated };
    });
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { company: "", role: "", duration: "", description: "" },
      ],
    }));
  };

  /* ===== EDUCATION ===== */
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [name]: value };
      return { ...prev, education: updated };
    });
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { institute: "", course: "", duration: "" },
      ],
    }));
  };

  /* ================= AI ================= */
  const enhanceSummary = async () => {
    if (!formData.summary) return alert("Write summary first");
    const enhanced = await enhanceText(formData.summary, token);
    setFormData((prev) => ({ ...prev, summary: enhanced }));
  };

  const enhanceExperience = async (index) => {
    const text = formData.experiences[index].description;
    if (!text) return alert("Write experience first");

    const enhanced = await enhanceText(text, token);
    setFormData((prev) => {
      const updated = [...prev.experiences];
      updated[index].description = enhanced;
      return { ...prev, experiences: updated };
    });
  };

  /* ================= ATS ================= */
  const runATSCheck = async () => {
    setAtsLoading(true);

    const resumeText = `
      ${formData.summary}
      ${formData.education.map(e => `${e.institute} ${e.course}`).join(" ")}
      ${formData.skills}
      ${formData.experiences.map(e => e.description).join(" ")}
    `;

    const sections = [
      formData.summary && "summary",
      formData.education.length > 0 && "education",
      formData.skills && "skills",
      formData.experiences.length > 0 && "experience",
    ].filter(Boolean);

    const res = await fetch(ATS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText, sections }),
    });

    const data = await res.json();
    setAtsResult(data);
    setAtsLoading(false);
  };

  /* ================= DOWNLOAD ================= */
  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");

    html2pdf()
      .set({
        margin: 0.5,
        filename: `${formData.name || "resume"}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4" },
      })
      .from(element)
      .save()
      .then(() => {
        if (selectedTemplate) incrementTemplateDownload(selectedTemplate);
      });
  };

  /* ================= SAVE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      template: templateId,
      content: {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
      },
    };

    isEditMode
      ? await updateResume(id, payload, token)
      : await createResume(payload, token);

    alert(isEditMode ? "Resume updated" : "Resume created");
    navigate("/my-resumes");
  };

  /* ================= PREVIEW DATA ================= */
  const previewData = useMemo(() => {
    return { ...formData, skills: formData.skills };
  }, [formData]);

  /* ================= TEMPLATE ================= */
  const renderTemplatePreview = () => {
    const layout =
      typeof selectedTemplate?.layout === "string"
        ? selectedTemplate.layout
        : selectedTemplate?.layout?.theme || "modern";

    if (layout === "classic") return <ClassicTemplate data={previewData} />;
    if (layout === "minimal") return <MinimalTemplate data={previewData} />;
    return <ModernTemplate data={previewData} />;
  };

  return (
    <div className="resume-builder">
      {/* LEFT */}
      <form className="resume-form" onSubmit={handleSubmit}>
        <h2>{isEditMode ? "Edit Resume" : "Create Resume"}</h2>

        <input name="title" placeholder="Resume Title" value={formData.title} onChange={handleChange} required />
        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />

        <textarea name="summary" placeholder="Professional Summary" value={formData.summary} onChange={handleChange} />
        <button type="button" onClick={enhanceSummary}>✨ Enhance Summary</button>

        {/* EXPERIENCE */}
        <h4>Experience</h4>
        {formData.experiences.map((exp, i) => (
          <div key={i}>
            <input name="company" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(i, e)} />
            <input name="role" placeholder="Role" value={exp.role} onChange={(e) => handleExperienceChange(i, e)} />
            <input name="duration" placeholder="Duration" value={exp.duration} onChange={(e) => handleExperienceChange(i, e)} />
            <textarea name="description" placeholder="Description" value={exp.description} onChange={(e) => handleExperienceChange(i, e)} />
            <button type="button" onClick={() => enhanceExperience(i)}>✨ Enhance Experience</button>
          </div>
        ))}
        <button type="button" onClick={addExperience}>➕ Add Experience</button>

        {/* EDUCATION */}
        <h4>Education</h4>
        {formData.education.map((edu, i) => (
          <div key={i}>
            <input name="institute" placeholder="Institute / College / School" value={edu.institute} onChange={(e) => handleEducationChange(i, e)} />
            <input name="course" placeholder="Course" value={edu.course} onChange={(e) => handleEducationChange(i, e)} />
            <input name="duration" placeholder="Duration" value={edu.duration} onChange={(e) => handleEducationChange(i, e)} />
          </div>
        ))}
        <button type="button" onClick={addEducation}>➕ Add Education</button>

        <input name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} />

        <button type="submit">{isEditMode ? "Update Resume" : "Save Resume"}</button>
      </form>

      {/* RIGHT */}
      <div className="resume-preview-panel">
        <button onClick={downloadPDF}>⬇️ Download PDF</button>
        <button onClick={runATSCheck} disabled={atsLoading}>🧪 Check ATS</button>

        {atsResult && (
          <div className="ats-result">
            <h4>ATS Score: {atsResult.score}/100</h4>

            <ul className="ats-checks">
              {atsResult.checks.map((check, i) => (
                <li key={i} className={check.status}>
                  {check.status === "pass" ? "✅" : "❌"} {check.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div id="resume-preview">{renderTemplatePreview()}</div>
      </div>
    </div>
  );
}

export default CreateResume;
