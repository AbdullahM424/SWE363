const mongoose = require('mongoose');

const OldExamSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('OldExam', OldExamSchema); 