const express = require('express');
const router = express.Router();
const {
  getAllEnrollments,
  getEnrollmentById,
  getEnrollmentsByUser,
  getEnrollmentsByCourse,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment
} = require('../controllers/enrollmentController');
const { validateEnrollment, handleValidationErrors } = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       required:
 *         - user_id
 *         - course_id
 *       properties:
 *         _id:
 *           type: string
 *         user_id:
 *           type: string
 *         course_id:
 *           type: string
 *         enrollment_date:
 *           type: string
 *           format: date-time
 *         progress_percentage:
 *           type: number
 *         completed_lessons:
 *           type: array
 *           items:
 *             type: string
 *         last_accessed:
 *           type: string
 *           format: date-time
 *         completion_date:
 *           type: string
 *           format: date-time
 *         grade:
 *           type: number
 *         certificate_issued:
 *           type: boolean
 *         payment_status:
 *           type: string
 *           enum: [pending, completed, refunded]
 *         notes:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Enrollments
 *   description: Enrollment management endpoints
 */

/**
 * @swagger
 * /api/enrollments:
 *   get:
 *     summary: Get all enrollments
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: List of all enrollments
 *       500:
 *         description: Server error
 */
router.get('/', getAllEnrollments);

/**
 * @swagger
 * /api/enrollments/{id}:
 *   get:
 *     summary: Get enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment details
 *       404:
 *         description: Enrollment not found
 */
router.get('/:id', getEnrollmentById);

/**
 * @swagger
 * /api/enrollments/user/{userId}:
 *   get:
 *     summary: Get enrollments by user ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user's enrollments
 */
router.get('/user/:userId', getEnrollmentsByUser);

/**
 * @swagger
 * /api/enrollments/course/{courseId}:
 *   get:
 *     summary: Get enrollments by course ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of course enrollments
 */
router.get('/course/:courseId', getEnrollmentsByCourse);

/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     summary: Create a new enrollment (Protected - Requires Authentication)
 *     tags: [Enrollments]
 *     security:
 *       - oauth2: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - course_id
 *             properties:
 *               user_id:
 *                 type: string
 *               course_id:
 *                 type: string
 *               progress_percentage:
 *                 type: number
 *               payment_status:
 *                 type: string
 *                 enum: [pending, completed, refunded]
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Enrollment created
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Validation error or duplicate enrollment
 */
router.post('/', isAuthenticated, validateEnrollment, handleValidationErrors, createEnrollment);

/**
 * @swagger
 * /api/enrollments/{id}:
 *   put:
 *     summary: Update an enrollment (Protected - Requires Authentication)
 *     tags: [Enrollments]
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
 *             properties:
 *               progress_percentage:
 *                 type: number
 *               completed_lessons:
 *                 type: array
 *                 items:
 *                   type: string
 *               grade:
 *                 type: number
 *               payment_status:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Enrollment updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Enrollment not found
 */
router.put('/:id', isAuthenticated, validateEnrollment, handleValidationErrors, updateEnrollment);

/**
 * @swagger
 * /api/enrollments/{id}:
 *   delete:
 *     summary: Delete an enrollment
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment deleted
 *       404:
 *         description: Enrollment not found
 */
router.delete('/:id', deleteEnrollment);

module.exports = router;