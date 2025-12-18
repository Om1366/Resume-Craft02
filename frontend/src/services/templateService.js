const DB_API_URL = "http://localhost:5001/api/templates";
const EXTERNAL_API_URL =
  "https://raw.githubusercontent.com/Om1366/templates/main/templates.json";

/* =========================
   🔹 FETCH DB TEMPLATES
========================= */
export const getDbTemplates = async () => {
  const res = await fetch(DB_API_URL);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch DB templates");
  }

  return data.map((t) => ({
    ...t,
    source: "db",
    views: t.views ?? 0,
    downloads: t.downloads ?? 0,
  }));
};

/* =========================
   🔹 FETCH API TEMPLATES
========================= */
export const getApiTemplates = async () => {
  const res = await fetch(EXTERNAL_API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch external templates");
  }

  const data = await res.json();

  return data.map((t, index) => ({
    ...t,
    id: t.id || `api-${index}`,
    source: "api",
    views: 0,       // static
    downloads: 0,   // static
  }));
};

/* =========================
   🔹 FETCH ALL TEMPLATES
========================= */
export const getTemplates = async () => {
  const [dbTemplates, apiTemplates] = await Promise.all([
    getDbTemplates(),
    getApiTemplates(),
  ]);

  return [...dbTemplates, ...apiTemplates];
};

/* =========================
   👀 INCREMENT TEMPLATE VIEW
   (DB templates only)
========================= */
export const incrementTemplateView = async (template) => {
  if (!template || template.source !== "db" || !template._id) return;

  try {
    await fetch(`${DB_API_URL}/${template._id}/view`, {
      method: "PATCH",
    });
  } catch (err) {
    console.error("Failed to increment template view", err);
  }
};

/* =========================
   ⬇️ INCREMENT TEMPLATE DOWNLOAD
   (DB templates only)
========================= */
export const incrementTemplateDownload = async (template) => {
  if (!template || template.source !== "db" || !template._id) return;

  try {
    await fetch(`${DB_API_URL}/${template._id}/download`, {
      method: "PATCH",
    });
  } catch (err) {
    console.error("Failed to increment template download", err);
  }
};
