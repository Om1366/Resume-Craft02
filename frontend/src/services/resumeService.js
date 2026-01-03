const API_URL = `${import.meta.env.VITE_API_URL}/api/resumes`;


// CREATE RESUME
export const createResume = async (resumeData, token) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(resumeData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// GET MY RESUMES
export const getMyResumes = async (token) => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// ✅ GET RESUME BY ID (FIXES YOUR ERROR)
export const getResumeById = async (id, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// ✅ UPDATE RESUME
export const updateResume = async (id, resumeData, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(resumeData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};
