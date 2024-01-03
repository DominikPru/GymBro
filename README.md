# Gym Bro

Gym Bro is a full-stack application for tracking fitness exercises. It consists of a backend API built with Node.js and Express.js, and a frontend built with React.

## Project Structure

The project is divided into two main directories:

- `gym_bro_be/`: This directory contains the backend code for the application.
- `gym_bro_fe/`: This directory contains the frontend code for the application.

### Backend (`gym_bro_be/`)

The backend is a Node.js application that uses Express.js for the server and MongoDB for the database. It provides an API for user registration, login, and exercise tracking.

#### Main Files

- `app.js`: This is the main server file. It sets up the Express.js server, connects to the MongoDB database, and defines the API endpoints.
- `package.json`: This file lists the project dependencies and scripts.

#### Setup

1. Navigate to the `gym_bro_be/` directory.
2. Install dependencies with `npm install`.
3. Start the server with `node app.js`.

### Frontend (`gym_bro_fe/`)

The frontend is a React application that provides a user interface for the fitness tracker.

#### Main Files

- `src/components/`: This directory contains the React components for the application.
- `src/index.tsx`: This is the entry point for the React application.
- `package.json`: This file lists the project dependencies and scripts.

#### Setup

1. Navigate to the `gym_bro_fe/` directory.
2. Install dependencies with `npm install`.
3. Start the React development server with `npm start`.
4. Navigate to the `gym_bro_be/` directory.
5. Install dependencies as in step 2.
6. Add your MongoDB connection string to the `uri` variable in app.js
7. Start the node.js development server as in step 3.

Want to see the app in action?
Visit https://exercisedemo.onrender.com/
