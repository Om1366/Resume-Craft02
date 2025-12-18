import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getTemplates,
  incrementTemplateView,
} from "../services/templateService";

// Template previews
import ModernTemplate from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";

import sampleResumeData from "../utils/sampleResumeData";

/* =========================
   🔥 PRIORITY SORTING
========================= */
const sortTemplatesByPriority = (templates) => {
  return [...templates].sort((a, b) => {
    if (a.source === "db" && b.source !== "db") return -1;
    if (a.source !== "db" && b.source === "db") return 1;

    const d = (b.downloads || 0) - (a.downloads || 0);
    if (d !== 0) return d;

    const v = (b.views || 0) - (a.views || 0);
    if (v !== 0) return v;

    return 0;
  });
};

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getTemplates();
        setTemplates(sortTemplatesByPriority(data));
      } catch (err) {
        setError(err.message || "Failed to load templates");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return <p className="page-loading">Loading templates…</p>;
  }

  if (error) {
    return <p className="page-error">{error}</p>;
  }

  return (
    <div className="templates-page">
      <div className="templates-header">
        <h1>Resume Templates</h1>
        <p>Choose a professionally designed resume to get started</p>
      </div>

      {templates.length === 0 ? (
        <p>No templates available</p>
      ) : (
        <div className="templates-grid">
          {templates.map((template) => {
            const templateId = template._id || template.id;

            const layoutType =
              typeof template.layout === "string"
                ? template.layout
                : template.layout?.theme || "modern";

            return (
              <div key={templateId} className="template-card">
                {/* ===== Thumbnail ===== */}
                <div className="template-thumbnail">
                  <div className="template-scale">
                    {layoutType === "classic" && (
                      <ClassicTemplate data={sampleResumeData} />
                    )}

                    {layoutType === "minimal" && (
                      <MinimalTemplate data={sampleResumeData} />
                    )}

                    {layoutType === "modern" && (
                      <ModernTemplate data={sampleResumeData} />
                    )}
                  </div>
                </div>

                {/* ===== Info ===== */}
                <div className="template-info">
                  <h3>{template.name}</h3>

                  <span className="template-layout">
                    {layoutType.toUpperCase()}
                  </span>

                  <div className="template-stats">
                    <span>👀 {template.views || 0}</span>
                    <span>⬇️ {template.downloads || 0}</span>
                  </div>

                  <button
                    className="primary-btn"
                    onClick={() => {
                      incrementTemplateView(template);

                      if (template.source === "db") {
                        setTemplates((prev) =>
                          sortTemplatesByPriority(
                            prev.map((t) =>
                              t._id === template._id
                                ? { ...t, views: (t.views || 0) + 1 }
                                : t
                            )
                          )
                        );
                      }

                      navigate(`/create-resume/${templateId}`, {
                        state: { template },
                      });
                    }}
                  >
                    Use Template →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Templates;
