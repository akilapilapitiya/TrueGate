const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const expect = chai.expect;

chai.use(chaiHttp);

describe('App', () => {
  let app;
  let server;

  before(async () => {
    // Set test environment
    process.env.NODE_ENV = 'test';
    process.env.PORT = 4001;
    
    // Mock database connection
    const dbModule = require('../db');
    sinon.stub(dbModule, 'connectDb').resolves();
    
    // Mock middleware that might cause issues in tests
    const csrfMiddleware = require('../middleware/csrfMiddleware');
    sinon.stub(csrfMiddleware, 'requireCsrf').callsFake((req, res, next) => next());
    sinon.stub(csrfMiddleware, 'generateCsrfToken').returns('test-csrf-token');
    
    // Import the actual app
    app = require('../app');
    
    // Start test server
    server = app.listen(4001);
    
    // Wait for server to be ready
    await new Promise(resolve => setTimeout(resolve, 100));
  });

  after(() => {
    if (server) {
      server.close();
    }
    sinon.restore();
  });

  describe('Health Check', () => {
    it('should return 200 for health check endpoint', async () => {
      const res = await chai.request(app)
        .get('/health')
        .timeout(5000);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status', 'healthy');
      expect(res.body).to.have.property('timestamp');
      expect(res.body).to.have.property('service', 'TrueGate Backend');
    });
  });

  describe('CSRF Token', () => {
    it('should generate CSRF token', async () => {
      const res = await chai.request(app)
        .get('/api/csrf-token')
        .timeout(5000);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('csrfToken');
      expect(res.body.csrfToken).to.be.a('string');
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const res = await chai.request(app)
        .get('/non-existent-route')
        .timeout(5000);

      expect(res).to.have.status(404);
    });
  });
}); 