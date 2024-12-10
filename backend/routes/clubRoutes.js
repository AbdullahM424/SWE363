const express = require('express');
const router = express.Router();
const Club = require('../models/Club'); // Adjust the path as necessary

router.post('/addclub', async (req, res) => {
  const { clubName, profileDescription, socialMediaContacts, profileImg } = req.body;
  console.log(clubName, profileDescription, socialMediaContacts, profileImg)
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
    console.error('Error saving club:', err.message);
    res.status(500).send('Server Error: ' + err.message);
  }
});

router.get('/clubnames', async (req, res) => {
  try {
    const clubs = await Club.find({}, 'clubName');
    const clubNames = clubs.map(club => club.clubName);
    res.json(clubNames);
  } catch (err) {
    console.error('Error retrieving club names:', err.message);
    res.status(500).send('Server Error: ' + err.message);
  }
});

router.get("/getclub/:clubName", async (req, res)=>{
  const {clubName} = req.params;

  try{
    const club = await Club.findOne({clubName});
    if(!club){
      return res.status(404).json({message:"Club not found"});
    }
    res.json(club);
  }catch(error){
    console.error('Error retrieving club information:', err.message);
    res.status(500).send('Server Error: ' + err.message);
  }
})

router.put("/updateclub/:clubName", async (req, res) => {
  try {
    const theclubName = req.params.clubName;
    const { clubName: newClubName, profileDescription, profileImg, socialMediaContacts } = req.body;

    console.log('Received data:', req.body);

    // Find the club by its name
    const club = await Club.findOne({ clubName: theclubName });

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Update the club information
    club.clubName = newClubName || club.clubName;
    club.profileDescription = profileDescription || club.profileDescription;
    club.profileImg = profileImg || club.profileImg;
    club.socialMediaContacts = JSON.parse(socialMediaContacts) || club.socialMediaContacts;

    // Save the updated club information
    await club.save();
    res.status(200).json({ message: 'Club updated successfully', club });

  } catch (error) {
    console.error('Error updating club:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;