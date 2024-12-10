const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  fileUrl: { type: String, required: true }, // URL or path to the uploaded file
  uploadedAt: { type: Date, default: Date.now },
  course: { type: String, required: true } // Course name or ID
});

const Slide = mongoose.model("Slide", slideSchema);

module.exports = Slide;
