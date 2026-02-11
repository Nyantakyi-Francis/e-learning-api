const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Please provide a course ID']
  },
  title: {
    type: String,
    required: [true, 'Please provide a lesson title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a lesson description'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  content: {
    type: String,
    required: [true, 'Please provide lesson content']
  },
  video_url: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please provide a valid URL']
  },
  duration_minutes: {
    type: Number,
    required: [true, 'Please provide lesson duration'],
    min: [1, 'Duration must be at least 1 minute']
  },
  order: {
    type: Number,
    required: [true, 'Please provide lesson order'],
    min: [1, 'Order must be at least 1']
  },
  resources: [{
    name: String,
    url: String,
    type: String
  }],
  quiz_questions: [{
    question: String,
    options: [String],
    correct_answer: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Lesson', lessonSchema);