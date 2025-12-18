import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Templates from "./pages/Templates";
import CreateResume from "./pages/CreateResume";
import MyResumes from "./pages/MyResumes";
import InterviewTips from "./pages/InterviewTips";

import { AuthContext } from "./context/AuthContext";

/* =========================
   PROTECTED ROUTE
========================= */
function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/" />;
}

function App() {
  const { token, role } = useContext(AuthContext);

  return (
    <>
      {/* ================= BRAND HEADER ================= */}
      <div className="app-header">
        ResumeCraft <span>– Smart Resume Builder</span>
      </div>

      {/* ================= ROUTES ================= */}
      <Routes>
        {/* ================= AUTH ================= */}
        <Route
          path="/"
          element={!token ? <Login /> : <Navigate to="/dashboard" />}
        />

        <Route path="/signup" element={<Signup />} />

        {/* ================= DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {role === "admin" ? <AdminDashboard /> : <UserDashboard />}
            </ProtectedRoute>
          }
        />

        {/* ================= USER FEATURES ================= */}
        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <Templates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-resume/:templateId"
          element={
            <ProtectedRoute>
              <CreateResume />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-resume/:id"
          element={
            <ProtectedRoute>
              <CreateResume />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-resumes"
          element={
            <ProtectedRoute>
              <MyResumes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview-tips"
          element={
            <ProtectedRoute>
              <InterviewTips />
            </ProtectedRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
