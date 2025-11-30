# Trip Guide - Indian Tourism Platform

A full-stack web application for booking tours with local guides across India.

## Project Structure

```
untitled folder/
├── index.html              # Main landing page
├── login.html             # Authentication page
├── script.js              # Frontend JavaScript
├── styles.css             # Frontend CSS
├── api.js                 # API client for frontend
└── backend/
    ├── server.js          # Express server
    ├── database.js        # SQLite database setup
    ├── package.json       # Backend dependencies
    ├── .env              # Environment variables
    └── routes/
        ├── auth.js        # Authentication routes (register, login, profile)
        └── tours.js       # Tour and booking routes
```

## Features

- **User Authentication**
  - Register new accounts
  - Login with email and password
  - JWT token-based authentication
  - Password hashing with bcryptjs

- **Tour Management**
  - Browse tour guides
  - View guide details
  - Create tour bookings
  - View and cancel bookings

- **Database**
  - SQLite database for data persistence
  - User profiles
  - Booking history
  - Tour guide information

## Setup Instructions

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd "backend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`

4. **Database** - SQLite database will be created automatically on first run at `backend/tripguide.db`

### Frontend Setup

1. The frontend files are already in the root directory
2. Open `index.html` in your browser or serve with a local server
3. The frontend will communicate with the backend API at `http://localhost:5000/api`

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /profile/:id` - Get user profile
- `PUT /profile/:id` - Update user profile

### Tours Routes (`/api/tours`)
- `GET /guides` - Get all tour guides
- `GET /guides/:id` - Get specific guide
- `POST /bookings` - Create a booking (requires token)
- `GET /bookings` - Get user's bookings (requires token)
- `GET /bookings/:id` - Get specific booking (requires token)
- `PUT /bookings/:id` - Update booking status (requires token)
- `DELETE /bookings/:id` - Cancel booking (requires token)

## Technologies Used

- **Frontend**
  - HTML5
  - CSS3
  - Vanilla JavaScript
  - Font Awesome Icons
  - Google Fonts (Poppins, Playfair Display)

- **Backend**
  - Node.js
  - Express.js
  - SQLite3
  - bcryptjs (password hashing)
  - jsonwebtoken (JWT authentication)

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
JWT_SECRET=your_secret_key_change_this_in_production
NODE_ENV=development
```

## User Data Example

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 XXXXX XXXXX",
  "password": "hashedpassword"
}
```

## Running the Full Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. In a new terminal, open the frontend:
   - Option A: Open `index.html` in your browser
   - Option B: Use a local server like Python:
     ```bash
     python3 -m http.server 8000
     ```
     Then visit `http://localhost:8000`

## Features in Detail

### Authentication Flow
1. User registers with name, email, phone, and password
2. Password is hashed using bcryptjs
3. User receives JWT token on login
4. Token is stored in localStorage
5. Token is used for authenticated API requests

### Booking System
1. User must be logged in to make bookings
2. Select tour guide and date/time
3. Booking is stored in database
4. User can view, update, or cancel bookings

### Data Persistence
- All user data is stored in SQLite database
- Bookings are linked to users
- Tour guide information is pre-populated

## Notes

- Change the JWT_SECRET in production
- Implement proper password reset functionality for production
- Add payment integration for actual bookings
- Implement email verification for registration
- Add rate limiting for API endpoints
- Use HTTPS in production

## Future Enhancements

- Payment gateway integration
- Email notifications
- Reviews and ratings system
- Search and filter guides by location/language
- Booking cancellation policies
- Admin dashboard
- Guide management panel
