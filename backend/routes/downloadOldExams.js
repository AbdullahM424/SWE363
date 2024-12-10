const express = require('express');
const path = require('path');
const OldExam = require('../models/OldExam');

const router = express.Router();

// GET all old exams
router.get('/', async (req, res) => {
    try {
      const exams = await OldExam.find().sort({ createdAt: -1 });
      res.json(exams);
    } catch (error) {
      console.error('Error retrieving exams:', error);
      res.status(500).json({ message: 'Server error retrieving exams' });
    }
  });  

// GET to download a single exam by ID
router.get('/:id', async (req, res) => {
    try {
        const oldExam = await OldExam.findById(req.params.id);
        if (!oldExam) {
        return res.status(404).send('File not found');
        }

        const filePath = path.join(__dirname, '../Files/OldExams', oldExam.fileName);
        res.setHeader('Content-Disposition', `attachment; filename="${oldExam.fileName}"`);
        res.download(filePath, oldExam.fileName, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error downloading file');
        }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
    });

// DELETE an old exam by ID
router.delete('/:id', async (req, res) => {
    try {
      const oldExam = await OldExam.findById(req.params.id);
      if (!oldExam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
  
      const filePath = path.join(__dirname, '../Files/OldExams', oldExam.fileName);
  
      // delete the file from the filesystem
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.error('Error removing file:', err);
        }
  
        // Remove the record from the database
        await OldExam.deleteOne({ _id: req.params.id });
        res.json({ message: 'Exam deleted successfully' });
      });
  
    } catch (error) {
      console.error('Error deleting exam:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
