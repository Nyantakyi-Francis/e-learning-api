const express = require('express');
const router = express.Router();
const {
  getAllLessons,
  getLessonById,
  getLessonsByCourse,
  createLesson,
  updateLesson,
  deleteLesson
} = require('../controllers/lessonController');
const { validateLesson, handleValidationErrors } = require('../middleware/validation');
const { isInstructorOrAdmin } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Lesson:
 *       type: object
 *       required:
 *         - course_id
 *         - title
 *         - description
 *         - content
 *         - duration_minutes
 *         - order
 *       properties:
 *         _id:
 *           type: string
 *         course_id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         content:
 *           type: string
 *         video_url:
 *           type: string
 *         duration_minutes:
 *           type: number
 *         order:
 *           type: number
 *         resources:
 *           type: array
 *           items:
 *             type: object
 *         quiz_questions:
 *           type: array
 *           items:
 *             type: object
 */

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Lesson management endpoints
 */

/**
 * @swagger
 * /api/lessons:
 *   get:
 *     summary: Get all lessons
 *     tags: [Lessons]
 *     responses:
 *       200:
 *         description: List of all lessons
 *       500:
 *         description: Server error
 */
router.get('/', getAllLessons);

/**
 * @swagger
 * /api/lessons/{id}:
 *   get:
 *     summary: Get lesson by ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson details
 *       404:
 *         description: Lesson not found
 */
router.get('/:id', getLessonById);

/**
 * @swagger
 * /api/lessons/course/{courseId}:
 *   get:
 *     summary: Get lessons by course ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of lessons for the course
 */
router.get('/course/:courseId', getLessonsByCourse);

/**
 * @swagger
 * /api/lessons:
 *   post:
 *     summary: Create a new lesson (Protected - Instructor/Admin)
 *     tags: [Lessons]
 *     security:
 *       - oauth2: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - course_id
 *               - title
 *               - description
 *               - content
 *               - duration_minutes
 *               - order
 *             properties:
 *               course_id:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *               video_url:
 *                 type: string
 *               duration_minutes:
 *                 type: number
 *               order:
 *                 type: number
 *     responses:
 *       201:
 *         description: Lesson created
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Validation error
 */
router.post('/', isInstructorOrAdmin, validateLesson, handleValidationErrors, createLesson);

/**
 * @swagger
 * /api/lessons/{id}:
 *   put:
 *     summary: Update a lesson (Protected - Instructor/Admin)
 *     tags: [Lessons]
 *     security:
 *       - oauth2: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Lesson updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Lesson not found
 */
router.put('/:id', isInstructorOrAdmin, validateLesson, handleValidationErrors, updateLesson);

/**
 * @swagger
 * /api/lessons/{id}:
 *   delete:
 *     summary: Delete a lesson (Protected - Instructor/Admin)
 *     tags: [Lessons]
 *     security:
 *       - oauth2: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Lesson not found
 */
router.delete('/:id', isInstructorOrAdmin, deleteLesson);

module.exports = router;