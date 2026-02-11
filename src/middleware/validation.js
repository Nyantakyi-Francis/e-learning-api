const { body, validationResult } = require('express-validator');

// Handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// User validation rules
exports.validateUser = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address')
    .normalizeEmail(),
  body('role')
    .optional()
    .isIn(['student', 'instructor', 'admin'])
    .withMessage('Role must be student, instructor, or admin'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters'),
  body('profile_picture')
    .optional()
    .isURL().withMessage('Profile picture must be a valid URL')
];

// Course validation rules
exports.validateCourse = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('instructor_id')
    .notEmpty().withMessage('Instructor ID is required')
    .isMongoId().withMessage('Must be a valid instructor ID'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['programming', 'design', 'business', 'marketing', 'photography', 'music', 'other'])
    .withMessage('Invalid category'),
  body('difficulty')
    .notEmpty().withMessage('Difficulty is required')
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Difficulty must be beginner, intermediate, or advanced'),
  body('duration_hours')
    .notEmpty().withMessage('Duration is required')
    .isFloat({ min: 0 }).withMessage('Duration must be a positive number'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Status must be draft, published, or archived')
];

// Lesson validation rules
exports.validateLesson = [
  body('course_id')
    .notEmpty().withMessage('Course ID is required')
    .isMongoId().withMessage('Must be a valid course ID'),
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required'),
  body('duration_minutes')
    .notEmpty().withMessage('Duration is required')
    .isInt({ min: 1 }).withMessage('Duration must be at least 1 minute'),
  body('order')
    .notEmpty().withMessage('Order is required')
    .isInt({ min: 1 }).withMessage('Order must be at least 1'),
  body('video_url')
    .optional()
    .isURL().withMessage('Must be a valid URL')
];

// Enrollment validation rules
exports.validateEnrollment = [
  body('user_id')
    .notEmpty().withMessage('User ID is required')
    .isMongoId().withMessage('Must be a valid user ID'),
  body('course_id')
    .notEmpty().withMessage('Course ID is required')
    .isMongoId().withMessage('Must be a valid course ID'),
  body('progress_percentage')
    .optional()
    .isFloat({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100'),
  body('grade')
    .optional()
    .isFloat({ min: 0, max: 100 }).withMessage('Grade must be between 0 and 100'),
  body('payment_status')
    .optional()
    .isIn(['pending', 'completed', 'refunded'])
    .withMessage('Payment status must be pending, completed, or refunded'),
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters')
];