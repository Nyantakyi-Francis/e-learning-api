const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  enrolled_courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  completed_courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  certifications: [{
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    issued_date: Date,
    certificate_url: String
  }],
  profile_picture: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  join_date: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);