# EdSeats

# What does this program do?

EdSeats is a full-stack web application for finding, reviewing, and arguing about your favorite restaurants. Users can browse a collection of eateries, add new hidden gems, upload food pics that make everyone jealous, and leave brutally honest reviews.

# Features

- **Restaurant Discovery:** Browse and search through restaurants so you can finally answer "where do you want to eat?"
- **Interactive Cluster Maps:** Mapbox integration to see where the good food is, without having to squint.
- **User Reviews & Ratings:** Leave detailed reviews with a 1-5 star rating system.
- **Image Uploads:** Cloudinary-powered so you can upload your food pics and have them not look terrible.
- **User Authentication:** Secure login/registration with Passport.js, because we're not animals.
- **Full CRUD:** Create, read, update, and delete restaurants and reviews (but only your own, you monster).
- **Responsive Design:** Looks good on your phone while you're standing in line for a burrito.

# Tech Stack

- **Node.js** - The JavaScript runtime that powers this whole thing.
- **Express.js** - Web framework that's surprisingly pleasant to use.
- **MongoDB** - NoSQL database for when you don't feel like defining a schema.
- **Mongoose** - Lets you pretend MongoDB has schemas.
- **EJS** - Template engine for putting variables into your HTML.
- **Passport.js** - Authentication middleware that does the heavy lifting.
- **Cloudinary** - For all your cloud-based image management needs.
- **Mapbox** - Puts the "map" in "cluster map."
- **Bootstrap** - So your frontend doesn't look like it's from 1998.

# Architecture

`edseats/` <br><br>
# Main application entry point <br>
app.js <br>
# Request handling and business logic <br>
controllers/ <br>
# Custom middleware functions (e.g., authentication, logging) <br>
middleware/ <br>
# Database schemas and data models (Mongoose) <br>
models/ <br>
# API endpoint and route definitions <br>
routes/ <br>
# Server-side templates (EJS) <br>
views/ <br>
# Static assets (CSS, client-side JS, images) <br>
public/ <br>
# Utility and helper functions <br>
utils/ <br>
# Data validation schemas <br>
validation/ <br>

# Getting Started

# Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or on a server somewhere)
- A Cloudinary account
- A Mapbox API key

# Setup
1. Clone this repository.
2. Install the dependencies with `npm install`.
3. Create a `.env` file in the root and add your secrets:
    ```bash
    DB_URL=mongodb://localhost:27017/edseats
    SECRET=a_super_secret_key_for_sessions
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_KEY=your_cloudinary_key
    CLOUDINARY_SECRET=your_cloudinary_secret
    MAPBOX_TOKEN=your_mapbox_token
    ```
4. Start the server with `node app.js` (or `nodemon` if you're not a barbarian).
5. Open your browser to `http://localhost:3000`.

# Database

The app uses MongoDB with Mongoose. The main collections are:
- **Users:** Stores user accounts and hashed passwords.
- **Restaurants:** Holds restaurant info, locations, and image URLs.
- **Reviews:** Contains user reviews, ratings, and timestamps.

# API Endpoints

# Authentication
- `GET /login` & `POST /login` - The usual login stuff.
- `GET /register` & `POST /register` - For new foodies.
- `GET /logout` - For when you're done.

# Restaurants
- `GET /restaurants` - See all the restaurants.
- `GET /restaurants/new` & `POST /restaurants` - Add a new spot.
- `GET /restaurants/:id` - View a specific restaurant's details.
- `GET /restaurants/:id/edit` & `PUT /restaurants/:id` - Fix a mistake.
- `DELETE /restaurants/:id` - Nuke a restaurant from orbit (if you created it).

# Reviews
- `POST /restaurants/:id/reviews` - Leave your opinion.
- `DELETE /restaurants/:id/reviews/:reviewId` - Take back what you said.

# Key Features Explained

# Interactive Maps
Uses Mapbox to show restaurant locations. Nearby spots are clustered together to keep the map tidy. Click a cluster to zoom in.

# Image Management
Cloudinary handles image uploads, resizing, and optimization. You can upload multiple images for each restaurant.

# Authorization
You can only edit or delete your own content. Don't even try to mess with someone else's reviews.

# Data Validation
All user input is validated with Joi schemas to stop you from breaking things, and sanitized to prevent common web attacks.

# Contributing

Found a bug? Want to add a feature? Feel free to contribute! Just try not to set everything on fire.
