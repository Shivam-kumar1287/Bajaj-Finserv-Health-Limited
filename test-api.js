const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('Testing BFHL API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing GET /health');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('Response:', JSON.stringify(healthResponse.data, null, 2));
    console.log('✅ Health check passed\n');

    // Test fibonacci
    console.log('2. Testing POST /bfhl with fibonacci');
    const fibResponse = await axios.post(`${BASE_URL}/bfhl`, { fibonacci: 7 });
    console.log('Response:', JSON.stringify(fibResponse.data, null, 2));
    console.log('✅ Fibonacci test passed\n');

    // Test prime
    console.log('3. Testing POST /bfhl with prime');
    const primeResponse = await axios.post(`${BASE_URL}/bfhl`, { prime: [2, 4, 7, 9, 11] });
    console.log('Response:', JSON.stringify(primeResponse.data, null, 2));
    console.log('✅ Prime test passed\n');

    // Test LCM
    console.log('4. Testing POST /bfhl with LCM');
    const lcmResponse = await axios.post(`${BASE_URL}/bfhl`, { lcm: [12, 18, 24] });
    console.log('Response:', JSON.stringify(lcmResponse.data, null, 2));
    console.log('✅ LCM test passed\n');

    // Test HCF
    console.log('5. Testing POST /bfhl with HCF');
    const hcfResponse = await axios.post(`${BASE_URL}/bfhl`, { hcf: [24, 36, 60] });
    console.log('Response:', JSON.stringify(hcfResponse.data, null, 2));
    console.log('✅ HCF test passed\n');

    // Test error case - invalid key
    console.log('6. Testing error case - invalid key');
    try {
      await axios.post(`${BASE_URL}/bfhl`, { invalid: 123 });
    } catch (error) {
      console.log('Error Response:', JSON.stringify(error.response.data, null, 2));
      console.log('✅ Error handling test passed\n');
    }

    // Test error case - multiple keys
    console.log('7. Testing error case - multiple keys');
    try {
      await axios.post(`${BASE_URL}/bfhl`, { fibonacci: 5, prime: [2, 3] });
    } catch (error) {
      console.log('Error Response:', JSON.stringify(error.response.data, null, 2));
      console.log('✅ Multiple keys error test passed\n');
    }

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

// Run tests only if server is running
if (require.main === module) {
  testAPI();
}

module.exports = testAPI;
