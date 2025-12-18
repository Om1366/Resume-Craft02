const Resume = require("../models/Resume");

// CREATE RESUME
exports.createResume = async (req, res) => {
  try {
    const { template, content, title } = req.body;

    const resume = await Resume.create({
      user: req.user._id,
      template,
      content,
      title,
    });

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL RESUMES OF LOGGED-IN USER
exports.getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id })
      .populate("template", "name")
      .sort({ createdAt: -1 });

    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE RESUME
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).populate(
      "template",
      "name layout"
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE RESUME
exports.updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    resume.content = req.body.content || resume.content;
    resume.title = req.body.title || resume.title;
    resume.isPublic =
      req.body.isPublic !== undefined
        ? req.body.isPublic
        : resume.isPublic;

    const updatedResume = await resume.save();

    res.json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
