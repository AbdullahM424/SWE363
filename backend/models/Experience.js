const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  total: {
    type: String,
    required: true 
  },
  totalRating: {
    type: Number,
    default: 0, // The cumulative rating score
  },
  numberOfUsers: {
    type: Number,
    default: 0, // The number of users who have rated
  },
  rating: {
    type: Number,
    default: 0, // Average rating (totalRating / numberOfUsers)
  }
});

// Automatically calculate the rating whenever totalRating or numberOfUsers changes
ExperienceSchema.methods.updateRating = function () {
  if (this.numberOfUsers > 0) {
    this.rating = parseInt(this.totalRating / this.numberOfUsers);
  } else {
    this.rating = 0; // Reset if no users have rated
  }
  return this.rating;
};

module.exports = mongoose.model('Experience', ExperienceSchema);
