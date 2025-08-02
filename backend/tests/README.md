# Test Suite Documentation

## 📁 Test Directory Structure

```
tests/
├── security/          # Security-focused tests
│   ├── csrf.test.js      # CSRF protection tests
│   ├── logging.test.js   # Security logging tests
│   └── hardcore.test.js  # Comprehensive security tests (XSS, SQLi, etc.)
├── integration/       # Integration tests
│   └── rate-limit.test.js # Rate limiting functionality tests
└── unit/             # Unit tests
    ├── auth.test.js       # Authentication API endpoint tests
    ├── security.test.js   # Security API endpoint tests
    └── all-endpoints.test.js # Comprehensive API endpoint tests
```

## 🧪 Available Test Scripts

### Security Tests
- `npm run test:csrf` - CSRF protection validation
- `npm run test:security` - Security logging system tests
- `npm run test:hardcore` - Comprehensive security tests (XSS, SQLi, CSRF variations)

### Integration Tests
- `npm run test:rate-limit` - Rate limiting functionality tests

### Unit Tests
- `npm run test:auth` - Authentication API endpoint tests
- `npm run test:security-endpoints` - Security API endpoint tests
- `npm run test:all-endpoints` - All API endpoint tests

### Test Categories
- `npm run test:all` - Execute all security and integration tests
- `npm run test:unit` - Execute all unit tests
- `npm run test:complete` - Execute all tests (security, integration, and unit)

## 📋 API Endpoints Tested

### Authentication Endpoints
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/forgot-password` - Password reset request
- `GET /api/verify-email` - Email verification
- `GET /api/users` - Get users (admin only)
- `PUT /api/users/:email` - Modify user
- `POST /api/users/change-password` - Change password
- `POST /api/reset-password` - Reset password with token
- `POST /api/resend-verification` - Resend verification email

### Security Endpoints
- `GET /api/security/events` - Get security events
- `GET /api/security/stats` - Get security statistics
- `GET /api/security/events/high-risk` - Get high-risk events
- `GET /api/security/events/csrf` - Get CSRF events
- `GET /api/security/events/auth` - Get authentication events
- `GET /api/security/events/ip/:ip` - Get events by IP
- `GET /api/security/events/user/:email` - Get events by user
- `POST /api/security/log` - Log security event

### Utility Endpoints
- `GET /api/csrf-token` - Get CSRF token

## 🔧 Test Features

### Automatic Cleanup
All tests include automatic cleanup that removes:
- Tracked test users from current test run
- All users matching pattern `test-*@example.com` (leftover from previous runs)

### CSRF Protection
Tests validate:
- Valid CSRF token acceptance
- Invalid/missing token rejection
- Cross-origin request protection
- Token generation and validation

### Security Logging
Tests verify:
- Malicious input detection and logging
- CSRF violation logging
- Rate limit violation logging
- Security event categorization

### Rate Limiting
Tests confirm:
- Rate limit enforcement (1 request per minute for resend-verification)
- Proper error responses
- Rate limit reset timing

## 🚀 Running Tests

```bash
# Run individual test suites
npm run test:csrf
npm run test:security
npm run test:hardcore
npm run test:rate-limit

# Run all tests
npm run test:all
```

## 📊 Test Results

Tests provide detailed output including:
- ✅ Pass/fail status for each test case
- 📊 Summary statistics
- 🧹 Automatic cleanup results
- ⚠️ Warning messages for non-critical issues

## 🔒 Security Focus

All tests are designed with production security in mind:
- Comprehensive attack vector testing
- Real-world scenario simulation
- Automatic cleanup to prevent test data accumulation
- Detailed logging for security monitoring 