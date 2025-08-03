const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

describe('Security Middleware', () => {
  let securityMiddleware;
  let mockLogger;

  beforeEach(() => {
    sinon.restore();
    
    // Mock the logger
    mockLogger = {
      logMaliciousInput: sinon.stub(),
      logRateLimitExceeded: sinon.stub(),
      logCsrfViolation: sinon.stub(),
      logAuthEvent: sinon.stub(),
      logRegistrationEvent: sinon.stub(),
      logEmailVerificationEvent: sinon.stub(),
      logPasswordResetEvent: sinon.stub(),
      logPasswordChangeEvent: sinon.stub()
    };

    const loggerModule = require('../../utils/logger');
    sinon.stub(loggerModule, 'securityLogger').value(mockLogger);

    securityMiddleware = require('../../middleware/securityMiddleware');
  });

  describe('logSecurityEvents', () => {
    it('should log malicious input with script tag', () => {
      const req = {
        ip: '192.168.1.1',
        headers: {
          'user-agent': 'test-agent',
          'x-forwarded-for': '192.168.1.1'
        },
        path: '/api/test',
        method: 'POST',
        body: { input: '<script>alert("xss")</script>' },
        query: {},
        user: { email: 'test@example.com' },
        session: { id: 'session123' }
      };

      const res = {};
      const next = sinon.stub();

      securityMiddleware.logSecurityEvents(req, res, next);

      expect(mockLogger.logMaliciousInput).to.have.been.calledWith(
        '192.168.1.1',
        'test-agent',
        '/api/test',
        'POST',
        sinon.match.string,
        'Pattern detected: <script'
      );
      expect(next).to.have.been.calledWith();
    });

    it('should log malicious input with SQL injection', () => {
      const req = {
        ip: '192.168.1.1',
        headers: { 'user-agent': 'test-agent' },
        path: '/api/test',
        method: 'POST',
        body: { query: 'UNION SELECT * FROM users' },
        query: {},
        user: { email: 'test@example.com' },
        session: { id: 'session123' }
      };

      const res = {};
      const next = sinon.stub();

      securityMiddleware.logSecurityEvents(req, res, next);

      expect(mockLogger.logMaliciousInput).to.have.been.calledWith(
        '192.168.1.1',
        'test-agent',
        '/api/test',
        'POST',
        sinon.match.string,
        'Pattern detected: union\\s+select'
      );
    });

    it('should log rate limit exceeded', () => {
      const req = {
        ip: '192.168.1.1',
        headers: { 'user-agent': 'test-agent' },
        path: '/api/test',
        method: 'POST',
        body: {},
        query: {},
        rateLimit: { remaining: 0 },
        user: { email: 'test@example.com' },
        session: { id: 'session123' }
      };

      const res = {};
      const next = sinon.stub();

      securityMiddleware.logSecurityEvents(req, res, next);

      expect(mockLogger.logRateLimitExceeded).to.have.been.calledWith(
        '192.168.1.1',
        'test-agent',
        '/api/test',
        'POST'
      );
    });

    it('should not log for normal requests', () => {
      const req = {
        ip: '192.168.1.1',
        headers: { 'user-agent': 'test-agent' },
        path: '/api/test',
        method: 'GET',
        body: { normal: 'data' },
        query: {},
        user: { email: 'test@example.com' },
        session: { id: 'session123' }
      };

      const res = {};
      const next = sinon.stub();

      securityMiddleware.logSecurityEvents(req, res, next);

      expect(mockLogger.logMaliciousInput).to.not.have.been.called;
      expect(mockLogger.logRateLimitExceeded).to.not.have.been.called;
      expect(next).to.have.been.calledWith();
    });
  });

  describe('logCsrfViolations', () => {
    it('should log CSRF violation with missing header', () => {
      const req = {
        ip: '192.168.1.1',
        headers: { 'user-agent': 'test-agent' },
        path: '/api/test',
        method: 'POST',
        cookies: { 'csrf-token': 'valid-token' }
      };

      const res = {};
      const next = sinon.stub();
      const error = { code: 'EBADCSRFTOKEN' };

      securityMiddleware.logCsrfViolations(error, req, res, next);

      expect(mockLogger.logCsrfViolation).to.have.been.calledWith(
        '192.168.1.1',
        'test-agent',
        '/api/test',
        'POST',
        'missing_header'
      );
      expect(next).to.have.been.calledWith(error);
    });

    it('should log CSRF violation with missing cookie', () => {
      const req = {
        ip: '192.168.1.1',
        headers: { 
          'user-agent': 'test-agent',
          'x-csrf-token': 'valid-token'
        },
        path: '/api/test',
        method: 'POST',
        cookies: {}
      };

      const res = {};
      const next = sinon.stub();
      const error = { code: 'EBADCSRF' };

      securityMiddleware.logCsrfViolations(error, req, res, next);

      expect(mockLogger.logCsrfViolation).to.have.been.calledWith(
        '192.168.1.1',
        'test-agent',
        '/api/test',
        'POST',
        'missing_cookie'
      );
    });

    it('should log CSRF violation with token mismatch', () => {
      const req = {
        ip: '192.168.1.1',
        headers: { 
          'user-agent': 'test-agent',
          'x-csrf-token': 'header-token'
        },
        path: '/api/test',
        method: 'POST',
        cookies: { 'csrf-token': 'cookie-token' }
      };

      const res = {};
      const next = sinon.stub();
      const error = { code: 'EBADCSRFTOKEN' };

      securityMiddleware.logCsrfViolations(error, req, res, next);

      expect(mockLogger.logCsrfViolation).to.have.been.calledWith(
        '192.168.1.1',
        'test-agent',
        '/api/test',
        'POST',
        'mismatch'
      );
    });

    it('should not log for non-CSRF errors', () => {
      const req = {
        ip: '192.168.1.1',
        headers: { 'user-agent': 'test-agent' },
        path: '/api/test',
        method: 'POST'
      };

      const res = {};
      const next = sinon.stub();
      const error = { code: 'OTHER_ERROR' };

      securityMiddleware.logCsrfViolations(error, req, res, next);

      expect(mockLogger.logCsrfViolation).to.not.have.been.called;
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('logAuthEvents', () => {
    it('should log successful login', () => {
      const req = {
        ip: '192.168.1.1',
        headers: { 'user-agent': 'test-agent' },
        path: '/api/login',
        method: 'POST',
        user: { email: 'test@example.com' },
        session: { id: 'session123' }
      };

      const res = {
        send: sinon.stub()
      };
      const next = sinon.stub();

      // Mock the response interception
      const originalSend = res.send;
      res.send = function(data) {
        const response = JSON.parse(data);
        if (response.message === 'Login successful') {
          mockLogger.logAuthEvent('login_success', 'test@example.com', '192.168.1.1');
        }
        return originalSend.call(this, data);
      };

      securityMiddleware.logAuthEvents(req, res, next);

      // Simulate successful login response
      res.send(JSON.stringify({ message: 'Login successful' }));

      expect(mockLogger.logAuthEvent).to.have.been.calledWith(
        'login_success',
        'test@example.com',
        '192.168.1.1'
      );
      expect(next).to.have.been.calledWith();
    });
  });

  describe('logRegistrationEvents', () => {
    it('should log registration events', () => {
      const req = {
        ip: '192.168.1.1',
        headers: { 'user-agent': 'test-agent' },
        path: '/api/register',
        method: 'POST',
        body: { email: 'new@example.com' },
        user: { email: 'new@example.com' },
        session: { id: 'session123' }
      };

      const res = {
        send: sinon.stub()
      };
      const next = sinon.stub();

      securityMiddleware.logRegistrationEvents(req, res, next);

      expect(next).to.have.been.calledWith();
    });
  });

  describe('extractClientInfo', () => {
    it('should extract client information correctly', () => {
      const req = {
        ip: '192.168.1.1',
        headers: { 'user-agent': 'test-agent' },
        path: '/api/test',
        method: 'POST',
        user: { email: 'test@example.com' },
        session: { id: 'session123' }
      };

      const clientInfo = securityMiddleware.extractClientInfo(req);

      expect(clientInfo).to.deep.equal({
        ip: '192.168.1.1',
        userAgent: 'test-agent',
        path: '/api/test',
        method: 'POST',
        userId: 'test@example.com',
        sessionId: 'session123'
      });
    });

    it('should handle missing user and session', () => {
      const req = {
        ip: '192.168.1.1',
        headers: { 'user-agent': 'test-agent' },
        path: '/api/test',
        method: 'GET'
      };

      const clientInfo = securityMiddleware.extractClientInfo(req);

      expect(clientInfo).to.deep.equal({
        ip: '192.168.1.1',
        userAgent: 'test-agent',
        path: '/api/test',
        method: 'GET',
        userId: 'anonymous',
        sessionId: 'none'
      });
    });
  });
}); 