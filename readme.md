# 📄 ResumeCraft – Smart Resume Builder with ATS

ResumeCraft is a full-stack resume builder web application that allows users to create professional resumes using modern templates and evaluate them using an ATS (Applicant Tracking System).

The project is built using **React (Frontend)**, **Node.js + Express (Backend)**, and **MongoDB (Database)**.

---

## 🚀 Features

### 👤 User Features
- Create and edit resumes
- Choose from **Modern, Classic, and Minimal** resume templates
- Live resume preview while editing
- Download resume as **PDF**
- AI-powered content enhancement (summary & experience)
- ATS score checking with detailed feedback

### ⚙️ ATS (Applicant Tracking System)
- Checks:
  - Minimum word count
  - Required sections
  - Required keywords
- Generates:
  - ATS score (0–100)
  - Detailed pass/fail feedback
- ATS rules are configurable by admin

### 🛠 Admin Features
- Manage resume templates
- Configure ATS rules:
  - Minimum word count
  - Mandatory sections
  - Important keywords
- View template usage statistics

---

## 🧱 Tech Stack

### Frontend
- React
- React Router
- Context API
- HTML2PDF
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### AI
- AI-based text enhancement for resume content

---

## 📁 Project Structure

ResumeCraft/
│
├── backend/
│ ├── controllers/
│ │ ├── atsController.js
│ │ ├── resumeController.js
│ │ └── templateController.js
│ │
│ ├── models/
│ │ ├── Resume.js
│ │ ├── Template.js
│ │ └── ATSRules.js
│ │
│ ├── routes/
│ │ ├── atsRoutes.js
│ │ ├── resumeRoutes.js
│ │ └── templateRoutes.js
│ │
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── CreateResume.jsx
│ │ │ ├── Templates.jsx
│ │ │ └── AdminDashboard.jsx
│ │ │
│ │ ├── templates/
│ │ │ ├── ModernTemplate.jsx
│ │ │ ├── ClassicTemplate.jsx
│ │ │ └── MinimalTemplate.jsx
│ │ │
│ │ ├── services/
│ │ ├── context/
│ │ └── utils/
│ │
│ └── App.jsx

Installation & Setup
Backend
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm run dev