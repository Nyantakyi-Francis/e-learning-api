# EduAPI - E-Learning Platform API

A comprehensive RESTful API for managing an e-learning platform with users, courses, lessons, enrollments, and reviews.

## Team Members
- Nyantakyi Francis
- Edem Essien Offiong

## Project Description
EduAPI provides backend services for an e-learning platform where students can enroll in courses, instructors can create and manage courses, and administrators can oversee the entire system.

## Features (Week 5)
- ✅ User Management (CRUD operations)
- ✅ Course Management (CRUD operations)
- ✅ MongoDB Integration
- ✅ Comprehensive Error Handling
- ✅ Input Validation
- ✅ Swagger API Documentation
- ✅ Deployed to Render

## Technologies Used
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Documentation:** Swagger/OpenAPI
- **Deployment:** Render

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd e-learning-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your_secret_key
   ```

4. **Run the application**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

5. **Access the API**
   - API Base URL: `http://localhost:3000`
   - API Documentation: `http://localhost:3000/api-docs`

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

## Database Schema

### User Collection
- name (String, required)
- email (String, required, unique)
- role (String: student/instructor/admin)
- enrolled_courses (Array of ObjectIds)
- completed_courses (Array of ObjectIds)
- certifications (Array of Objects)
- profile_picture (String)
- bio (String)
- join_date (Date)
- last_login (Date)

### Course Collection
- title (String, required)
- description (String, required)
- instructor_id (ObjectId, required)
- category (String, required)
- difficulty (String, required)
- duration_hours (Number, required)
- price (Number, required)
- syllabus (Array of Strings)
- requirements (Array of Strings)
- thumbnail_url (String)
- enrollment_count (Number)
- rating (Number)
- status (String: draft/published/archived)

## Error Handling
All routes include comprehensive error handling:
- **400** - Bad Request (validation errors, invalid IDs)
- **404** - Not Found (resource doesn't exist)
- **500** - Internal Server Error

## Testing
Use Swagger UI at `/api-docs` to test all endpoints interactively, or use tools like:
- Postman
- Thunder Client (VS Code extension)
- cURL

## Deployment
This API is deployed on Render at: `https://your-app-name.onrender.com`

Documentation available at: `https://your-app-name.onrender.com/api-docs`

## Week 5 Individual Contributions

### Nyantakyi Francis
1. Set up MongoDB Atlas database and configured connection
2. Implemented User model with validation and all CRUD operations
3. Created comprehensive Swagger documentation for User endpoints

### Edem Essien Offiong
1. Set up project structure and Git repository
2. Implemented Course model with validation and all CRUD operations
3. Deployed application to Render and configured environment variables

## Future Enhancements (Week 6-7)
- OAuth Authentication (Google)
- Lessons Collection
- Enrollments Collection
- Reviews Collection
- Role-based Access Control
- Unit Testing for GET routes

## License
MIT

## Contact
For questions or support, contact the development team.