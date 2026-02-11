const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Only configure Google OAuth if credentials are available
// This allows tests to run without OAuth credentials
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists
          let user = await User.findOne({ email: profile.emails[0].value });
          
          if (user) {
            // Update last login
            user.last_login = Date.now();
            await user.save();
            return done(null, user);
          }
          
          // Create new user if doesn't exist
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            profile_picture: profile.photos[0]?.value || 'https://via.placeholder.com/150',
            role: 'student', // Default role
            bio: 'New user registered via Google OAuth'
          });
          
          done(null, user);
        } catch (error) {
          console.error('OAuth Error:', error);
          done(error, null);
        }
      }
    )
  );
} else {
  console.log('Google OAuth credentials not found. OAuth features will be disabled.');
}

module.exports = passport;