# EdSeats

# What does this program do?

EdSeats is a full-stack web application for restaurant discovery, reviews, and management. Users can explore restaurants, add new ones, upload photos, leave reviews, and discover hidden gems in their area.

# Features

- Restaurant Discovery: Browse and search through a curated collection of restaurants
- Interactive Maps: Mapbox integration with cluster maps for restaurant locations
- User Reviews & Ratings: Leave detailed reviews with star ratings
- Image Management: Cloudinary-powered image uploads with automatic thumbnails
- User Authentication: Secure login/registration system with Passport.js
- CRUD Operations: Create, read, update, and delete restaurants and reviews
- Responsive Design: Bootstrap-powered UI that works on all devices
- Geolocation: Store and display restaurant coordinates for mapping
- Authorization: Users can only edit their own content

# Tech Stack

- Node.js - JavaScript runtime that makes everything possible
- Express.js - Web framework that doesn't make you want to cry
- MongoDB - NoSQL database for flexible data storage
- Mongoose - MongoDB object modeling that actually makes sense
- EJS - Template engine for server-side rendering
- Passport.js - Authentication middleware that handles the hard stuff
- Cloudinary - Cloud image management and optimization
- Mapbox - Maps and geolocation services
- Bootstrap - CSS framework that makes things look good without effort

# Architecture

edseats/
├── app.js                 # Main application entry point
├── controllers/           # Business logic and request handling
├── middleware/            # Authentication, validation, and security
├── models/                # Database schemas and models
├── routes/                # API endpoint definitions
├── views/                 # EJS templates and frontend
├── public/                # Static assets (CSS, JS, images)
├── utils/                 # Helper functions and error handling
├── validation/            # Data validation schemas
└── cloudinary/            # Image upload configuration

# Getting Started

# Prerequisites
- Node.js (version 14 or higher)
- MongoDB database (local or cloud)
- Cloudinary account for image storage
- Mapbox API key for maps

# Setup
1. Clone this repository
2. Install dependencies
3. Set up your environment variables in a `.env` file:
        DB_URL=mongodb://localhost:27017/edseats
        SECRET=secret_key_here
        CLOUDINARY_CLOUD_NAME=cloudinary_name
        CLOUDINARY_KEY=cloudinary_key
        CLOUDINARY_SECRET=cloudinary_secret
        MAPBOX_TOKEN=mapbox_token

4. Start the application
5. Open your browser and navigate to `http://localhost:3000`

## Database

The app uses MongoDB with Mongoose ODM. The main collections are:
- Users: User accounts and authentication data
- Restaurants: Restaurant information, images, and geolocation
- Reviews: User reviews with ratings and timestamps

# API Endpoints

# Authentication
- `GET /login` - Login page
- `POST /login` - User authentication
- `GET /register` - Registration page
- `POST /register` - User registration
- `GET /logout` - User logout

# Restaurants
- `GET /restaurants` - List all restaurants with map
- `GET /restaurants/new` - Create new restaurant form
- `POST /restaurants` - Create new restaurant
- `GET /restaurants/:id` - View restaurant details
- `GET /restaurants/:id/edit` - Edit restaurant form
- `PUT /restaurants/:id` - Update restaurant
- `DELETE /restaurants/:id` - Delete restaurant

# Reviews
- `POST /restaurants/:id/reviews` - Add review to restaurant
- `DELETE /restaurants/:id/reviews/:reviewId` - Delete review

# Key Features Explained

# Interactive Maps
The application uses Mapbox to display restaurant locations on an interactive map. The cluster map automatically groups nearby restaurants and provides popup information when clicked.

# Image Management
Cloudinary handles all image uploads, automatically generating thumbnails and optimizing images for web display. Users can upload multiple images per restaurant.

# User Authorization
The app implements a robust authorization system where users can only edit restaurants and reviews they created. This prevents unauthorized modifications and maintains data integrity.

# Data Validation
All user input is validated using Joi schemas and sanitized to prevent XSS attacks and injection vulnerabilities.

# Middleware Stack

- Authentication: Passport.js with local strategy
- Session Management: Express sessions with MongoDB storage
- Security: Helmet.js for security headers, MongoDB sanitization
- File Uploads: Multer with Cloudinary storage
- Validation: Custom middleware for data validation
- Error Handling: Centralized error handling with custom error classes

# Frontend

The application uses EJS templates with Bootstrap for styling. The interface is responsive and includes:
- Navigation bar with authentication status
- Restaurant cards with images and descriptions
- Interactive maps for location visualization
- Forms for creating and editing content
- Star rating system for reviews

# Contributing

Found a bug? Want to add a feature? Feel free to contribute!