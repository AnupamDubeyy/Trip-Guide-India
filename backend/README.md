# Trip Guide Backend API

A complete Node.js backend for the Trip Guide travel website using Express and MongoDB.

## 📁 Project Structure

```
backend/
├── models/
│   ├── User.js          # User model with authentication
│   ├── Guide.js         # Tour guide model
│   ├── Tour.js          # Tour/package model
│   └── Booking.js       # Booking model
├── routes/
│   ├── auth.js          # Authentication routes
│   └── tours.js         # Tours, guides, and bookings routes
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── package.json         # Dependencies and scripts
├── seed.js              # Database seeder
└── server.js            # Main server file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Edit `.env` file and update:
   ```env
   MONGODB_URI=mongodb://localhost:27017/tripguide
   JWT_SECRET=your_secure_secret_key
   PORT=5000
   ```

4. **Start MongoDB** (if using local installation):
   ```bash
   mongod
   ```

5. **Seed the database** (optional, adds sample data):
   ```bash
   npm run seed
   ```

6. **Start the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

The API will be running at `http://localhost:5000`

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/auth/profile/:userId` | Get user profile | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |
| PUT | `/api/auth/change-password` | Change password | Yes |

### Tours

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tours` | Get all tours | No |
| GET | `/api/tours/:tourId` | Get tour by ID | No |
| GET | `/api/tours/destinations/popular` | Get popular destinations | No |

### Guides

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tours/guides` | Get all guides | No |
| GET | `/api/tours/guides/:guideId` | Get guide by ID | No |

### Bookings

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/tours/bookings` | Create booking | Yes |
| GET | `/api/tours/bookings` | Get user bookings | Yes |
| GET | `/api/tours/bookings/:bookingId` | Get booking by ID | Yes |
| DELETE | `/api/tours/bookings/:bookingId` | Cancel booking | Yes |

## 📝 Request Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "country": "India",
  "password": "password123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Booking
```bash
POST /api/tours/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "bookingType": "tour",
  "tourId": "tour_id_here",
  "destination": "Jaipur",
  "startDate": "2024-01-15",
  "endDate": "2024-01-20",
  "numberOfTravelers": {
    "adults": 2,
    "children": 1
  },
  "totalPrice": 45000
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## 📊 Sample Data

After running `npm run seed`, you'll have:

- **Admin User:** `admin@tripguide.com` / `admin123`
- **5 Tour Guides** (Rajasthan, Varanasi, Kerala, Agra, Ladakh)
- **6 Tour Packages** (Golden Triangle, Kerala, Varanasi, Ladakh, Rajasthan, Goa)

## 🛠️ Development

```bash
# Run in development mode with nodemon
npm run dev

# Run tests (if configured)
npm test
```

## 📄 License

ISC
