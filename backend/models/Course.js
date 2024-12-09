const mongoose  = require('mongoose');

const CourseSchema  = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    Info: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Course', CourseSchema);