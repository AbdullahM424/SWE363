const express = require('express');
const multer = require('multer');
const path = require('path');
const OldExam = require('../models/OldExam');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../Files/OldExams'));
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    }
  });
  

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    //Check file type. For PDF:
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDFs are allowed'), false);
    }
    cb(null, true);
  }
});

router.post('/', upload.single('pdf'), async (req, res) => {
  try {
    // Create a new database entry referencing the uploaded file
    const newExam = new OldExam({ fileName: req.file.filename });
    await newExam.save();
    res.status(201).json({ message: 'File uploaded successfully', examId: newExam._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during upload' });
  }
});

module.exports = router;