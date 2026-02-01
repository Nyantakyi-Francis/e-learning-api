const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .select('-__v')
      .populate('instructor_id', 'name email');
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .select('-__v')
      .populate('instructor_id', 'name email bio profile_picture');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Public
exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      instructor_id,
      category,
      difficulty,
      duration_hours,
      price,
      syllabus,
      requirements,
      thumbnail_url,
      status
    } = req.body;
    
    const course = await Course.create({
      title,
      description,
      instructor_id,
      category,
      difficulty,
      duration_hours,
      price,
      syllabus,
      requirements,
      thumbnail_url,
      status
    });
    
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Public
exports.updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    const {
      title,
      description,
      instructor_id,
      category,
      difficulty,
      duration_hours,
      price,
      syllabus,
      requirements,
      thumbnail_url,
      status,
      rating
    } = req.body;
    
    course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        instructor_id,
        category,
        difficulty,
        duration_hours,
        price,
        syllabus,
        requirements,
        thumbnail_url,
        status,
        rating
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID format'
      });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Public
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    await Course.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
      data: {}
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};