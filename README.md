# MERN Authentication System

A full-stack authentication system built with MongoDB, Express.js, React, and Node.js featuring JWT authentication, protected routes, and user management.

## Features

- User registration and login
- JWT-based authentication
- Password encryption with bcrypt
- Protected routes and API endpoints
- Email verification
- Password reset functionality
- User profile management
- Responsive UI design
- Token refresh mechanism
- Session management

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **nodemailer** - Email service
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Context API / Redux** - State management
- **Tailwind CSS / Material-UI** - Styling
- **Formik / React Hook Form** - Form handling
- **Yup** - Form validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### Clone the Repository
```
git clone https://github.com/yourusername/mern-auth.git
cd mern-auth
```

### Backend Setup

1. Navigate to the backend directory:
```
cd backend
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the backend directory:
```
NODE_ENV=development
PORT=5000

MONGO_URI=mongodb://localhost:27017/mern-auth
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mern-auth

JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRE=30d

EMAIL_SERVICE=gmail
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourapp.com

CLIENT_URL=http://localhost:3000
```

4. Start the backend server:
```
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```
cd ../frontend
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```
npm start
```

The frontend will run on `http://localhost:3000`

## Project Structure
```
mern-auth/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   ├── sendEmail.js
│   │   ├── generateToken.js
│   │   └── validators.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   ├── Login.jsx
    │   │   │   ├── Register.jsx
    │   │   │   ├── ForgotPassword.jsx
    │   │   │   └── ResetPassword.jsx
    │   │   ├── layout/
    │   │   │   ├── Header.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   └── Navbar.jsx
    │   │   └── common/
    │   │       ├── PrivateRoute.jsx
    │   │       ├── Spinner.jsx
    │   │       └── Alert.jsx
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Profile.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── utils/
    │   │   ├── setAuthToken.js
    │   │   └── constants.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .env
    ├── package.json
    └── tailwind.config.js
```

## API Endpoints

### Authentication Routes

**POST** `/api/auth/register`
- Register a new user
- Body: `{ name, email, password }`
- Returns: User object and JWT token

**POST** `/api/auth/login`
- Login existing user
- Body: `{ email, password }`
- Returns: User object and JWT token

**POST** `/api/auth/logout`
- Logout user
- Headers: `Authorization: Bearer <token>`
- Returns: Success message

**GET** `/api/auth/me`
- Get current user profile
- Headers: `Authorization: Bearer <token>`
- Returns: User object

**POST** `/api/auth/refresh-token`
- Refresh access token
- Body: `{ refreshToken }`
- Returns: New access token

**POST** `/api/auth/forgot-password`
- Send password reset email
- Body: `{ email }`
- Returns: Success message

**PUT** `/api/auth/reset-password/:resetToken`
- Reset user password
- Body: `{ password }`
- Returns: Success message

**PUT** `/api/auth/verify-email/:verificationToken`
- Verify user email
- Returns: Success message

### User Routes

**GET** `/api/users/profile`
- Get user profile
- Headers: `Authorization: Bearer <token>`
- Returns: User profile

**PUT** `/api/users/profile`
- Update user profile
- Headers: `Authorization: Bearer <token>`
- Body: `{ name, email }`
- Returns: Updated user object

**PUT** `/api/users/password`
- Change password
- Headers: `Authorization: Bearer <token>`
- Body: `{ currentPassword, newPassword }`
- Returns: Success message

**DELETE** `/api/users/profile`
- Delete user account
- Headers: `Authorization: Bearer <token>`
- Returns: Success message

## Environment Variables

### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 5000 |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017/mern-auth |
| `JWT_SECRET` | JWT signing secret | your-secret-key |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `JWT_REFRESH_SECRET` | Refresh token secret | your-refresh-secret |
| `JWT_REFRESH_EXPIRE` | Refresh token expiration | 30d |
| `EMAIL_SERVICE` | Email service provider | gmail |
| `EMAIL_USERNAME` | Email username | your-email@gmail.com |
| `EMAIL_PASSWORD` | Email password/app password | your-password |
| `EMAIL_FROM` | From email address | noreply@yourapp.com |
| `CLIENT_URL` | Frontend URL | http://localhost:3000 |

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | http://localhost:5000/api |

## Authentication Flow

1. **Registration**
   - User submits registration form
   - Backend validates input and checks for existing user
   - Password is hashed using bcrypt
   - User is saved to database
   - Verification email is sent
   - JWT token is generated and returned

2. **Login**
   - User submits login credentials
   - Backend validates credentials
   - Password is compared with hashed password
   - JWT token is generated and returned
   - Token is stored in localStorage/cookies

3. **Protected Routes**
   - User accesses protected route
   - Frontend sends JWT token in Authorization header
   - Backend middleware verifies token
   - If valid, request proceeds; otherwise, 401 error

4. **Token Refresh**
   - Access token expires after set time
   - Frontend automatically requests new token using refresh token
   - New access token is returned and stored

## Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens for stateless authentication
- HTTP-only cookies option for token storage
- Input validation and sanitization
- MongoDB injection prevention
- Rate limiting on authentication endpoints
- CORS configuration
- Helmet.js for security headers
- Email verification for new accounts
- Secure password reset flow

## Testing

### Backend Tests
```
cd backend
npm test
```

### Frontend Tests
```
cd frontend
npm test
```

## Running in Production

### Backend
```
cd backend
npm run build
npm start
```

### Frontend
```
cd frontend
npm run build
# Serve the build folder with a static server
```

## Deployment

### Backend Deployment (Heroku)
```
heroku create your-app-backend
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
# Set other environment variables
git subtree push --prefix backend heroku main
```

### Frontend Deployment (Vercel/Netlify)
```
cd frontend
npm run build
# Deploy build folder to Vercel or Netlify
# Set REACT_APP_API_URL to your backend URL
```

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses
5. Get connection string and add to `.env`

## Common Issues & Solutions

### MongoDB Connection Error
- Check if MongoDB is running locally: `sudo systemctl status mongod`
- Verify MONGO_URI in `.env` file
- Check network access in MongoDB Atlas

### CORS Errors
- Verify CLIENT_URL in backend `.env`
- Check CORS configuration in server.js
- Ensure credentials are included in frontend requests

### JWT Token Errors
- Check if token is being sent in Authorization header
- Verify JWT_SECRET matches between requests
- Check token expiration time

## Scripts

### Backend
```
npm run dev          # Run development server with nodemon
npm start            # Run production server
npm test             # Run tests
```

### Frontend
```
npm start            # Start development server
npm run build        # Create production build
npm test             # Run tests
npm run eject        # Eject from Create React App
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- MongoDB documentation
- Express.js documentation
- React documentation
- Node.js documentation
- JWT documentation

## Support

For issues and questions:
- Open an issue on GitHub
- Email: support@yourapp.com

## Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

Made with ❤️ using the MERN Stack
