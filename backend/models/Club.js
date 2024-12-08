const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
  },
  profileDescription: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    required: true,
  },
  announcements: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  socialMediaContacts: [
    {
      platform: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Club', ClubSchema);
