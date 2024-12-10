const express = require('express');
const router  = express.Router();
const Course  = require('../models/Course');
const Experience = require('../models/Experience'); // Experience model


//Get all the courses
router.get("/allCourses", async (req, res)=> {
    try{
    const courses = await Course.find();
    res.json(courses);
    } catch (error) {
        res.status(404).json({message: "There is no course.",error});
    }
});

// Add a new course by the admin
router.post("/", async (req, res)=>{
    try {
        const courseName = req.body.courseName;
        const information  = req.body.info;

        if(!courseName){
            return res.status(400).json({ message: 'All fields are required.66' });
        }

        const newCourse  = new Course({
            courseName,
            information
        })
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error){
        res.status(500).json({ message: 'Adding the course is failed.', error });
    }
});

// Delete a course by its name and its related experiences
router.delete("/", async (req, res) => {
    const courseName = req.body.courseName;

    try {
        // Delete the course
        const deletedCourse = await Course.findOneAndDelete({ courseName });
        if (!deletedCourse) {
            return res.status(404).json({ message: 'The course is not found.' });
        }

        // Delete experiences related to the course
        await Experience.deleteMany({ courseName });

        res.json({ message: 'The course and its related experiences are deleted successfully.' });
    } catch (error) {
        console.error('Error deleting course and experiences:', error);
        res.status(500).json({ message: 'Failed to delete the course and experiences.', error });
    }
});


// Delete a course by the id 
router.delete("/:courseId", async (req, res)=>{
    const courseId = req.params.courseId;
    try{
        const deletedCourse  = await Course.findByIdAndDelete(courseId);
        if(!deletedCourse){
            return res.status(404).json({ message: 'The course is not found.' });
        }
        res.json({ message: 'The course is deleted successfully.' });
    } catch(error){
        res.status(500).json({ message: 'Deleting the course is failed', error });
    }
});

module.exports = router;