# API Documentation

## Authentication & User Management

### Register a New User
**POST** `/api/register`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "birthDate": "YYYY-MM-DD",
  "gender": "male|female|other",
  "role": "user", // optional, defaults to "user"
  "contactNumber": "1234567890"
}
```
**Response:**  
- `201 Created` on success  
- `400 Bad Request` on validation errors

---

### Login
**POST** `/api/login`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!"
}
```
**Response:**  
- `200 OK` with `{ message, token }`  
- Sets `token` cookie (httpOnly, secure, sameSite=strict)  
- `400 Bad Request` or `403 Forbidden` on error

---

### Get All Users (Admin Only)
**GET** `/api/users`

**Headers:**  
- `Authorization: Bearer <JWT>`

**Response:**  
- `200 OK` with array of user objects (no `hashedPassword`)
- `401 Unauthorized` or `403 Forbidden` if not admin

---

### Modify Own User Details
**PUT** `/api/users/:email`

**Headers:**  
- `Authorization: Bearer <JWT>`

**Body:** (any subset)
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "birthDate": "YYYY-MM-DD",
  "gender": "female",
  "role": "user", // ignored unless self
  "contactNumber": "0987654321"
}
```
**Response:**  
- `200 OK` on success  
- `401 Unauthorized`, `403 Forbidden`, or `404 Not Found` on error

---

### Change Password (Authenticated User Only)
**POST** `/api/users/change-password`

**Headers:**  
- `Authorization: Bearer <JWT>`

**Body:**
```json
{
  "oldPassword": "CurrentPassword123!",
  "newPassword": "NewStrongPassword456!"
}
```
**Response:**  
- `200 OK` on success  
- `400 Bad Request`, `401 Unauthorized`, or `404 Not Found` on error

---

### Resend Verification Email (Authenticated User Only)
**POST** `/api/resend-verification`

**Headers:**  
- `Authorization: Bearer <JWT>`

**Response:**  
- `200 OK` (always generic message for privacy)

---

### Verify Email
**GET** `/api/verify-email?token=...&email=...`

**Response:**  
- `200 OK` on success  
- `400 Bad Request` on error

---

## Authentication Middleware

- All users, `/users/:email`, `/users/change-password`, and `/resend-verification` routes require a valid JWT in the `Authorization` header as `Bearer <token>`.
- Only admins can access users (get all users).

---

## Notes

- All endpoints return JSON responses.
- Sensitive fields like `hashedPassword` are never returned.
- All error responses include an `error` field with a message.
- Rate limiting and additional security (e.g., for resend verification) are recommended for production.
