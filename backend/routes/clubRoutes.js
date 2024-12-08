const express = require('express');
const Club = require('../models/Club');
const router = express.Router();
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post('/addclub', upload.single('profileImg'), async (req, res) => {
  const { clubName, profileDescription, socialMediaContacts } = req.body;
  const profileImg = req.file ? req.file.path : null;

  try {
    const newClub = new Club({
      clubName,
      profileDescription,
      profileImg,
      socialMediaContacts: JSON.parse(socialMediaContacts),
    });

    const savedClub = await newClub.save();
    res.json(savedClub);
  } catch (err) {
    console.error('Error saving club:', err);
    res.status(500).send('Server Error');
  }
});


module.exports = router;