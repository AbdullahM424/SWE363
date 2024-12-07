//the server
const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(cors());


const startServer = async () => {
    try {
      await connectDB(); // Ensure the database connection is established
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);

      });
    } catch (error) {
      console.error("Failed to connect to the database:", error);
      process.exit(1); // Exit the process if the database connection fails
    }
  };
  
  startServer();