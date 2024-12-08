const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// 1. Fetch all experiences for a course (User)
router.get('/:courseName', async (req, res) => {
  try {
    const experiences = await Experience.find({ courseName: req.params.courseName });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch experiences.', error });
  }
});

// 2. Create a new experience (Admin)
router.post('/', async (req, res) => {
  try {
    const { courseName, title, description, total } = req.body;

    // Validate required fields
    if (!courseName || !title || !description || !total) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newExperience = new Experience({
      courseName,
      title,
      description,
      total
    });

    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create experience.', error });
  }
});

// 3. Delete an experience by ID (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    if (!deletedExperience) {
      return res.status(404).json({ message: 'Experience not found.' });
    }
    res.json({ message: 'Experience deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete experience.', error });
  }
});

// 4. Rate an experience (User)
router.post('/rate/:id', async (req, res) => {
  const { rating } = req.body;

  if (rating < 0 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 0 and 5.' });
  }

  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found.' });
    }

    experience.totalRating += rating;
    experience.numberOfUsers += 1;
    experience.updateRating(); // Recalculate average rating
    await experience.save();

    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Failed to rate experience.', error });
  }
});

module.exports = router;
