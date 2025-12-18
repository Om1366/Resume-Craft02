import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getMyResumes } from "../services/resumeService";
import { AuthContext } from "../context/AuthContext";

function MyResumes() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getMyResumes(token);
        setResumes(data);
      } catch (err) {
        setError(err.message || "Failed to load resumes");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [token]);

  if (loading) {
    return <p className="page-loading">Loading your resumes…</p>;
  }

  if (error) {
    return <p className="page-error">{error}</p>;
  }

  return (
    <div className="my-resumes-page">
      <div className="my-resumes-header">
        <h1>My Resumes</h1>
        <p>Manage, edit, and download your resumes</p>
      </div>

      {resumes.length === 0 ? (
        <p className="empty-state">
          You haven’t created any resumes yet.
        </p>
      ) : (
        <div className="resume-grid">
          {resumes.map((resume) => (
            <div key={resume._id} className="resume-card">
              <div className="resume-card-header">
                <h3>{resume.title}</h3>
                <span className="resume-template">
                  {resume.template?.name || "Custom Template"}
                </span>
              </div>

              <div className="resume-meta">
                <span>
                  📅{" "}
                  {new Date(resume.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="resume-actions">
                <button
                  className="secondary-btn"
                  onClick={() =>
                    navigate(`/edit-resume/${resume._id}`)
                  }
                >
                  ✏️ Edit
                </button>

                <button
                  className="primary-btn"
                  onClick={() =>
                    navigate(`/edit-resume/${resume._id}`)
                  }
                >
                  ⬇️ Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyResumes;
