import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function UserDashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="user-dashboard">
      {/* ===== HEADER ===== */}
      <div className="user-dashboard-header">
        <h1>ResumeCraft</h1>
        <p>Create professional, ATS-friendly resumes with ease</p>
      </div>

      {/* ===== DASHBOARD CARDS ===== */}
      <div className="user-dashboard-cards">
        <Link to="/templates" className="user-card">
          <h3>📄 Resume Templates</h3>
          <p>Browse professionally designed resume templates</p>
        </Link>

        <Link to="/templates" className="user-card">
          <h3>✍️ Create Resume</h3>
          <p>Build your resume with live preview & AI assistance</p>
        </Link>

        <Link to="/my-resumes" className="user-card">
          <h3>📂 My Resumes</h3>
          <p>View, edit, and download your saved resumes</p>
        </Link>

        <Link to="/interview-tips" className="user-card">
          <h3>🎯 Interview Preparation</h3>
          <p>Get AI-powered interview preparation tips</p>
        </Link>
      </div>

      {/* ===== LOGOUT ===== */}
      <div className="user-dashboard-footer">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;
