# TrueGate Backend API Documentation

## Overview

This is a Node.js/Express.js authentication and user management API with the following features:
- User registration and login with JWT authentication
- Email verification system using Brevo (formerly Sendinblue)
- MongoDB database integration
- Security features including CSRF protection, rate limiting, and HTTPS enforcement
- Role-based access control (admin/user roles)

**Base URL:** `http://localhost:4000` (or `https://yourdomain.com` in production)
**API Prefix:** `/api`

## Security Features

### Rate Limiting
- **Window:** 15 minutes
- **Max Requests:** 100 requests per window per IP
- **Applies to:** All endpoints

### CSRF Protection
- Uses Double Submit Cookie Pattern
- CSRF token required for state-changing operations
- Token available at: `GET /api/csrf-token`

### HTTPS Enforcement
- Automatically redirects HTTP to HTTPS (except on localhost)
- Secure cookies with `httpOnly`, `secure`, and `sameSite: 'strict'`

### CORS Configuration
- **Origin:** `http://localhost:5173` (configurable for frontend)
- **Credentials:** Enabled

## Authentication

### JWT Token Details
- **Expiration:** 15 minutes
- **Header Format:** `Authorization: Bearer <token>`
- **Cookie:** `token` (httpOnly, secure, sameSite: strict)

### Token Payload Structure
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "iat": 1234567890,
  "exp": 1234567890
}
```

## API Endpoints

### 1. Get CSRF Token
**GET** `/api/csrf-token`

**Description:** Get CSRF token for form submissions

**Response:**
```json
{
  "csrfToken": "generated-csrf-token"
}
```

**Status Codes:**
- `200 OK` - Token generated successfully

---

### 2. Register User
**POST** `/api/register`

**Description:** Register a new user account

**Headers:**
- `Content-Type: application/json`
- `x-csrf-token: <csrf-token>` (required)

**Body:**
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "birthDate": "1990-01-01",
  "gender": "male",
  "role": "user",
  "contactNumber": "1234567890"
}
```

**Validation Rules:**
- `email`: Valid email format, normalized
- `password`: Strong password (minimum 8 chars, uppercase, lowercase, number, symbol)
- `firstName`: Non-empty string, trimmed and escaped
- `lastName`: Non-empty string, trimmed and escaped
- `birthDate`: Non-empty string, trimmed and escaped
- `gender`: Non-empty string, trimmed and escaped
- `role`: Optional, defaults to "user"
- `contactNumber`: Non-empty string, trimmed and escaped

**Response:**
```json
{
  "message": "User registered successfully. Please check your email to verify your account."
}
```

**Status Codes:**
- `201 Created` - User registered successfully
- `400 Bad Request` - Validation errors or user already exists

**Notes:**
- Sends verification email automatically
- Stores registration IP address
- Generates verification token valid for 24 hours
- Account starts as unverified and unlocked

---

### 3. Login
**POST** `/api/login`

**Description:** Authenticate user and get JWT token

**Headers:**
- `Content-Type: application/json`
- `x-csrf-token: <csrf-token>` (required)

**Body:**
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!"
}
```

**Validation Rules:**
- `email`: Valid email format, normalized
- `password`: Non-empty string, trimmed and escaped

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "birthDate": "1990-01-01",
    "gender": "male",
    "role": "user",
    "contactNumber": "1234567890",
    "lastLogin": "2024-01-01T12:00:00.000Z",
    "verified": true
  }
}
```

**Status Codes:**
- `200 OK` - Login successful
- `400 Bad Request` - Invalid credentials
- `403 Forbidden` - Account locked due to failed attempts

**Security Features:**
- Tracks login attempts (locks after 5 failed attempts)
- Records login IP addresses
- Resets failed attempt counter on successful login
- Sets secure HTTP-only cookie with JWT token

---

### 4. Verify Email
**GET** `/api/verify-email`

**Description:** Verify user email address using token

**Query Parameters:**
- `token`: Verification token from email
- `email`: User's email address

**Response:**
```json
{
  "message": "Email verified successfully. You can now log in."
}
```

**Status Codes:**
- `200 OK` - Email verified successfully
- `400 Bad Request` - Invalid or expired token, or already verified

**Notes:**
- Token expires after 24 hours
- Can only verify unverified accounts
- Clears verification token after successful verification

---

### 5. Resend Verification Email
**POST** `/api/resend-verification`

**Description:** Resend email verification link

**Headers:**
- `Authorization: Bearer <JWT>` (required)
- `Content-Type: application/json`
- `x-csrf-token: <csrf-token>` (required)

**Body:** (optional)
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "If your account exists and is unverified, a verification email will be sent."
}
```

**Status Codes:**
- `200 OK` - Generic response for privacy (always returns same message)
- `401 Unauthorized` - No valid JWT token

**Notes:**
- Always returns generic message for privacy/security
- Generates new verification token valid for 24 hours
- Only works for unverified accounts

---

### 6. Get All Users (Admin Only)
**GET** `/api/users`

**Description:** Retrieve all users (admin access only)

**Headers:**
- `Authorization: Bearer <JWT>` (required)

**Response:**
```json
[
  {
    "_id": "user-id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "birthDate": "1990-01-01",
    "gender": "male",
    "role": "user",
    "contactNumber": "1234567890",
    "loginAttempts": 0,
    "lastLogin": "2024-01-01T12:00:00.000Z",
    "allowedIps": ["192.168.1.1"],
    "verified": true,
    "locked": false
  }
]
```

**Status Codes:**
- `200 OK` - Users retrieved successfully
- `401 Unauthorized` - No valid JWT token
- `403 Forbidden` - User is not admin

**Notes:**
- Excludes sensitive fields: `hashedPassword`, `verificationToken`, `verificationTokenExpires`
- Only accessible by users with `role: "admin"`

---

### 7. Modify User Details
**PUT** `/api/users/:email`

**Description:** Update user's own profile information

**Headers:**
- `Authorization: Bearer <JWT>` (required)
- `Content-Type: application/json`
- `x-csrf-token: <csrf-token>` (required)

**URL Parameters:**
- `email`: User's email address (must match authenticated user)

**Body:** (any subset of fields)
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "birthDate": "1995-05-15",
  "gender": "female",
  "contactNumber": "0987654321"
}
```

**Validation Rules:**
- All fields are optional
- `firstName`: Trimmed and escaped if provided
- `lastName`: Trimmed and escaped if provided
- `birthDate`: Trimmed and escaped if provided
- `gender`: Trimmed and escaped if provided
- `contactNumber`: Trimmed and escaped if provided
- `role`: Ignored (users cannot change their own role)

**Response:**
```json
{
  "message": "User updated"
}
```

**Status Codes:**
- `200 OK` - User updated successfully
- `400 Bad Request` - Validation errors
- `401 Unauthorized` - No valid JWT token
- `403 Forbidden` - Trying to modify different user's account
- `404 Not Found` - User not found
- `500 Internal Server Error` - Database error

**Notes:**
- Users can only modify their own account
- Role field is ignored for security

---

### 8. Change Password
**POST** `/api/users/change-password`

**Description:** Change user's password

**Headers:**
- `Authorization: Bearer <JWT>` (required)
- `Content-Type: application/json`
- `x-csrf-token: <csrf-token>` (required)

**Body:**
```json
{
  "oldPassword": "CurrentPassword123!",
  "newPassword": "NewStrongPassword456!"
}
```

**Validation Rules:**
- `oldPassword`: Non-empty string, trimmed and escaped
- `newPassword`: Strong password (minimum 8 chars, uppercase, lowercase, number, symbol)

**Response:**
```json
{
  "message": "Password changed successfully"
}
```

**Status Codes:**
- `200 OK` - Password changed successfully
- `400 Bad Request` - Validation errors or incorrect old password
- `401 Unauthorized` - No valid JWT token
- `404 Not Found` - User not found

**Notes:**
- Requires current password verification
- New password must meet strong password requirements
- Password is hashed with bcrypt (12 rounds)

---

### 9. Forgot Password
**POST** `/api/forgot-password`

**Description:** Request a password reset email

**Headers:**
- `Content-Type: application/json`
- `x-csrf-token: <csrf-token>` (required)

**Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "If your account exists, a password reset email has been sent."
}
```

**Status Codes:**
- `200 OK` - Always returns this message for privacy

**Notes:**
- Always returns generic message for privacy/security
- Sends a reset link if the email exists
- Token is valid for 1 hour

---

### 10. Reset Password
**POST** `/api/reset-password`

**Description:** Reset password using a token from email

**Headers:**
- `Content-Type: application/json`
- `x-csrf-token: <csrf-token>` (required)

**Body:**
```json
{
  "email": "user@example.com",
  "token": "reset-token-from-email",
  "newPassword": "NewStrongPassword123!"
}
```

**Validation Rules:**
- `email`: Valid email format
- `token`: Non-empty string
- `newPassword`: Strong password (minimum 8 chars, uppercase, lowercase, number, symbol)

**Response:**
```json
{
  "message": "Password has been reset successfully."
}
```

**Status Codes:**
- `200 OK` - Password reset successfully
- `400 Bad Request` - Invalid input or expired/invalid token

**Notes:**
- Token is valid for 1 hour and can only be used once
- Password is hashed with bcrypt (12 rounds)

## Error Responses

All endpoints return consistent error responses:

### Validation Error Format
```json
{
  "error": "Invalid input",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format",
      "value": "invalid-email"
    }
  ]
}
```

### General Error Format
```json
{
  "error": "Error message description"
}
```

### CSRF Error Format
```json
{
  "error": "Invalid CSRF token"
}
```

## User Data Model

### User Object Structure
```json
{
  "_id": "mongodb-object-id",
  "email": "user@example.com",
  "hashedPassword": "bcrypt-hashed-password",
  "firstName": "John",
  "lastName": "Doe",
  "birthDate": "1990-01-01",
  "gender": "male",
  "role": "user",
  "contactNumber": "1234567890",
  "loginAttempts": 0,
  "lastLogin": "2024-01-01T12:00:00.000Z",
  "allowedIps": ["192.168.1.1"],
  "verified": true,
  "locked": false,
  "verificationToken": "hex-token",
  "verificationTokenExpires": 1234567890000
}
```

### Field Descriptions
- `email`: Unique user identifier
- `hashedPassword`: Bcrypt-hashed password (never returned in responses)
- `firstName`, `lastName`: User's name
- `birthDate`: Date of birth (YYYY-MM-DD format)
- `gender`: User's gender
- `role`: User role ("user" or "admin")
- `contactNumber`: Phone number
- `loginAttempts`: Count of failed login attempts (resets on success)
- `lastLogin`: ISO timestamp of last successful login
- `allowedIps`: Array of IP addresses that have successfully logged in
- `verified`: Boolean indicating email verification status
- `locked`: Boolean indicating if account is locked due to failed attempts
- `verificationToken`: Hex token for email verification (never returned in responses)
- `verificationTokenExpires`: Timestamp when verification token expires

## Environment Variables

Required environment variables:

```env
# Server Configuration
PORT=4000
BASE_URL=http://localhost:4000

# Database
MONGODB_URI=mongodb://localhost:27017/your-database
MONGODB_DB=your-database-name

# Security
JWT_SECRET=your-jwt-secret-key
CSRF_SECRET=your-csrf-secret-key

# Email Service (Brevo)
BREVO_API_KEY=your-brevo-api-key
BREVO_USER=your-verified-sender-email
```

## Security Considerations

1. **Password Security:**
   - Passwords are hashed using bcrypt with 12 rounds
   - Strong password validation enforced
   - Old password required for password changes

2. **Account Protection:**
   - Accounts lock after 5 failed login attempts
   - IP tracking for suspicious activity detection
   - Email verification required for full access

3. **Session Security:**
   - JWT tokens expire after 15 minutes
   - Secure HTTP-only cookies
   - CSRF protection on all state-changing operations

4. **Data Protection:**
   - Sensitive fields never returned in responses
   - Input sanitization and validation
   - Rate limiting to prevent abuse

5. **Production Recommendations:**
   - Use HTTPS in production
   - Configure proper CORS origins
   - Set up monitoring for failed login attempts
   - Implement additional rate limiting for sensitive endpoints
   - Regular security audits and updates

## Rate Limiting Details

- **Window:** 15 minutes
- **Limit:** 100 requests per IP address
- **Headers:** Standard rate limit headers included
- **Scope:** Applies to all API endpoints

## CSRF Protection Details

- **Method:** Double Submit Cookie Pattern
- **Token Source:** `x-csrf-token` header, `_csrf` body field, or `_csrf`