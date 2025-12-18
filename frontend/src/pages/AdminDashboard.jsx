import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Admin Components
import TemplateManager from "../components/admin/TemplateManager.jsx";
import ATSControl from "../components/admin/ATSControl.jsx";

function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState("templates");

  const renderSection = () => {
    switch (activeSection) {
      case "templates":
        return <TemplateManager />;
      case "ats":
        return <ATSControl />;
      default:
        return <TemplateManager />;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* ================= HEADER ================= */}
      <div className="admin-header">
        <div className="admin-header-text">
          <h1>Admin Dashboard</h1>
          <p>Manage ResumeCraft system settings and templates</p>
        </div>

        <button className="logout-btn admin-logout" onClick={logout}>
          Logout
        </button>
      </div>

      {/* ================= ADMIN NAV ================= */}
      <div className="admin-nav">
        <button
          onClick={() => setActiveSection("templates")}
          className={`admin-tab ${
            activeSection === "templates" ? "active" : ""
          }`}
        >
          🧩 Template Manager
        </button>

        <button
          onClick={() => setActiveSection("ats")}
          className={`admin-tab ${
            activeSection === "ats" ? "active" : ""
          }`}
        >
          ⚙️ ATS & System Control
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="admin-content">
        {renderSection()}
      </div>
    </div>
  );
}

export default AdminDashboard;
