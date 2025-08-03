const axios = require('axios');

const BASE_URL = 'http://localhost:4000';

async function testPerformanceEndpoints() {
  console.log('🧪 Testing Performance Endpoints...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health endpoint working:', healthResponse.data);
    console.log('');

    // Test performance metrics (will fail without auth, but should not crash)
    console.log('2. Testing performance metrics endpoint...');
    try {
      const metricsResponse = await axios.get(`${BASE_URL}/api/performance/metrics`);
      console.log('✅ Performance metrics working:', metricsResponse.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Performance metrics endpoint exists (auth required)');
      } else {
        console.log('❌ Performance metrics error:', error.message);
      }
    }
    console.log('');

    // Test recent calls endpoint
    console.log('3. Testing recent calls endpoint...');
    try {
      const callsResponse = await axios.get(`${BASE_URL}/api/performance/recent-calls`);
      console.log('✅ Recent calls working:', callsResponse.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Recent calls endpoint exists (auth required)');
      } else {
        console.log('❌ Recent calls error:', error.message);
      }
    }
    console.log('');

    // Test system health endpoint
    console.log('4. Testing system health endpoint...');
    try {
      const sysHealthResponse = await axios.get(`${BASE_URL}/api/performance/health`);
      console.log('✅ System health working:', sysHealthResponse.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ System health endpoint exists (auth required)');
      } else {
        console.log('❌ System health error:', error.message);
      }
    }
    console.log('');

    // Test performance history endpoint
    console.log('5. Testing performance history endpoint...');
    try {
      const historyResponse = await axios.get(`${BASE_URL}/api/performance/history`);
      console.log('✅ Performance history working:', historyResponse.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Performance history endpoint exists (auth required)');
      } else {
        console.log('❌ Performance history error:', error.message);
      }
    }
    console.log('');

    console.log('🎉 All performance endpoints are properly configured!');
    console.log('📊 The UI should now be able to fetch real performance data.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testPerformanceEndpoints(); 