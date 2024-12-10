const express = require('express');
const router  = express.Router();
const Course  = require('../models/Course');

//Get all the courses
router.get("/course", async (req, res)=> {
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

// Delete a course by the its name
router.delete("/", async (req, res)=>{
    const courseName = req.body.courseName;
    try{
        const deletedCourse  = await Course.findOneAndDelete({courseName});
        if(!deletedCourse){
            return res.status(404).json({ message: 'The course is not found.' });
        }
        res.json({ message: 'The course is deleted successfully.' });
    } catch(error){
        res.status(500).json({ message: 'Failed to delete the course.', error });
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