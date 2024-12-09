const express = require('express');
const router = express.Router();
const Instructor = require("..models/Instructors.js");
// C:\Users\alhas\Desktop\swe project\SWE363\backend\models\Instructors.js

// Get all instructors
router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new instructor
router.post('/', async (req, res) => {
  const instructor = new Instructor({
    name: req.body.name,
    department: req.body.department,
    rating: req.body.rating,
  });

  try {
    const newInstructor = await instructor.save();
    res.status(201).json(newInstructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
