const mongoose = require('mongoose');

// Subtopic Schema
const subtopicSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
});

// Topic Schema with subtopics
const topicSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  subtopics: [subtopicSchema],  
});

// SubCategory Schema
const subcategorySchema = new mongoose.Schema({
  name: String,
  image: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  description: String,
  duration: String,
  topics: [topicSchema],
  fees:String,
});

module.exports = mongoose.model('SubCategory', subcategorySchema);
