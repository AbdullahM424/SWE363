//the server
const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const app = express();
const PORT = 8080;
const usersRouter = require("./routes/userRoutes.js");
const experienceRoutes =require("./routes/experienceRoutes.js");
const courseRoutes = require("./routes/courseRoutes.js");
//const uploadOldExamsRoute = require('./routes/uploadOldExams');
const downloadOldExamsRoute = require('./routes/downloadOldExams');
const InstructorRoute = require("./routes/instructorsRoutes.js");
const courseRouter = require("./routes/courseRoutes.js");
const clubRoutes = require("./routes/clubRoutes.js")
const slidesRoutes = require("./routes/slidesRoutes.js");



// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/users",usersRouter);
app.use('/api/experiences', experienceRoutes);
app.use('/api/courses', courseRoutes);
//app.use('/upload-old-exams', uploadOldExamsRoute);
app.use('/download-old-exams', downloadOldExamsRoute);
app.use('/api/Instructor', InstructorRoute);
app.use('/api/courses', courseRouter);
app.use('/api/clubs', clubRoutes )
app.use("/api/slides", slidesRoutes);





const startServer = async () => {
    try {
      await connectDB(); // Ensure the database connection is established
      app.listen(PORT, '::',() => {
        console.log(`Server running on http://localhost:${PORT}`);

      });
    } catch (error) {
      console.error("Failed to connect to the database:", error);
      process.exit(1); // Exit the process if the database connection fails
    }
  };
  
  startServer();