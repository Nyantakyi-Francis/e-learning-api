const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');
const { validateCourse, handleValidationErrors } = require('../middleware/validation');
const { isInstructorOrAdmin } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - instructor_id
 *         - category
 *         - difficulty
 *         - duration_hours
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated course ID
 *         title:
 *           type: string
 *           description: Course title
 *         description:
 *           type: string
 *           description: Course description
 *         instructor_id:
 *           type: string
 *           description: ID of the instructor
 *         category:
 *           type: string
 *           enum: [programming, design, business, marketing, photography, music, other]
 *           description: Course category
 *         difficulty:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *           description: Course difficulty level
 *         duration_hours:
 *           type: number
 *           description: Course duration in hours
 *         price:
 *           type: number
 *           description: Course price
 *         syllabus:
 *           type: array
 *           items:
 *             type: string
 *           description: Course syllabus topics
 *         requirements:
 *           type: array
 *           items:
 *             type: string
 *           description: Course prerequisites
 *         thumbnail_url:
 *           type: string
 *           description: URL to course thumbnail
 *         enrollment_count:
 *           type: number
 *           description: Number of enrolled students
 *         rating:
 *           type: number
 *           description: Course average rating (0-5)
 *         status:
 *           type: string
 *           enum: [draft, published, archived]
 *           description: Course status
 */

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management endpoints
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *       500:
 *         description: Server error
 */
router.get('/', getAllCourses);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       400:
 *         description: Invalid ID format
 *       500:
 *         description: Server error
 */
router.get('/:id', getCourseById);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course (Protected - Instructor/Admin with Validation)
 *     tags: [Courses]
 *     security:
 *       - oauth2: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - instructor_id
 *               - category
 *               - difficulty
 *               - duration_hours
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 2000
 *               instructor_id:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [programming, design, business, marketing, photography, music, other]
 *               difficulty:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *               duration_hours:
 *                 type: number
 *                 minimum: 0
 *               price:
 *                 type: number
 *                 minimum: 0
 *               syllabus:
 *                 type: array
 *                 items:
 *                   type: string
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *               thumbnail_url:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [draft, published, archived]
 *     responses:
 *       201:
 *         description: Course created successfully
 *       401:
 *         description: Unauthorized - Login required
 *       403:
 *         description: Forbidden - Instructor or Admin role required
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/', isInstructorOrAdmin, validateCourse, handleValidationErrors, createCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course (Protected - Instructor/Admin with Validation)
 *     tags: [Courses]
 *     security:
 *       - oauth2: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               instructor_id:
 *                 type: string
 *               category:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               duration_hours:
 *                 type: number
 *               price:
 *                 type: number
 *               syllabus:
 *                 type: array
 *                 items:
 *                   type: string
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *               thumbnail_url:
 *                 type: string
 *               status:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       401:
 *         description: Unauthorized - Login required
 *       403:
 *         description: Forbidden - Instructor or Admin role required
 *       404:
 *         description: Course not found
 *       400:
 *         description: Validation error or invalid ID
 *       500:
 *         description: Server error
 */
router.put('/:id', isInstructorOrAdmin, validateCourse, handleValidationErrors, updateCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       400:
 *         description: Invalid ID format
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteCourse);

module.exports = router;