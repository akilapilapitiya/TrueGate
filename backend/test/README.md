# Authentication Tests

This directory contains comprehensive unit tests for the main authentication endpoints (login, register, and user list) using the real database.

## Setup Instructions

### 1. Database Setup

The tests require a MongoDB database. You have two options:

#### Option A: Use MongoDB Atlas (Cloud)
If you have a MongoDB Atlas connection string, create a `.env` file in the test directory:

```bash
# Create .env file in backend/test/ directory
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/truegate_test
MONGODB_DB=truegate_test
JWT_SECRET=your-jwt-secret-key
CSRF_SECRET=your-csrf-secret-key
NODE_ENV=test
PORT=4002
```

#### Option B: Use Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create a `.env` file in the test directory:
```bash
MONGODB_URI=mongodb://localhost:27017/truegate_test
MONGODB_DB=truegate_test
JWT_SECRET=test-jwt-secret
CSRF_SECRET=test-csrf-secret
NODE_ENV=test
PORT=4002
```

### 2. Running Tests

#### Run all tests:
```bash
npm test
```

#### Run only authentication tests:
```bash
npm test test/auth.test.js
```

#### Run tests with coverage:
```bash
npm run test:coverage
```

## Test Coverage

The authentication tests cover:

### Registration Tests (`POST /api/register`)
- ✅ Valid user registration
- ✅ Invalid email format rejection
- ✅ Weak password rejection
- ✅ Missing required fields rejection
- ✅ Duplicate user registration rejection

### Login Tests (`POST /api/login`)
- ✅ Successful login with valid credentials
- ✅ Invalid email format rejection
- ✅ Missing credentials rejection
- ✅ Invalid credentials rejection

### User List Tests (`GET /api/users`)
- ✅ Unauthorized access rejection (no token)
- ✅ Invalid token format rejection
- ✅ Admin access to user list
- ✅ Non-admin access rejection

### Integration Tests
- ✅ Full user lifecycle: register → login → access protected route

## Test Features

- **Real Database**: Tests use the actual MongoDB database
- **Random Data**: Each test uses unique, randomly generated user data
- **Cleanup**: Tests clean up after themselves
- **Validation**: Comprehensive input validation testing
- **Security**: Tests authentication and authorization
- **Error Handling**: Tests various error scenarios

## Test Structure

```
test/
├── auth.test.js          # Main authentication tests
├── app.test.js          # Basic app tests
├── setup.js             # Test configuration
├── .env                 # Test environment variables (create this)
└── README.md           # This file
```

## Environment Variables

The tests automatically load environment variables from `test/.env` file:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/truegate_test` |
| `MONGODB_DB` | Database name | `truegate_test` |
| `JWT_SECRET` | JWT signing secret | `your-jwt-secret-key` |
| `CSRF_SECRET` | CSRF token secret | `your-csrf-secret-key` |
| `NODE_ENV` | Environment | `test` |
| `PORT` | Test server port | `4002` |

## Troubleshooting

### Database Connection Issues
- Ensure MongoDB is running
- Check your connection string in `test/.env`
- Verify network connectivity (for Atlas)
- Check firewall settings

### Test Failures
- Ensure `.env` file exists in test directory
- Check database permissions
- Verify JWT and CSRF secrets are configured

### Performance
- Tests use a separate test database
- Each test runs in isolation
- Cleanup happens automatically
- Tests are optimized for speed 