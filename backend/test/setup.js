const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

// Configure chai
chai.use(chaiHttp);
chai.should();

// Global test utilities
global.expect = chai.expect;
global.sinon = sinon;

// Test environment setup
process.env.NODE_ENV = 'test';
process.env.PORT = 4001; // Use different port for testing
process.env.MONGODB_URI = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/truegate_test';

// Clean up after each test
afterEach(() => {
  sinon.restore();
});

// Global test timeout
const TEST_TIMEOUT = 10000; 