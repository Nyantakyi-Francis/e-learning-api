// Check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    success: false,
    message: 'Please authenticate to access this resource. Visit /auth/google to login.'
  });
};

// Check if user is instructor or admin
exports.isInstructorOrAdmin = (req, res, next) => {
  if (req.isAuthenticated() && (req.user.role === 'instructor' || req.user.role === 'admin')) {
    return next();
  }
  
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: 'Please authenticate to access this resource. Visit /auth/google to login.'
    });
  }
  
  res.status(403).json({
    success: false,
    message: 'Access denied. Instructor or admin role required.'
  });
};

// Check if user is admin only
exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: 'Please authenticate to access this resource. Visit /auth/google to login.'
    });
  }
  
  res.status(403).json({
    success: false,
    message: 'Access denied. Admin role required.'
  });
};