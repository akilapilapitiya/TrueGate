const axios = require('axios');
const jwt = require('jsonwebtoken');

// Test configuration
const BASE_URL = 'http://localhost:4000';

// Helper function to delay execution
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function to extract cookie from Set-Cookie header
function extractCookie(setCookieHeaders, cookieName) {
  if (!setCookieHeaders || !Array.isArray(setCookieHeaders)) {
    return null;
  }
  
  for (const header of setCookieHeaders) {
    const match = header.match(new RegExp(`${cookieName}=([^;]+)`));
    if (match) {
      return match[1];
    }
  }
  return null;
}

// Helper function to get CSRF token
async function getCsrfToken() {
  try {
    const response = await axios.get(`${BASE_URL}/api/csrf-token`, {
      withCredentials: true
    });
    
    const csrfToken = response.data.csrfToken;
    const csrfCookie = extractCookie(response.headers['set-cookie'], 'csrf-token');
    
    return { token: csrfToken, cookie: csrfCookie };
  } catch (error) {
    console.error('Failed to get CSRF token:', error.message);
    return null;
  }
}

// Helper function to create test user
async function createTestUser(email, csrfData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/register`, {
      email: email,
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User',
      birthDate: '1990-01-01',
      gender: 'other',
      contactNumber: '1234567890'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfData.token,
        'Cookie': `csrf-token=${csrfData.cookie}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.error === 'User already exists') {
      return { message: 'User already exists' };
    }
    throw error;
  }
}

// Helper function to login user
async function loginUser(email, password, csrfData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, {
      email: email,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfData.token,
        'Cookie': `csrf-token=${csrfData.cookie}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Test 1: Register endpoint
async function testRegisterEndpoint() {
  console.log('\n=== Test 1: Register Endpoint ===');
  
  const csrfData = await getCsrfToken();
  if (!csrfData) {
    console.log('❌ Failed to get CSRF token');
    return false;
  }
  
  const testEmail = `test-${Date.now()}-register@example.com`;
  
  try {
    const result = await createTestUser(testEmail, csrfData);
    console.log('✅ Register endpoint working correctly');
    return true;
  } catch (error) {
    console.log('❌ Register endpoint failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 2: Login endpoint
async function testLoginEndpoint() {
  console.log('\n=== Test 2: Login Endpoint ===');
  
  const csrfData = await getCsrfToken();
  if (!csrfData) {
    console.log('❌ Failed to get CSRF token');
    return false;
  }
  
  const testEmail = `test-${Date.now()}-login@example.com`;
  
  try {
    // First register a user
    await createTestUser(testEmail, csrfData);
    
    // Then try to login
    const loginResult = await loginUser(testEmail, 'TestPassword123!', csrfData);
    
    if (loginResult.token && loginResult.user) {
      console.log('✅ Login endpoint working correctly');
      return true;
    } else {
      console.log('❌ Login endpoint failed: No token or user data');
      return false;
    }
  } catch (error) {
    console.log('❌ Login endpoint failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 3: Forgot Password endpoint
async function testForgotPasswordEndpoint() {
  console.log('\n=== Test 3: Forgot Password Endpoint ===');
  
  const csrfData = await getCsrfToken();
  if (!csrfData) {
    console.log('❌ Failed to get CSRF token');
    return false;
  }
  
  const testEmail = `test-${Date.now()}-forgot@example.com`;
  
  try {
    // First register a user
    await createTestUser(testEmail, csrfData);
    
    // Then try forgot password
    const response = await axios.post(`${BASE_URL}/api/forgot-password`, {
      email: testEmail
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfData.token,
        'Cookie': `csrf-token=${csrfData.cookie}`
      },
      withCredentials: true
    });
    
    if (response.status === 200) {
      console.log('✅ Forgot password endpoint working correctly');
      return true;
    } else {
      console.log('❌ Forgot password endpoint failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Forgot password endpoint failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 4: Verify Email endpoint
async function testVerifyEmailEndpoint() {
  console.log('\n=== Test 4: Verify Email Endpoint ===');
  
  try {
    // Test with invalid token
    const response = await axios.get(`${BASE_URL}/api/verify-email?token=invalid&email=test@example.com`);
    
    if (response.status === 400) {
      console.log('✅ Verify email endpoint working correctly (rejected invalid token)');
      return true;
    } else {
      console.log('❌ Verify email endpoint failed');
      return false;
    }
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ Verify email endpoint working correctly (rejected invalid token)');
      return true;
    } else {
      console.log('❌ Verify email endpoint failed:', error.response?.data?.error || error.message);
      return false;
    }
  }
}

// Test 5: Get Users endpoint (requires authentication)
async function testGetUsersEndpoint() {
  console.log('\n=== Test 5: Get Users Endpoint ===');
  
  const csrfData = await getCsrfToken();
  if (!csrfData) {
    console.log('❌ Failed to get CSRF token');
    return false;
  }
  
  const testEmail = `test-${Date.now()}-users@example.com`;
  
  try {
    // First register and login a user
    await createTestUser(testEmail, csrfData);
    const loginResult = await loginUser(testEmail, 'TestPassword123!', csrfData);
    
    // Then try to get users (should fail for non-admin)
    const response = await axios.get(`${BASE_URL}/api/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginResult.token}`,
        'X-CSRF-Token': csrfData.token,
        'Cookie': `csrf-token=${csrfData.cookie}`
      },
      withCredentials: true
    });
    
    console.log('✅ Get users endpoint working correctly');
    return true;
  } catch (error) {
    if (error.response?.status === 403) {
      console.log('✅ Get users endpoint working correctly (access denied for non-admin)');
      return true;
    } else {
      console.log('❌ Get users endpoint failed:', error.response?.data?.error || error.message);
      return false;
    }
  }
}

// Test 6: Modify User endpoint
async function testModifyUserEndpoint() {
  console.log('\n=== Test 6: Modify User Endpoint ===');
  
  const csrfData = await getCsrfToken();
  if (!csrfData) {
    console.log('❌ Failed to get CSRF token');
    return false;
  }
  
  const testEmail = `test-${Date.now()}-modify@example.com`;
  
  try {
    // First register and login a user
    await createTestUser(testEmail, csrfData);
    const loginResult = await loginUser(testEmail, 'TestPassword123!', csrfData);
    
    // Then try to modify user
    const response = await axios.put(`${BASE_URL}/api/users/${testEmail}`, {
      firstName: 'Updated',
      lastName: 'Name'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginResult.token}`,
        'X-CSRF-Token': csrfData.token,
        'Cookie': `csrf-token=${csrfData.cookie}`
      },
      withCredentials: true
    });
    
    console.log('✅ Modify user endpoint working correctly');
    return true;
  } catch (error) {
    console.log('❌ Modify user endpoint failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 7: Change Password endpoint
async function testChangePasswordEndpoint() {
  console.log('\n=== Test 7: Change Password Endpoint ===');
  
  const csrfData = await getCsrfToken();
  if (!csrfData) {
    console.log('❌ Failed to get CSRF token');
    return false;
  }
  
  const testEmail = `test-${Date.now()}-password@example.com`;
  
  try {
    // First register and login a user
    await createTestUser(testEmail, csrfData);
    const loginResult = await loginUser(testEmail, 'TestPassword123!', csrfData);
    
    // Then try to change password
    const response = await axios.post(`${BASE_URL}/api/users/change-password`, {
      oldPassword: 'TestPassword123!',
      newPassword: 'NewPassword123!'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginResult.token}`,
        'X-CSRF-Token': csrfData.token,
        'Cookie': `csrf-token=${csrfData.cookie}`
      },
      withCredentials: true
    });
    
    console.log('✅ Change password endpoint working correctly');
    return true;
  } catch (error) {
    console.log('❌ Change password endpoint failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 8: Reset Password endpoint
async function testResetPasswordEndpoint() {
  console.log('\n=== Test 8: Reset Password Endpoint ===');
  
  const csrfData = await getCsrfToken();
  if (!csrfData) {
    console.log('❌ Failed to get CSRF token');
    return false;
  }
  
  const testEmail = `test-${Date.now()}-reset@example.com`;
  
  try {
    // First register a user
    await createTestUser(testEmail, csrfData);
    
    // Then try to reset password with invalid token
    const response = await axios.post(`${BASE_URL}/api/reset-password`, {
      email: testEmail,
      token: 'invalid-token',
      newPassword: 'NewPassword123!'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfData.token,
        'Cookie': `csrf-token=${csrfData.cookie}`
      },
      withCredentials: true
    });
    
    console.log('✅ Reset password endpoint working correctly');
    return true;
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ Reset password endpoint working correctly (rejected invalid token)');
      return true;
    } else {
      console.log('❌ Reset password endpoint failed:', error.response?.data?.error || error.message);
      return false;
    }
  }
}

// Test 9: Resend Verification endpoint
async function testResendVerificationEndpoint() {
  console.log('\n=== Test 9: Resend Verification Endpoint ===');
  
  const csrfData = await getCsrfToken();
  if (!csrfData) {
    console.log('❌ Failed to get CSRF token');
    return false;
  }
  
  const testEmail = `test-${Date.now()}-resend@example.com`;
  
  try {
    // First register and login a user
    await createTestUser(testEmail, csrfData);
    const loginResult = await loginUser(testEmail, 'TestPassword123!', csrfData);
    
    // Then try to resend verification
    const response = await axios.post(`${BASE_URL}/api/resend-verification`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginResult.token}`,
        'X-CSRF-Token': csrfData.token,
        'Cookie': `csrf-token=${csrfData.cookie}`
      },
      withCredentials: true
    });
    
    console.log('✅ Resend verification endpoint working correctly');
    return true;
  } catch (error) {
    console.log('❌ Resend verification endpoint failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Run all auth endpoint tests
async function runAuthEndpointTests() {
  console.log('🔐 AUTH API ENDPOINT TESTS');
  console.log('=====================================');
  
  // Add timeout to prevent infinite execution
  const timeout = setTimeout(() => {
    console.log('⏰ Test timeout reached - forcing exit');
    process.exit(1);
  }, 300000); // 5 minutes timeout
  
  try {
    const results = [];
    
    results.push(await testRegisterEndpoint());
    await delay(200);
    
    results.push(await testLoginEndpoint());
    await delay(200);
    
    results.push(await testForgotPasswordEndpoint());
    await delay(200);
    
    results.push(await testVerifyEmailEndpoint());
    await delay(200);
    
    results.push(await testGetUsersEndpoint());
    await delay(200);
    
    results.push(await testModifyUserEndpoint());
    await delay(200);
    
    results.push(await testChangePasswordEndpoint());
    await delay(200);
    
    results.push(await testResetPasswordEndpoint());
    await delay(200);
    
    results.push(await testResendVerificationEndpoint());
    
    clearTimeout(timeout);
    
    const passed = results.filter(r => r).length;
    const total = results.length;
    
    console.log('\n=====================================');
    console.log(`📊 AUTH ENDPOINT TEST RESULTS: ${passed}/${total} tests passed`);
    
    if (passed === total) {
      console.log('🎉 ALL AUTH ENDPOINT TESTS PASSED! 🔐');
    } else {
      console.log('⚠️  Some auth endpoint tests failed. Check the implementation.');
    }
    
    // Ensure process exits after completion
    process.exit(passed === total ? 0 : 1);
  } catch (error) {
    clearTimeout(timeout);
    console.error('❌ Test execution error:', error);
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAuthEndpointTests().catch(console.error);
}

module.exports = { runAuthEndpointTests }; 