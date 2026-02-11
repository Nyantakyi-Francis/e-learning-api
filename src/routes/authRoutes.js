const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: OAuth authentication endpoints
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Start Google OAuth login
 *     tags: [Authentication]
 *     description: Redirects to Google OAuth consent screen
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth
 */
// @desc    Start Google OAuth
// @route   GET /auth/google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Authentication]
 *     description: Handles Google OAuth callback
 *     responses:
 *       302:
 *         description: Redirect after authentication
 */
// @desc    Google OAuth callback
// @route   GET /auth/google/callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/auth/success');
  }
);

/**
 * @swagger
 * /auth/success:
 *   get:
 *     summary: Authentication success page
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 */
// @desc    Auth success page
// @route   GET /auth/success
router.get('/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      success: true,
      message: 'Authentication successful',
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    });
  } else {
    res.redirect('/auth/failure');
  }
});

/**
 * @swagger
 * /auth/failure:
 *   get:
 *     summary: Authentication failure page
 *     tags: [Authentication]
 *     responses:
 *       401:
 *         description: Authentication failed
 */
// @desc    Auth failure page
// @route   GET /auth/failure
router.get('/failure', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Authentication failed. Please try again.'
  });
});

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
// @desc    Logout
// @route   GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Logout failed' 
      });
    }
    req.session.destroy();
    res.json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
  });
});

/**
 * @swagger
 * /auth/status:
 *   get:
 *     summary: Check authentication status
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Authentication status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authenticated:
 *                   type: boolean
 *                 user:
 *                   type: object
 */
// @desc    Check auth status
// @route   GET /auth/status
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    });
  } else {
    res.json({ 
      authenticated: false,
      message: 'Not authenticated. Visit /auth/google to login.'
    });
  }
});

module.exports = router;