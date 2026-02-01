const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a course description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  instructor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide an instructor']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['programming', 'design', 'business', 'marketing', 'photography', 'music', 'other']
  },
  difficulty: {
    type: String,
    required: [true, 'Please provide difficulty level'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  duration_hours: {
    type: Number,
    required: [true, 'Please provide course duration'],
    min: [0, 'Duration cannot be negative']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative'],
    default: 0
  },
  syllabus: [{
    type: String
  }],
  requirements: [{
    type: String
  }],
  thumbnail_url: {
    type: String,
    default: 'https://via.placeholder.com/300x200'
  },
  enrollment_count: {
    type: Number,
    default: 0,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot exceed 5']
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);