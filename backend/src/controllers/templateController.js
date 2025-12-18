const Template = require("../models/Template");

/* =========================
   ADMIN: CREATE TEMPLATE
========================= */
exports.createTemplate = async (req, res) => {
  try {
    const { name, layout, previewImage } = req.body;

    if (!name || !layout) {
      return res.status(400).json({
        message: "Template name and layout are required",
      });
    }

    const template = await Template.create({
      name: name.trim(),
      layout,
      previewImage: previewImage || "",
      createdBy: req.user._id,
      views: 0,
      downloads: 0,
    });

    res.status(201).json({
      ...template.toObject(),
      source: "db",
    });
  } catch (error) {
    console.error("Create template error:", error);
    res.status(500).json({ message: "Failed to create template" });
  }
};

/* =========================
   PUBLIC: GET ALL TEMPLATES
========================= */
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find()
      .sort({ createdAt: -1 })
      .select("-__v")
      .lean();

    res.json(
      templates.map((t) => ({
        ...t,
        source: "db",
      }))
    );
  } catch (error) {
    console.error("Get templates error:", error);
    res.status(500).json({ message: "Failed to fetch templates" });
  }
};

/* =========================
   ADMIN: DELETE TEMPLATE
========================= */
exports.deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        message: "Template not found",
      });
    }

    await template.deleteOne();

    res.json({ message: "Template deleted successfully" });
  } catch (error) {
    console.error("Delete template error:", error);
    res.status(500).json({ message: "Failed to delete template" });
  }
};

/* =========================
   👀 INCREMENT TEMPLATE VIEWS
========================= */
exports.incrementViews = async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .select("-__v")
      .lean();

    if (!template) {
      return res.status(404).json({
        message: "Template not found",
      });
    }

    res.json({
      ...template,
      source: "db",
    });
  } catch (error) {
    console.error("Increment views error:", error);
    res.status(500).json({ message: "Failed to increment views" });
  }
};

/* =========================
   ⬇️ INCREMENT TEMPLATE DOWNLOADS
========================= */
exports.incrementDownloads = async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true }
    )
      .select("-__v")
      .lean();

    if (!template) {
      return res.status(404).json({
        message: "Template not found",
      });
    }

    res.json({
      ...template,
      source: "db",
    });
  } catch (error) {
    console.error("Increment downloads error:", error);
    res.status(500).json({ message: "Failed to increment downloads" });
  }
};
