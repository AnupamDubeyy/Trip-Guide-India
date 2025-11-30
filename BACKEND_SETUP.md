# Backend Setup Complete ✅

## What's Been Added

### Backend Architecture
- **Express.js Server** - Running on port 5000
- **SQLite Database** - Local database for data persistence
- **JWT Authentication** - Secure token-based authentication
- **RESTful API** - Complete REST API for all operations

### Files Created

#### Backend Directory (`/backend`)
```
backend/
├── server.js           # Main Express server
├── database.js         # SQLite database initialization
├── package.json        # Dependencies
├── .env               # Environment variables
├── start.sh           # Quick start script
└── routes/
    ├── auth.js        # Authentication endpoints
    └── tours.js       # Tour & booking endpoints
```

#### Frontend Updates
```
api.js                 # API client for frontend calls
```

### Key Features Implemented

#### 1. Authentication System
- User Registration (POST /api/auth/register)
- User Login (POST /api/auth/login)
- JWT Token Generation
- Password Hashing (bcryptjs)
- User Profile Management

#### 2. Tour Management
- Browse all tour guides (GET /api/tours/guides)
- Create bookings (POST /api/tours/bookings)
- View user bookings (GET /api/tours/bookings)
- Cancel bookings (DELETE /api/tours/bookings/:id)

#### 3. Database Schema
- **users** table - Store user accounts
- **bookings** table - Store tour bookings
- **tour_guides** table - Pre-populated with 8 Indian guides

### How to Run

#### Start Backend Server
```bash
cd backend
npm start
```

The server will start on `http://localhost:5000`

#### Access Frontend
1. Open `index.html` in your browser
   - OR -
2. Use Python server:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`

### API Endpoints

#### Authentication (/api/auth)
- `POST /register` - Create new account
- `POST /login` - Login user
- `GET /profile/:id` - Get user profile
- `PUT /profile/:id` - Update profile

#### Tours (/api/tours)
- `GET /guides` - All tour guides
- `POST /bookings` - Create booking
- `GET /bookings` - My bookings
- `DELETE /bookings/:id` - Cancel booking

### Data Flow

```
User fills form (login.html)
    ↓
Frontend calls API (/api/auth/register or /api/auth/login)
    ↓
Backend processes & stores in SQLite database
    ↓
JWT token generated & sent back
    ↓
Token stored in localStorage
    ↓
User name displayed in navigation bar
```

### Authentication Flow

```
1. User signs up → Password hashed → Stored in database
2. User logs in → Password compared with hash
3. JWT token generated with user ID
4. Token sent to frontend → Stored in localStorage
5. Future requests include token in Authorization header
6. Backend verifies token for protected endpoints
```

### Booking Flow

```
1. User selects guide (must be logged in)
2. Enters booking details (date, time, people)
3. Frontend sends booking request with JWT token
4. Backend verifies token & user
5. Booking saved to database
6. User can view/cancel bookings
```

### Environment Variables (.env)
```
PORT=5000
JWT_SECRET=your_secret_key_change_this_in_production
NODE_ENV=development
```

### Dependencies Installed

- **express** - Web server framework
- **cors** - Handle cross-origin requests
- **sqlite3** - Database
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables

### Testing the Setup

1. **Register User**
   - Go to login.html
   - Click "Create Account"
   - Fill in details and register

2. **Login User**
   - Use registered email/password
   - Should see name in navigation bar

3. **Browse Guides**
   - 8 tour guides loaded from database
   - Can view details and prices

4. **Make Booking**
   - Login first (required)
   - Select guide and details
   - Booking saved to database

### Security Features

✅ Password hashing with bcryptjs
✅ JWT token authentication
✅ CORS enabled for frontend communication
✅ Protected endpoints (bookings require token)
✅ Unique email constraint
✅ Environment variable management

### Future Enhancements

- Payment gateway integration
- Email verification
- Forgot password functionality
- Review and rating system
- Admin dashboard
- Google/Facebook OAuth
- Two-factor authentication

### Troubleshooting

**Port 5000 already in use?**
```bash
# Change PORT in .env file
PORT=3000
```

**Database issues?**
```bash
# Delete old database
rm backend/tripguide.db

# Restart server (will recreate automatically)
npm start
```

**CORS errors?**
- Ensure backend is running on localhost:5000
- Check API_URL in frontend matches backend URL

**Token issues?**
- Check .env JWT_SECRET is set
- Clear localStorage and re-login
- Check browser console for errors

---

**Status: ✅ Backend fully configured and ready to use!**
