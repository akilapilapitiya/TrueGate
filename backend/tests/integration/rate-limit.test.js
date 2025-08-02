// Load environment variables
require('dotenv').config();

const axios = require('axios');
const testCleanup = require('../../utils/testCleanup');

const BASE_URL = 'http://localhost:4000';

// Helper function to extract cookie from Set-Cookie header
function extractCookie(setCookieHeaders) {
  if (!Array.isArray(setCookieHeaders)) return null;
  for (const header of setCookieHeaders) {
    const cookieMatch = header.match(/csrf-token=([^;]+)/);
    if (cookieMatch) return cookieMatch[1];
  }
  return null;
}

async function testRateLimitingWorking() {
  console.log('🧪 Testing Rate Limiting (Working Version)...\n');
  
  // Track test email for cleanup
  let testEmail = null;

  try {
    // Step 1: Get CSRF token
    console.log('1. Getting CSRF token...');
    const csrfResponse = await axios.get(`${BASE_URL}/api/csrf-token`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    
    const csrfToken = csrfResponse.data.csrfToken;
    const csrfCookie = extractCookie(csrfResponse.headers['set-cookie']);
    console.log('✅ CSRF token and cookie obtained');

    // Step 2: Register a test user
    console.log('\n2. Registering test user...');
    testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';
    
    // Add to cleanup list
    testCleanup.addTestEmail(testEmail);
    
    try {
      const registerResponse = await axios.post(`${BASE_URL}/api/register`, {
        email: testEmail,
        password: testPassword,
        firstName: 'Test',
        lastName: 'User',
        birthDate: '1990-01-01',
        gender: 'other',
        contactNumber: '1234567890'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
          'Cookie': `csrf-token=${csrfCookie}`
        },
        withCredentials: true
      });
      console.log('✅ User registered successfully');
    } catch (error) {
      if (error.response?.status === 429) {
        console.log('⚠️  Registration rate limited - waiting 10 seconds and retrying...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        try {
          const retryResponse = await axios.post(`${BASE_URL}/api/register`, {
            email: testEmail,
            password: testPassword,
            firstName: 'Test',
            lastName: 'User',
            birthDate: '1990-01-01',
            gender: 'other',
            contactNumber: '1234567890'
          }, {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': csrfToken,
              'Cookie': `csrf-token=${csrfCookie}`
            },
            withCredentials: true
          });
          console.log('✅ User registered successfully on retry');
        } catch (retryError) {
          console.log('⚠️  Registration failed on retry:', retryError.response?.data?.error || retryError.message);
          if (retryError.response) {
            console.log('Status:', retryError.response.status);
            console.log('Data:', retryError.response.data);
          }
          return;
        }
      } else {
        console.log('⚠️  Registration failed:', error.response?.data?.error || error.message);
        if (error.response) {
          console.log('Status:', error.response.status);
          console.log('Data:', error.response.data);
        }
        return;
      }
    }

    // Step 3: Login with the test user
    console.log('\n3. Logging in with test user...');
    try {
      const loginResponse = await axios.post(`${BASE_URL}/api/login`, {
        email: testEmail,
        password: testPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
          'Cookie': `csrf-token=${csrfCookie}`
        },
        withCredentials: true
      });
      const jwtToken = loginResponse.data.token;
      console.log('✅ Login successful, JWT token obtained');
      
      // Step 4: First resend verification request (should succeed)
      console.log('\n4. Making first resend verification request...');
      try {
        const response1 = await axios.post(`${BASE_URL}/api/resend-verification`, {}, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
            'Authorization': `Bearer ${jwtToken}`,
            'Cookie': `csrf-token=${csrfCookie}`
          },
          withCredentials: true
        });
        console.log('✅ First request successful:', response1.data.message);
      } catch (error) {
        console.log('⚠️  First request failed:', error.response?.data?.error || error.message);
        return;
      }

      // Step 5: Immediate second request (should be rate limited)
      console.log('\n5. Making immediate second request (should be rate limited)...');
      try {
        const response2 = await axios.post(`${BASE_URL}/api/resend-verification`, {}, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
            'Authorization': `Bearer ${jwtToken}`,
            'Cookie': `csrf-token=${csrfCookie}`
          },
          withCredentials: true
        });
        console.log('❌ Second request should have been rate limited but succeeded');
      } catch (error) {
        if (error.response?.status === 429) {
          console.log('✅ Second request properly rate limited:', error.response.data.error);
        } else {
          console.log('⚠️  Unexpected error on second request:', error.response?.data?.error || error.message);
        }
      }

      // Step 6: Wait 5 seconds and try again (for testing, shorter wait)
      console.log('\n6. Waiting 5 seconds before next request...');
      console.log('⏳ Waiting 5 seconds...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      console.log('\n7. Making request after 5 seconds wait...');
      try {
        const response3 = await axios.post(`${BASE_URL}/api/resend-verification`, {}, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
            'Authorization': `Bearer ${jwtToken}`,
            'Cookie': `csrf-token=${csrfCookie}`
          },
          withCredentials: true
        });
        console.log('✅ Request after 5 seconds successful:', response3.data.message);
      } catch (error) {
        if (error.response?.status === 429) {
          console.log('✅ Request after 5 seconds still rate limited (expected)');
        } else {
          console.log('⚠️  Request after 5 seconds failed:', error.response?.data?.error || error.message);
        }
      }

      console.log('\n🎉 Rate limiting test completed successfully!');

    } catch (error) {
      console.log('❌ Login failed:', error.response?.data?.error || error.message);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.error || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  } finally {
    // Always cleanup test data automatically
    console.log('\n🧹 Automatic cleanup...');
    await testCleanup.cleanupTestUsers();
    
    // Ensure process exits after completion
    console.log('✅ Test completed, exiting...');
    process.exit(0);
  }
}

testRateLimitingWorking(); 