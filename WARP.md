# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a MERN Stack School Management System that provides comprehensive management capabilities for educational institutions. The system supports three user roles (Admin, Teacher, Student) with specific functionalities for each role including attendance tracking, performance assessment, and communication features.

## Architecture

### Backend Architecture (Node.js/Express)
- **Entry Point**: `backend/index.js` - Express server setup with CORS and MongoDB connection
- **Routes**: Centralized in `backend/routes/route.js` with REST API endpoints for all entities
- **Controllers**: Organized by domain (`admin-controller.js`, `student_controller.js`, `teacher-controller.js`, etc.)
- **Models**: Mongoose schemas for MongoDB collections (Admin, Student, Teacher, Class, Subject, Notice, Complain)
- **Database**: MongoDB with connection via `MONGO_URL` environment variable
- **Authentication**: Basic user authentication using bcrypt for password hashing

### Frontend Architecture (React)
- **State Management**: Redux Toolkit with feature-based slices
  - User state: Authentication and current user role
  - Domain slices: Student, Teacher, Notice, Class (Sclass), Complain
- **Routing**: React Router with role-based conditional rendering
- **UI Framework**: Material-UI (MUI) with custom styling
- **Data Visualization**: Recharts for performance analytics
- **HTTP Client**: Axios for API communication with configurable base URL

### Key Components
- **Role-based Dashboards**: Separate dashboard components for Admin, Student, and Teacher roles
- **Redux Store Structure**: Feature-based organization with domain-specific reducers
- **API Integration**: Centralized HTTP handling through Redux Thunks in `*Handle.js` files

## Common Development Commands

### Setup and Installation
```bash
# Backend setup
cd backend
npm install
npm start  # Runs with nodemon for development

# Frontend setup (separate terminal)
cd frontend
npm install
npm start  # Runs on localhost:3000
```

### Environment Configuration
- Backend: Create `.env` file in `backend/` with `MONGO_URL=mongodb://127.0.0.1/school`
- Frontend: `.env` file already exists with `REACT_APP_BASE_URL=http://localhost:5000`

### Development Workflow
```bash
# Start backend (runs on port 5000)
cd backend && npm start

# Start frontend (runs on port 3000)  
cd frontend && npm start

# Build frontend for production
cd frontend && npm run build

# Run frontend tests
cd frontend && npm test
```

## Important Development Notes

### Common Issues and Solutions
- **Network/Loading Errors**: If signup fails, uncomment the first line in `frontend/.env` and restart frontend
- **Environment Variable Issues**: If `.env` doesn't work, manually set `REACT_APP_BASE_URL` in Redux handle files
- **Delete Functionality**: Delete operations are disabled by default - check README.md for enabling instructions

### Key File Locations
- **API Configuration**: Environment-based URLs in Redux handle files (`*Handle.js`)
- **Route Definitions**: All backend routes centralized in `backend/routes/route.js`
- **Authentication Logic**: Role-based routing in `frontend/src/App.js`
- **State Management**: Redux store configuration in `frontend/src/redux/store.js`

### Database Schema
- **Entities**: Admin, Student, Teacher, Sclass (Class), Subject, Notice, Complain
- **Relationships**: Classes have subjects and students; Teachers are assigned to subjects
- **Attendance**: Tracked per subject for students

## Technology Stack

### Backend Dependencies
- Express.js for server framework
- Mongoose for MongoDB ODM  
- bcrypt for password hashing
- cors for cross-origin requests
- dotenv for environment configuration
- nodemon for development auto-restart

### Frontend Dependencies
- React 18 with React Router for SPA functionality
- Redux Toolkit for state management
- Material-UI for component library
- Axios for HTTP requests
- Recharts for data visualization
- styled-components for styling

## Deployment
- Backend: Configured for Render deployment
- Frontend: Configured for Netlify deployment with `netlify.toml`
