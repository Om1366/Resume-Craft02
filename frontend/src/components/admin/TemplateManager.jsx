import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const API_URL = "http://localhost:5001/api/templates";

const layoutMap = {
  modern: {
    theme: "modern",
    sections: ["summary", "experience", "education", "skills"],
  },
  classic: {
    theme: "classic",
    sections: ["education", "experience", "skills"],
  },
  minimal: {
    theme: "minimal",
    sections: ["summary", "experience", "skills"],
  },
};

function TemplateManager() {
  const { token } = useContext(AuthContext);

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [layout, setLayout] = useState("modern");
  const [error, setError] = useState("");

  /* ================= FETCH ================= */
  const fetchTemplates = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTemplates(data);
    } catch {
      setError("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  /* ================= ADD ================= */
  const handleAddTemplate = async (e) => {
    e.preventDefault();
    if (!name) return alert("Template name is required");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          layout: layoutMap[layout],
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      setName("");
      setLayout("modern");
      fetchTemplates();
    } catch (err) {
      alert(err.message);
    }
  };

  /* ================= DELETE ================= */
  const handleDeleteTemplate = async (id) => {
    if (!window.confirm("Delete this template permanently?")) return;

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchTemplates();
  };

  /* ================= UI ================= */
  return (
    <div className="tm-wrapper">
      {/* HEADER */}
      <div className="tm-header">
        <div>
          <h2>Template Manager</h2>
          <p>Create, monitor and manage resume templates</p>
        </div>
      </div>

      {/* ADD FORM */}
      <form className="tm-form" onSubmit={handleAddTemplate}>
        <input
          placeholder="Template name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select value={layout} onChange={(e) => setLayout(e.target.value)}>
          <option value="modern">Modern</option>
          <option value="classic">Classic</option>
          <option value="minimal">Minimal</option>
        </select>

        <button type="submit">➕ Add Template</button>
      </form>

      {/* TABLE */}
      {loading ? (
        <p className="tm-state">Loading templates…</p>
      ) : templates.length === 0 ? (
        <p className="tm-state">No templates found</p>
      ) : (
        <div className="tm-table-card">
          <table className="tm-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Layout</th>
                <th>Views</th>
                <th>Downloads</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {templates.map((t) => (
                <tr key={t._id}>
                  <td className="tm-name">{t.name}</td>

                  <td>
                    <span className={`tm-badge ${t.layout?.theme}`}>
                      {t.layout?.theme}
                    </span>
                  </td>

                  <td>{t.views || 0}</td>
                  <td>{t.downloads || 0}</td>

                  <td>
                    <button
                      className="tm-delete"
                      onClick={() => handleDeleteTemplate(t._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {error && <p className="tm-error">{error}</p>}
    </div>
  );
}

export default TemplateManager;
