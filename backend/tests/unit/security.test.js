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

// Helper function to create test user and get admin token
async function createAdminUser() {
  const csrfData = await getCsrfToken();
  if (!csrfData) {
    return null;
  }
  
  const testEmail = `admin-${Date.now()}@example.com`;
  
  try {
    // Register user
    await axios.post(`${BASE_URL}/api/register`, {
      email: testEmail,
      password: 'TestPassword123!',
      firstName: 'Admin',
      lastName: 'User',
      birthDate: '1990-01-01',
      gender: 'other',
      contactNumber: '1234567890',
      role: 'admin'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfData.token,
        'Cookie': `csrf-token=${csrfData.cookie}`
      },
      withCredentials: true
    });
    
    // Login to get token
    const loginResponse = await axios.post(`${BASE_URL}/api/login`, {
      email: testEmail,
      password: 'TestPassword123!'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfData.token,
        'Cookie': `csrf-token=${csrfData.cookie}`
      },
      withCredentials: true
    });
    
    return {
      token: loginResponse.data.token,
      email: testEmail,
      csrfData: csrfData
    };
  } catch (error) {
    console.error('Failed to create admin user:', error.message);
    return null;
  }
}

// Test 1: Get Security Events endpoint
async function testGetSecurityEventsEndpoint() {
  console.log('\n=== Test 1: Get Security Events Endpoint ===');
  
  const adminData = await createAdminUser();
  if (!adminData) {
    console.log('❌ Failed to create admin user');
    return false;
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/api/security/events`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminData.token}`,
        'X-CSRF-Token': adminData.csrfData.token,
        'Cookie': `csrf-token=${adminData.csrfData.cookie}`
      },
      withCredentials: true
    });
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ Get security events endpoint working correctly');
      return true;
    } else {
      console.log('❌ Get security events endpoint failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Get security events endpoint failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 2: Get Security Stats endpoint
async function testGetSecurityStatsEndpoint() {
  console.log('\n=== Test 2: Get Security Stats Endpoint ===');
  
  const adminData = await createAdminUser();
  if (!adminData) {
    console.log('❌ Failed to create admin user');
    return false;
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/api/security/stats`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminData.token}`,
        'X-CSRF-Token': adminData.csrfData.token,
        'Cookie': `csrf-token=${adminData.csrfData.cookie}`
      },
      withCredentials: true
    });
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ Get security stats endpoint working correctly');
      return true;
    } else {
      console.log('❌ Get security stats endpoint failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Get security stats endpoint failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 3: Get High Risk Events endpoint
async function testGetHighRiskEventsEndpoint() {
  console.log('\n=== Test 3: Get High Risk Events Endpoint ===');
  
  const adminData = await createAdminUser();
  if (!adminData) {
    console.log('❌ Failed to create admin user');
    return false;
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/api/security/events/high-risk`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminData.token}`,
        'X-CSRF-Token': adminData.csrfData.token,
        'Cookie': `csrf-token=${adminData.csrfData.cookie}`
      },
      withCredentials: true
    });
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ Get high risk events endpoint working correctly');
      return true;
    } else {
      console.log('❌ Get high risk events endpoint failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Get high risk events endpoint failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 4: Get CSRF Events endpoint
async function testGetCsrfEventsEndpoint() {
  console.log('\n=== Test 4: Get CSRF Events Endpoint ===');
  
  const adminData = await createAdminUser();
  if (!adminData) {
    console.log('❌ Failed to create admin user');
    return false;
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/api/security/events/csrf`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminData.token}`,
        'X-CSRF-Token': adminData.csrfData.token,
        'Cookie': `csrf-token=${adminData.csrfData.cookie}`
      },
      withCredentials: true
    });
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ Get CSRF events endpoint working correctly');
      return true;
    } else {
      console.log('❌ Get CSRF events endpoint failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Get CSRF events endpoint failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 5: Get Auth Events endpoint
async function testGetAuthEventsEndpoint() {
  console.log('\n=== Test 5: Get Auth Events Endpoint ===');
  
  const adminData = await createAdminUser();
  if (!adminData) {
    console.log('❌ Failed to create admin user');
    return false;
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/api/security/events/auth`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminData.token}`,
        'X-CSRF-Token': adminData.csrfData.token,
        'Cookie': `csrf-token=${adminData.csrfData.cookie}`
      },
      withCredentials: true
    });
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ Get auth events endpoint working correctly');
      return true;
    } else {
      console.log('❌ Get auth events endpoint failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Get auth events endpoint failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 6: Get IP Events endpoint
async function testGetIpEventsEndpoint() {
  console.log('\n=== Test 6: Get IP Events Endpoint ===');
  
  const adminData = await createAdminUser();
  if (!adminData) {
    console.log('❌ Failed to create admin user');
    return false;
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/api/security/events/ip/127.0.0.1`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminData.token}`,
        'X-CSRF-Token': adminData.csrfData.token,
        'Cookie': `csrf-token=${adminData.csrfData.cookie}`
      },
      withCredentials: true
    });
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ Get IP events endpoint working correctly');
      return true;
    } else {
      console.log('❌ Get IP events endpoint failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Get IP events endpoint failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 7: Get User Events endpoint
async function testGetUserEventsEndpoint() {
  console.log('\n=== Test 7: Get User Events Endpoint ===');
  
  const adminData = await createAdminUser();
  if (!adminData) {
    console.log('❌ Failed to create admin user');
    return false;
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/api/security/events/user/${adminData.email}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminData.token}`,
        'X-CSRF-Token': adminData.csrfData.token,
        'Cookie': `csrf-token=${adminData.csrfData.cookie}`
      },
      withCredentials: true
    });
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ Get user events endpoint working correctly');
      return true;
    } else {
      console.log('❌ Get user events endpoint failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Get user events endpoint failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 8: Log Security Event endpoint
async function testLogSecurityEventEndpoint() {
  console.log('\n=== Test 8: Log Security Event Endpoint ===');
  
  const adminData = await createAdminUser();
  if (!adminData) {
    console.log('❌ Failed to create admin user');
    return false;
  }
  
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
        'Authorization': `Bearer ${adminData.token}`,
        'X-CSRF-Token': adminData.csrfData.token,
        'Cookie': `csrf-token=${adminData.csrfData.cookie}`
      },
      withCredentials: true
    });
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ Log security event endpoint working correctly');
      return true;
    } else {
      console.log('❌ Log security event endpoint failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Log security event endpoint failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 9: Unauthorized Access Test
async function testUnauthorizedAccess() {
  console.log('\n=== Test 9: Unauthorized Access Test ===');
  
  try {
    // Try to access security endpoints without authentication
    const response = await axios.get(`${BASE_URL}/api/security/events`, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    
    console.log('❌ Unauthorized access test failed - endpoint should require authentication');
    return false;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Unauthorized access properly rejected');
      return true;
    } else {
      console.log('❌ Unauthorized access test failed:', error.response?.data?.error || error.message);
      return false;
    }
  }
}

// Test 10: Non-Admin Access Test
async function testNonAdminAccess() {
  console.log('\n=== Test 10: Non-Admin Access Test ===');
  
  const csrfData = await getCsrfToken();
  if (!csrfData) {
    console.log('❌ Failed to get CSRF token');
    return false;
  }
  
  const testEmail = `user-${Date.now()}@example.com`;
  
  try {
    // Register a regular user (non-admin)
    await axios.post(`${BASE_URL}/api/register`, {
      email: testEmail,
      password: 'TestPassword123!',
      firstName: 'Regular',
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
    
    // Login to get token
    const loginResponse = await axios.post(`${BASE_URL}/api/login`, {
      email: testEmail,
      password: 'TestPassword123!'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfData.token,
        'Cookie': `csrf-token=${csrfData.cookie}`
      },
      withCredentials: true
    });
    
    // Try to access security endpoints with non-admin token
    const response = await axios.get(`${BASE_URL}/api/security/events`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginResponse.data.token}`,
        'X-CSRF-Token': csrfData.token,
        'Cookie': `csrf-token=${csrfData.cookie}`
      },
      withCredentials: true
    });
    
    console.log('❌ Non-admin access test failed - endpoint should require admin role');
    return false;
  } catch (error) {
    if (error.response?.status === 403) {
      console.log('✅ Non-admin access properly rejected');
      return true;
    } else {
      console.log('❌ Non-admin access test failed:', error.response?.data?.error || error.message);
      return false;
    }
  }
}

// Run all security endpoint tests
async function runSecurityEndpointTests() {
  console.log('🔒 SECURITY API ENDPOINT TESTS');
  console.log('=====================================');
  
  // Add timeout to prevent infinite execution
  const timeout = setTimeout(() => {
    console.log('⏰ Test timeout reached - forcing exit');
    process.exit(1);
  }, 300000); // 5 minutes timeout
  
  try {
    const results = [];
    
    results.push(await testGetSecurityEventsEndpoint());
    await delay(200);
    
    results.push(await testGetSecurityStatsEndpoint());
    await delay(200);
    
    results.push(await testGetHighRiskEventsEndpoint());
    await delay(200);
    
    results.push(await testGetCsrfEventsEndpoint());
    await delay(200);
    
    results.push(await testGetAuthEventsEndpoint());
    await delay(200);
    
    results.push(await testGetIpEventsEndpoint());
    await delay(200);
    
    results.push(await testGetUserEventsEndpoint());
    await delay(200);
    
    results.push(await testLogSecurityEventEndpoint());
    await delay(200);
    
    results.push(await testUnauthorizedAccess());
    await delay(200);
    
    results.push(await testNonAdminAccess());
    
    clearTimeout(timeout);
    
    const passed = results.filter(r => r).length;
    const total = results.length;
    
    console.log('\n=====================================');
    console.log(`📊 SECURITY ENDPOINT TEST RESULTS: ${passed}/${total} tests passed`);
    
    if (passed === total) {
      console.log('🎉 ALL SECURITY ENDPOINT TESTS PASSED! 🔒');
    } else {
      console.log('⚠️  Some security endpoint tests failed. Check the implementation.');
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
  runSecurityEndpointTests().catch(console.error);
}

module.exports = { runSecurityEndpointTests }; 