const Enrollment = require('../models/Enrollment');

// @desc    Get all enrollments
// @route   GET /api/enrollments
// @access  Public
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .select('-__v')
      .populate('user_id', 'name email')
      .populate('course_id', 'title category price');
    
    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single enrollment by ID
// @route   GET /api/enrollments/:id
// @access  Public
exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .select('-__v')
      .populate('user_id', 'name email role')
      .populate('course_id', 'title category instructor_id')
      .populate('completed_lessons', 'title order');
    
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid enrollment ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get enrollments by user ID
// @route   GET /api/enrollments/user/:userId
// @access  Public
exports.getEnrollmentsByUser = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user_id: req.params.userId })
      .select('-__v')
      .populate('course_id', 'title category difficulty duration_hours');
    
    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get enrollments by course ID
// @route   GET /api/enrollments/course/:courseId
// @access  Public
exports.getEnrollmentsByCourse = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ course_id: req.params.courseId })
      .select('-__v')
      .populate('user_id', 'name email role');
    
    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
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

// @desc    Create new enrollment
// @route   POST /api/enrollments
// @access  Private
exports.createEnrollment = async (req, res) => {
  try {
    const {
      user_id,
      course_id,
      progress_percentage,
      payment_status,
      notes
    } = req.body;
    
    // Check if enrollment already exists
    const existingEnrollment = await Enrollment.findOne({ user_id, course_id });
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'User is already enrolled in this course'
      });
    }
    
    const enrollment = await Enrollment.create({
      user_id,
      course_id,
      progress_percentage,
      payment_status,
      notes
    });
    
    res.status(201).json({
      success: true,
      message: 'Enrollment created successfully',
      data: enrollment
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
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User is already enrolled in this course'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update enrollment
// @route   PUT /api/enrollments/:id
// @access  Private
exports.updateEnrollment = async (req, res) => {
  try {
    let enrollment = await Enrollment.findById(req.params.id);
    
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }
    
    const {
      progress_percentage,
      completed_lessons,
      completion_date,
      grade,
      certificate_issued,
      payment_status,
      notes
    } = req.body;
    
    enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      {
        progress_percentage,
        completed_lessons,
        last_accessed: Date.now(),
        completion_date,
        grade,
        certificate_issued,
        payment_status,
        notes
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Enrollment updated successfully',
      data: enrollment
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid enrollment ID format'
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

// @desc    Delete enrollment
// @route   DELETE /api/enrollments/:id
// @access  Private
exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }
    
    await Enrollment.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Enrollment deleted successfully',
      data: {}
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid enrollment ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};