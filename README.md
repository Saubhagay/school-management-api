# School Management API

A beginner-friendly Node.js application built with Express.js and MySQL to manage school data. 

## Features
- **Add School (POST `/addSchool`)**: Validates input data (name, address, latitude, longitude) and adds a new school to the database.
- **List Schools (GET `/listSchools`)**: Fetches all schools from the database, sorts them by proximity to a given user location (latitude, longitude), and returns the sorted list.

## Technologies Used
- **Node.js**: Server environment.
- **Express.js**: Web framework for building the APIs.
- **MySQL2**: Database driver for MySQL.
- **Geolib**: Library used to calculate the distance between coordinates.
- **Dotenv**: Environment variable management.

## Setup Instructions

1. **Clone the repository**: Download or clone the folder containing this code.
2. **Install Dependencies**:
   Open a terminal in the project directory and run:
   ```bash
   npm install
   ```
3. **Database Configuration**:
   - Ensure you have MySQL installed and running locally.
   - You can create a database in MySQL (e.g., `school_management`).
   - Create a `.env` file in the root directory (you can copy from `.env.example`) and fill in your database credentials:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_mysql_password
     DB_NAME=school_management
     PORT=8000
     ```
4. **Start the Server**:
   ```bash
   node server.js
   ```
   > **Note:** The server will automatically create the `schools` table in your MySQL database during the first startup!

## API Endpoints

### 1. Add School
- **URL**: `/addSchool`
- **Method**: `POST`
- **Payload (JSON)**:
  ```json
  {
      "name": "Green Valley High School",
      "address": "123 Education Lane, City Center",
      "latitude": 28.6139,
      "longitude": 77.2090
  }
  ```
- **Success Response**:
  ```json
  {
      "success": true,
      "message": "School added successfully.",
      "data": { ... }
  }
  ```

### 2. List Schools
- **URL**: `/listSchools?latitude=28.5355&longitude=77.3910`
- **Method**: `GET`
- **Query Parameters**:
  - `latitude`: User's latitude.
  - `longitude`: User's longitude.
- **Success Response**: Returns a list of schools sorted by distance (closest first).

## Postman Collection
A Postman collection is included in the project root: `School_Management_API.postman_collection.json`. You can import this file directly into your Postman application to test the APIs.

## Deployment Notes (Deliverables 1 & 2)
- **Deliverable 1 (Source code repository)**: Commit this entire folder to an empty GitHub repository and share the link.
- **Deliverable 2 (Live API endpoints)**: You can easily host this code on services like **Render**, **Railway**, or **Heroku**. Free tier MySQL databases are available on **Aiven** or **Clever Cloud**. Put your remote MySQL connection details into the deployment environment variables (`.env`).
