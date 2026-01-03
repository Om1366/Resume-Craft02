const express = require("express");
const cors = require("cors");

/* =========================
   ROUTE IMPORTS
========================= */
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const templateRoutes = require("./routes/templateRoutes");
const aiRoutes = require("./routes/aiRoutes");
const atsRoutes = require("./routes/atsRoutes"); // ✅ ATS ROUTES

const app = express(); // ✅ MUST be before app.use

/* =========================
   GLOBAL MIDDLEWARES
========================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://vercel-eta-three-24.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);


/* =========================
   DIRECT TEST ROUTE
========================= */
app.get("/test-direct", (req, res) => {
  res.json({ works: true });
});

/* =========================
   API ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ats", atsRoutes); // ✅ ATS ROUTE REGISTERED

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.status(200).send("🚀 CareerSphere Backend is running");
});

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/* =========================
   ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    message: "Internal Server Error",
  });
});

module.exports = app;
