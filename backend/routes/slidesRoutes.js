const express = require("express");
const multer = require("multer");
const path = require("path");
const Slide = require("../models/Slide.js");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Route to upload a slide
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`; // File path in uploads folder

    const slide = new Slide({
      title,
      description,
      fileUrl
    });

    await slide.save();
    res.status(201).json({ message: "Slide uploaded successfully", slide });
  } catch (err) {
    res.status(500).json({ message: "Error uploading slide", error: err.message });
  }
});

// Route to get all slides
router.get("/", async (req, res) => {
  try {
    const slides = await Slide.find();
    res.status(200).json(slides);
  } catch (err) {
    res.status(500).json({ message: "Error fetching slides", error: err.message });
  }
});

// Route to download a slide
router.get("/download/:id", async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({ message: "Slide not found" });
    }

    const filePath = path.join(__dirname, "..", slide.fileUrl);
    res.download(filePath, (err) => {
      if (err) {
        res.status(500).json({ message: "Error downloading file", error: err.message });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error finding slide", error: err.message });
  }
});

module.exports = router;
