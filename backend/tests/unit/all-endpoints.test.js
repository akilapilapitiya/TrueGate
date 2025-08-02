const axios = require('axios');

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
async function createTestUser(email, csrfData, role = 'user') {
  try {
    const response = await axios.post(`${BASE_URL}/api/register`, {
      email: email,
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User',
      birthDate: '1990-01-01',
      gender: 'other',
      contactNumber: '1234567890',
      role: role
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

// Test CSRF Token endpoint
async function testCsrfTokenEndpoint() {
  console.log('\n=== Test: CSRF Token Endpoint ===');
  
  try {
    const response = await axios.get(`${BASE_URL}/api/csrf-token`, {
      withCredentials: true
    });
    
    if (response.status === 200 && response.data.csrfToken) {
      console.log('✅ CSRF token endpoint working correctly');
      return true;
    } else {
      console.log('❌ CSRF token endpoint failed');
      return false;
    }
  } catch (error) {
    console.log('❌ CSRF token endpoint failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test all Auth endpoints
async function testAllAuthEndpoints() {
  console.log('\n=== Testing All Auth Endpoints ===');
  
  const csrfData = await getCsrfToken();
  if (!csrfData) {
    console.log('❌ Failed to get CSRF token');
    return false;
  }
  
  const results = [];
  
  // Test 1: Register
  try {
    const testEmail = `test-${Date.now()}-register@example.com`;
    await createTestUser(testEmail, csrfData);
    console.log('✅ Register endpoint working');
    results.push(true);
  } catch (error) {
    console.log('❌ Register endpoint failed:', error.response?.data?.error || error.message);
    results.push(false);
  }
  
  // Test 2: Login
  try {
    const testEmail = `test-${Date.now()}-login@example.com`;
    await createTestUser(testEmail, csrfData);
    const loginResult = await loginUser(testEmail, 'TestPassword123!', csrfData);
    
    if (loginResult.token && loginResult.user) {
      console.log('✅ Login endpoint working');
      results.push(true);
    } else {
      console.log('❌ Login endpoint failed');
      results.push(false);
    }
  } catch (error) {
    console.log('❌ Login endpoint failed:', error.response?.data?.error || error.message);
    results.push(false);
  }
  
  // Test 3: Forgot Password
  try {
    const testEmail = `test-${Date.now()}-forgot@example.com`;
    await createTestUser(testEmail, csrfData);
    
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
      console.log('✅ Forgot password endpoint working');
      results.push(true);
    } else {
      console.log('❌ Forgot password endpoint failed');
      results.push(false);
    }
  } catch (error) {
    console.log('❌ Forgot password endpoint failed:', error.response?.data?.error || error.message);
    results.push(false);
  }
  
  // Test 4: Verify Email
  try {
    const response = await axios.get(`${BASE_URL}/api/verify-email?token=invalid&email=test@example.com`);
    console.log('❌ Verify email endpoint failed - should reject invalid token');
    results.push(false);
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ Verify email endpoint working (rejected invalid token)');
      results.push(true);
    } else {
      console.log('❌ Verify email endpoint failed:', error.response?.data?.error || error.message);
      results.push(false);
    }
  }
  
  // Test 5: Get Users (requires auth)
  try {
    const testEmail = `test-${Date.now()}-users@example.com`;
    await createTestUser(testEmail, csrfData);
    const loginResult = await loginUser(testEmail, 'TestPassword123!', csrfData);
    
    const response = await axios.get(`${BASE_URL}/api/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginResult.token}`,
        'X-CSRF-Token': csrfData.token,
        'Cookie': `csrf-token=${csrfData.cookie}`
      },
      withCredentials: true
    });
    
    console.log('✅ Get users endpoint working');
    results.push(true);
  } catch (error) {
    if (error.response?.status === 403) {
      console.log('✅ Get users endpoint working (access denied for non-admin)');
      results.push(true);
    } else {
      console.log('❌ Get users endpoint failed:', error.response?.data?.error || error.message);
      results.push(false);
    }
  }
  
  // Test 6: Modify User
  try {
    const testEmail = `test-${Date.now()}-modify@example.com`;
    await createTestUser(testEmail, csrfData);
    const loginResult = await loginUser(testEmail, 'TestPassword123!', csrfData);
    
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
    
    console.log('✅ Modify user endpoint working');
    results.push(true);
  } catch (error) {
    console.log('❌ Modify user endpoint failed:', error.response?.data?.error || error.message);
    results.push(false);
  }
  
  // Test 7: Change Password
  try {
    const testEmail = `test-${Date.now()}-password@example.com`;
    await createTestUser(testEmail, csrfData);
    const loginResult = await loginUser(testEmail, 'TestPassword123!', csrfData);
    
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
    
    console.log('✅ Change password endpoint working');
    results.push(true);
  } catch (error) {
    console.log('❌ Change password endpoint failed:', error.response?.data?.error || error.message);
    results.push(false);
  }
  
  // Test 8: Reset Password
  try {
    const testEmail = `test-${Date.now()}-reset@example.com`;
    await createTestUser(testEmail, csrfData);
    
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
    
    console.log('❌ Reset password endpoint failed - should reject invalid token');
    results.push(false);
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ Reset password endpoint working (rejected invalid token)');
      results.push(true);
    } else {
      console.log('❌ Reset password endpoint failed:', error.response?.data?.error || error.message);
      results.push(false);
    }
  }
  
  // Test 9: Resend Verification
  try {
    const testEmail = `test-${Date.now()}-resend@example.com`;
    await createTestUser(testEmail, csrfData);
    const loginResult = await loginUser(testEmail, 'TestPassword123!', csrfData);
    
    const response = await axios.post(`${BASE_URL}/api/resend-verification`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginResult.token}`,
        'X-CSRF-Token': csrfData.token,
        'Cookie': `csrf-token=${csrfData.cookie}`
      },
      withCredentials: true
    });
    
    console.log('✅ Resend verification endpoint working');
    results.push(true);
  } catch (error) {
    console.log('❌ Resend verification endpoint failed:', error.response?.data?.error || error.message);
    results.push(false);
  }
  
  return results;
}

// Test all Security endpoints
async function testAllSecurityEndpoints() {
  console.log('\n=== Testing All Security Endpoints ===');
  
  const csrfData = await getCsrfToken();
  if (!csrfData) {
    console.log('❌ Failed to get CSRF token');
    return false;
  }
  
  const results = [];
  
  // Create admin user for security tests
  const adminEmail = `admin-${Date.now()}@example.com`;
  try {
    await createTestUser(adminEmail, csrfData, 'admin');
    const adminLoginResult = await loginUser(adminEmail, 'TestPassword123!', csrfData);
    
    // Test 1: Get Security Events
    try {
      const response = await axios.get(`${BASE_URL}/api/security/events`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminLoginResult.token}`,
          'X-CSRF-Token': csrfData.token,
          'Cookie': `csrf-token=${csrfData.cookie}`
        },
        withCredentials: true
      });
      
      if (response.status === 200 && response.data.success) {
        console.log('✅ Get security events endpoint working');
        results.push(true);
      } else {
        console.log('❌ Get security events endpoint failed');
        results.push(false);
      }
    } catch (error) {
      console.log('❌ Get security events endpoint failed:', error.response?.data?.error || error.message);
      results.push(false);
    }
    
    // Test 2: Get Security Stats
    try {
      const response = await axios.get(`${BASE_URL}/api/security/stats`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminLoginResult.token}`,
          'X-CSRF-Token': csrfData.token,
          'Cookie': `csrf-token=${csrfData.cookie}`
        },
        withCredentials: true
      });
      
      if (response.status === 200 && response.data.success) {
        console.log('✅ Get security stats endpoint working');
        results.push(true);
      } else {
        console.log('❌ Get security stats endpoint failed');
        results.push(false);
      }
    } catch (error) {
      console.log('❌ Get security stats endpoint failed:', error.response?.data?.error || error.message);
      results.push(false);
    }
    
    // Test 3: Get High Risk Events
    try {
      const response = await axios.get(`${BASE_URL}/api/security/events/high-risk`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminLoginResult.token}`,
          'X-CSRF-Token': csrfData.token,
          'Cookie': `csrf-token=${csrfData.cookie}`
        },
        withCredentials: true
      });
      
      if (response.status === 200 && response.data.success) {
        console.log('✅ Get high risk events endpoint working');
        results.push(true);
      } else {
        console.log('❌ Get high risk events endpoint failed');
        results.push(false);
      }
    } catch (error) {
      console.log('❌ Get high risk events endpoint failed:', error.response?.data?.error || error.message);
      results.push(false);
    }
    
    // Test 4: Get CSRF Events
    try {
      const response = await axios.get(`${BASE_URL}/api/security/events/csrf`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminLoginResult.token}`,
          'X-CSRF-Token': csrfData.token,
          'Cookie': `csrf-token=${csrfData.cookie}`
        },
        withCredentials: true
      });
      
      if (response.status === 200 && response.data.success) {
        console.log('✅ Get CSRF events endpoint working');
        results.push(true);
      } else {
        console.log('❌ Get CSRF events endpoint failed');
        results.push(false);
      }
    } catch (error) {
      console.log('❌ Get CSRF events endpoint failed:', error.response?.data?.error || error.message);
      results.push(false);
    }
    
    // Test 5: Get Auth Events
    try {
      const response = await axios.get(`${BASE_URL}/api/security/events/auth`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminLoginResult.token}`,
          'X-CSRF-Token': csrfData.token,
          'Cookie': `csrf-token=${csrfData.cookie}`
        },
        withCredentials: true
      });
      
      if (response.status === 200 && response.data.success) {
        console.log('✅ Get auth events endpoint working');
        results.push(true);
      } else {
        console.log('❌ Get auth events endpoint failed');
        results.push(false);
      }
    } catch (error) {
      console.log('❌ Get auth events endpoint failed:', error.response?.data?.error || error.message);
      results.push(false);
    }
    
    // Test 6: Get IP Events
    try {
      const response = await axios.get(`${BASE_URL}/api/security/events/ip/127.0.0.1`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminLoginResult.token}`,
          'X-CSRF-Token': csrfData.token,
          'Cookie': `csrf-token=${csrfData.cookie}`
        },
        withCredentials: true
      });
      
      if (response.status === 200 && response.data.success) {
        console.log('✅ Get IP events endpoint working');
        results.push(true);
      } else {
        console.log('❌ Get IP events endpoint failed');
        results.push(false);
      }
    } catch (error) {
      console.log('❌ Get IP events endpoint failed:', error.response?.data?.error || error.message);
      results.push(false);
    }
    
    // Test 7: Get User Events
    try {
      const response = await axios.get(`${BASE_URL}/api/security/events/user/${adminEmail}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminLoginResult.token}`,
          'X-CSRF-Token': csrfData.token,
          'Cookie': `csrf-token=${csrfData.cookie}`
        },
        withCredentials: true
      });
      
      if (response.status === 200 && response.data.success) {
        console.log('✅ Get user events endpoint working');
        results.push(true);
      } else {
        console.log('❌ Get user events endpoint failed');
        results.push(false);
      }
    } catch (error) {
      console.log('❌ Get user events endpoint failed:', error.response?.data?.error || error.message);
      results.push(false);
    }
    
    // Test 8: Log Security Event
    try {
      const response = await axios.post(`${BASE_URL}/api/security/log`, {
        event: 'TEST_EVENT',
        details: {
          ip: '127.0.0.1',
          userAgent: 'test-agent',
          riskLevel: 'LOW'
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminLoginResult.token}`,
          'X-CSRF-Token': csrfData.token,
          'Cookie': `csrf-token=${csrfData.cookie}`
        },
        withCredentials: true
      });
      
      if (response.status === 200 && response.data.success) {
        console.log('✅ Log security event endpoint working');
        results.push(true);
      } else {
        console.log('❌ Log security event endpoint failed');
        results.push(false);
      }
    } catch (error) {
      console.log('❌ Log security event endpoint failed:', error.response?.data?.error || error.message);
      results.push(false);
    }
    
  } catch (error) {
    console.log('❌ Failed to create admin user for security tests:', error.response?.data?.error || error.message);
    return Array(8).fill(false); // Return false for all security tests
  }
  
  return results;
}

// Run all endpoint tests
async function runAllEndpointTests() {
  console.log('🌐 ALL API ENDPOINT TESTS');
  console.log('=====================================');
  
  // Add timeout to prevent infinite execution
  const timeout = setTimeout(() => {
    console.log('⏰ Test timeout reached - forcing exit');
    process.exit(1);
  }, 300000); // 5 minutes timeout
  
  try {
    const results = [];
    
    // Test CSRF Token endpoint
    results.push(await testCsrfTokenEndpoint());
    await delay(200);
    
    // Test all Auth endpoints
    const authResults = await testAllAuthEndpoints();
    results.push(...authResults);
    await delay(200);
    
    // Test all Security endpoints
    const securityResults = await testAllSecurityEndpoints();
    results.push(...securityResults);
    
    clearTimeout(timeout);
    
    const passed = results.filter(r => r).length;
    const total = results.length;
    
    console.log('\n=====================================');
    console.log(`📊 ALL ENDPOINT TEST RESULTS: ${passed}/${total} tests passed`);
    
    if (passed === total) {
      console.log('🎉 ALL API ENDPOINT TESTS PASSED! 🌐');
    } else {
      console.log('⚠️  Some API endpoint tests failed. Check the implementation.');
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
  runAllEndpointTests().catch(console.error);
}

module.exports = { runAllEndpointTests }; 