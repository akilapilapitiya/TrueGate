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

// Test 1: Get CSRF token
async function testGetCsrfToken(retryCount = 0) {
  console.log('\n=== Test 1: Get CSRF Token ===');
  
  if (retryCount > 2) {
    console.log('❌ Too many retries, giving up');
    return null;
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/api/csrf-token`, {
      withCredentials: true
    });
    
    if (response.data.csrfToken && typeof response.data.csrfToken === 'string') {
      console.log('✅ CSRF token generated successfully');
      console.log(`   Token: ${response.data.csrfToken.substring(0, 10)}...`);
      
      // Extract cookie value
      const cookieValue = extractCookie(response.headers['set-cookie'], 'csrf-token');
      if (cookieValue) {
        console.log('✅ CSRF cookie extracted successfully');
        console.log(`   Cookie: ${cookieValue.substring(0, 10)}...`);
      } else {
        console.log('❌ CSRF cookie extraction failed');
      }
      
      return {
        token: response.data.csrfToken,
        cookie: cookieValue
      };
    } else {
      console.log('❌ CSRF token generation failed');
      return null;
    }
  } catch (error) {
    if (error.response?.status === 429) {
      console.log('⚠️  Rate limited - waiting and retrying...');
      await delay(5000); // Wait 5 seconds
      return await testGetCsrfToken(retryCount + 1); // Retry with count
    } else {
      console.log('❌ CSRF token endpoint failed:', error.response?.data?.error || error.message);
      return null;
    }
  }
}

// Test 2: Register with valid CSRF token and cookie
async function testRegisterWithValidCsrf(csrfData, retryCount = 0) {
  console.log('\n=== Test 2: Register with Valid CSRF Token ===');
  
  if (retryCount > 2) {
    console.log('❌ Too many retries, giving up');
    return false;
  }
  
  if (!csrfData || !csrfData.token || !csrfData.cookie) {
    console.log('❌ No CSRF token or cookie available for test');
    return false;
  }
  
  try {
    const testEmail = `test-${Date.now()}-csrf@example.com`;
    const response = await axios.post(`${BASE_URL}/api/register`, {
      email: testEmail,
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User',
      birthDate: '1990-01-01',
      gender: 'other',
      contactNumber: '1234567890'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfData.token,
        'Cookie': `csrf-token=${csrfData.cookie}`
      },
      withCredentials: true
    });
    
    console.log('✅ Registration with valid CSRF token successful');
    return true;
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.error === 'User already exists') {
      console.log('✅ Registration properly rejected (user already exists)');
      return true;
    } else if (error.response?.status === 403 && error.response?.data?.error === 'Invalid CSRF token') {
      console.log('❌ Valid CSRF token rejected - ISSUE!');
      return false;
    } else if (error.response?.status === 429) {
      console.log('⚠️  Rate limited - waiting and retrying...');
      await delay(5000); // Wait 5 seconds
      return await testRegisterWithValidCsrf(csrfData, retryCount + 1); // Retry with count
    } else {
      console.log('❌ Unexpected error:', error.response?.data?.error || error.message);
      return false;
    }
  }
}

// Test 3: Register without CSRF token (should fail)
async function testRegisterWithoutCsrf(retryCount = 0) {
  console.log('\n=== Test 3: Register without CSRF Token ===');
  
  if (retryCount > 2) {
    console.log('❌ Too many retries, giving up');
    return false;
  }
  
  try {
    const testEmail2 = `test-${Date.now()}-csrf2@example.com`;
    const response = await axios.post(`${BASE_URL}/api/register`, {
      email: testEmail2,
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User',
      birthDate: '1990-01-01',
      gender: 'other',
      contactNumber: '1234567890'
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    
    console.log('❌ Registration accepted without CSRF token - VULNERABILITY!');
    return false;
  } catch (error) {
    if (error.response?.status === 403 && error.response?.data?.error === 'Invalid CSRF token') {
      console.log('✅ Registration properly rejected without CSRF token');
      return true;
    } else if (error.response?.status === 429) {
      console.log('⚠️  Rate limited - waiting and retrying...');
      await delay(5000); // Wait 5 seconds
      return await testRegisterWithoutCsrf(retryCount + 1); // Retry with count
    } else {
      console.log('❌ Unexpected error:', error.response?.data?.error || error.message);
      return false;
    }
  }
}

// Test 4: Register with invalid CSRF token (should fail)
async function testRegisterWithInvalidCsrf(retryCount = 0) {
  console.log('\n=== Test 4: Register with Invalid CSRF Token ===');
  
  if (retryCount > 2) {
    console.log('❌ Too many retries, giving up');
    return false;
  }
  
  try {
    const testEmail3 = `test-${Date.now()}-csrf3@example.com`;
    const response = await axios.post(`${BASE_URL}/api/register`, {
      email: testEmail3,
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User',
      birthDate: '1990-01-01',
      gender: 'other',
      contactNumber: '1234567890'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': 'invalid-token-12345',
        'Cookie': 'csrf-token=invalid-cookie-12345'
      },
      withCredentials: true
    });
    
    console.log('❌ Registration accepted with invalid CSRF token - VULNERABILITY!');
    return false;
  } catch (error) {
    if (error.response?.status === 403 && error.response?.data?.error === 'Invalid CSRF token') {
      console.log('✅ Registration properly rejected with invalid CSRF token');
      return true;
    } else if (error.response?.status === 429) {
      console.log('⚠️  Rate limited - waiting and retrying...');
      await delay(5000); // Wait 5 seconds
      return await testRegisterWithInvalidCsrf(retryCount + 1); // Retry with count
    } else {
      console.log('❌ Unexpected error:', error.response?.data?.error || error.message);
      return false;
    }
  }
}

// Run all tests
async function runCsrfFixTests() {
  console.log('🔧 CSRF Token Fix Tests');
  console.log('=====================================');
  
  // Test 1: Get CSRF token
  const csrfData = await testGetCsrfToken();
  
  const results = [];
  results.push(csrfData !== null); // Test 1 result
  results.push(await testRegisterWithValidCsrf(csrfData));
  results.push(await testRegisterWithoutCsrf());
  results.push(await testRegisterWithInvalidCsrf());
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log('\n=====================================');
  console.log(`📊 Test Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All CSRF fix tests passed!');
  } else {
    console.log('⚠️  Some tests failed. Check the implementation.');
  }
  
  // Ensure process exits after completion
  process.exit(passed === total ? 0 : 1);
}

// Run tests if this file is executed directly
if (require.main === module) {
  runCsrfFixTests().catch(console.error);
}

module.exports = { runCsrfFixTests }; 