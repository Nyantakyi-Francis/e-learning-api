const Lesson = require('../models/Lesson');

// @desc    Get all lessons
// @route   GET /api/lessons
// @access  Public
exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find()
      .select('-__v')
      .populate('course_id', 'title category');
    
    res.status(200).json({
      success: true,
      count: lessons.length,
      data: lessons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single lesson by ID
// @route   GET /api/lessons/:id
// @access  Public
exports.getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .select('-__v')
      .populate('course_id', 'title category instructor_id');
    
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: lesson
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid lesson ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get lessons by course ID
// @route   GET /api/lessons/course/:courseId
// @access  Public
exports.getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course_id: req.params.courseId })
      .select('-__v')
      .sort('order');
    
    res.status(200).json({
      success: true,
      count: lessons.length,
      data: lessons
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

// @desc    Create new lesson
// @route   POST /api/lessons
// @access  Private (Instructor/Admin)
exports.createLesson = async (req, res) => {
  try {
    const {
      course_id,
      title,
      description,
      content,
      video_url,
      duration_minutes,
      order,
      resources,
      quiz_questions
    } = req.body;
    
    const lesson = await Lesson.create({
      course_id,
      title,
      description,
      content,
      video_url,
      duration_minutes,
      order,
      resources,
      quiz_questions
    });
    
    res.status(201).json({
      success: true,
      message: 'Lesson created successfully',
      data: lesson
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

// @desc    Update lesson
// @route   PUT /api/lessons/:id
// @access  Private (Instructor/Admin)
exports.updateLesson = async (req, res) => {
  try {
    let lesson = await Lesson.findById(req.params.id);
    
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }
    
    const {
      course_id,
      title,
      description,
      content,
      video_url,
      duration_minutes,
      order,
      resources,
      quiz_questions
    } = req.body;
    
    lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      {
        course_id,
        title,
        description,
        content,
        video_url,
        duration_minutes,
        order,
        resources,
        quiz_questions
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Lesson updated successfully',
      data: lesson
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid lesson ID format'
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

// @desc    Delete lesson
// @route   DELETE /api/lessons/:id
// @access  Private (Instructor/Admin)
exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }
    
    await Lesson.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Lesson deleted successfully',
      data: {}
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid lesson ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};