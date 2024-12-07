// connect to the database
const mongoose = require('mongoose');

// MongoDB connection string
const uri = 'mongodb+srv://humaidakah:kahkah@swe363-db.eachi.mongodb.net/KFUPM-KICKSTART?retryWrites=true&w=majority';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to Kickstart database');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;