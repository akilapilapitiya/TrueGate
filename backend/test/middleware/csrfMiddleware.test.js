const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

describe('CSRF Middleware', () => {
  let csrfMiddleware;
  let mockDoubleCsrf;

  beforeEach(() => {
    sinon.restore();
    
    // Mock the csrf-csrf module
    mockDoubleCsrf = {
      doubleCsrfProtection: sinon.stub(),
      generateCsrfToken: sinon.stub(),
      invalidCsrfTokenError: new Error('Invalid CSRF token')
    };

    const doubleCsrfStub = sinon.stub().returns(mockDoubleCsrf);
    sinon.stub(require('csrf-csrf'), 'doubleCsrf').callsFake(doubleCsrfStub);

    csrfMiddleware = require('../../middleware/csrfMiddleware');
  });

  describe('requireCsrf', () => {
    it('should apply CSRF protection to state-changing operations', () => {
      const req = {
        path: '/api/register',
        method: 'POST',
        headers: {},
        cookies: {}
      };

      const res = {};
      const next = sinon.stub();

      mockDoubleCsrf.doubleCsrfProtection.callsFake((req, res, next) => next());

      csrfMiddleware.requireCsrf(req, res, next);

      expect(mockDoubleCsrf.doubleCsrfProtection).to.have.been.calledWith(req, res, next);
    });

    it('should skip CSRF protection for GET requests', () => {
      const req = {
        path: '/api/register',
        method: 'GET',
        headers: {},
        cookies: {}
      };

      const res = {};
      const next = sinon.stub();

      csrfMiddleware.requireCsrf(req, res, next);

      expect(next).to.have.been.calledWith();
      expect(mockDoubleCsrf.doubleCsrfProtection).to.not.have.been.called;
    });

    it('should skip CSRF protection for non-protected routes', () => {
      const req = {
        path: '/api/public-endpoint',
        method: 'POST',
        headers: {},
        cookies: {}
      };

      const res = {};
      const next = sinon.stub();

      csrfMiddleware.requireCsrf(req, res, next);

      expect(next).to.have.been.calledWith();
      expect(mockDoubleCsrf.doubleCsrfProtection).to.not.have.been.called;
    });

    it('should handle route parameters correctly', () => {
      const req = {
        path: '/api/users/test@example.com',
        method: 'PUT',
        headers: {},
        cookies: {}
      };

      const res = {};
      const next = sinon.stub();

      mockDoubleCsrf.doubleCsrfProtection.callsFake((req, res, next) => next());

      csrfMiddleware.requireCsrf(req, res, next);

      expect(mockDoubleCsrf.doubleCsrfProtection).to.have.been.calledWith(req, res, next);
    });
  });

  describe('skipCsrfForRoutes', () => {
    it('should skip CSRF for verify-email route', () => {
      const req = {
        path: '/api/verify-email',
        method: 'GET'
      };

      const res = {};
      const next = sinon.stub();

      csrfMiddleware.skipCsrfForRoutes(req, res, next);

      expect(next).to.have.been.calledWith();
      expect(mockDoubleCsrf.doubleCsrfProtection).to.not.have.been.called;
    });

    it('should skip CSRF for csrf-token route', () => {
      const req = {
        path: '/api/csrf-token',
        method: 'GET'
      };

      const res = {};
      const next = sinon.stub();

      csrfMiddleware.skipCsrfForRoutes(req, res, next);

      expect(next).to.have.been.calledWith();
      expect(mockDoubleCsrf.doubleCsrfProtection).to.not.have.been.called;
    });

    it('should skip CSRF for reset-password route', () => {
      const req = {
        path: '/api/reset-password',
        method: 'POST'
      };

      const res = {};
      const next = sinon.stub();

      csrfMiddleware.skipCsrfForRoutes(req, res, next);

      expect(next).to.have.been.calledWith();
      expect(mockDoubleCsrf.doubleCsrfProtection).to.not.have.been.called;
    });

    it('should apply CSRF protection for other routes', () => {
      const req = {
        path: '/api/login',
        method: 'POST'
      };

      const res = {};
      const next = sinon.stub();

      mockDoubleCsrf.doubleCsrfProtection.callsFake((req, res, next) => next());

      csrfMiddleware.skipCsrfForRoutes(req, res, next);

      expect(mockDoubleCsrf.doubleCsrfProtection).to.have.been.calledWith(req, res, next);
    });
  });

  describe('generateCsrfToken', () => {
    it('should generate CSRF token', () => {
      const token = 'test-csrf-token';
      mockDoubleCsrf.generateCsrfToken.returns(token);

      const result = csrfMiddleware.generateCsrfToken();

      expect(result).to.equal(token);
      expect(mockDoubleCsrf.generateCsrfToken).to.have.been.called;
    });
  });

  describe('invalidCsrfTokenError', () => {
    it('should export invalid CSRF token error', () => {
      expect(csrfMiddleware.invalidCsrfTokenError).to.be.an('error');
      expect(csrfMiddleware.invalidCsrfTokenError.message).to.equal('Invalid CSRF token');
    });
  });

  describe('csrfProtection', () => {
    it('should apply CSRF protection', () => {
      const req = {
        path: '/api/protected',
        method: 'POST'
      };

      const res = {};
      const next = sinon.stub();

      mockDoubleCsrf.doubleCsrfProtection.callsFake((req, res, next) => next());

      csrfMiddleware.csrfProtection(req, res, next);

      expect(mockDoubleCsrf.doubleCsrfProtection).to.have.been.calledWith(req, res, next);
    });
  });
}); 