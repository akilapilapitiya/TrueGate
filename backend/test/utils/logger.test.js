const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const fs = require('fs');
const path = require('path');

describe('Logger', () => {
  let logger;
  let fsStub;

  beforeEach(() => {
    sinon.restore();
    
    // Mock fs module
    fsStub = {
      existsSync: sinon.stub(),
      mkdirSync: sinon.stub(),
      appendFileSync: sinon.stub(),
      readFileSync: sinon.stub()
    };

    sinon.stub(fs, 'existsSync').callsFake(fsStub.existsSync);
    sinon.stub(fs, 'mkdirSync').callsFake(fsStub.mkdirSync);
    sinon.stub(fs, 'appendFileSync').callsFake(fsStub.appendFileSync);
    sinon.stub(fs, 'readFileSync').callsFake(fsStub.readFileSync);

    // Mock console.log to avoid output during tests
    sinon.stub(console, 'log');

    logger = require('../../utils/logger');
  });

  describe('SecurityLogger', () => {
    let securityLogger;

    beforeEach(() => {
      fsStub.existsSync.returns(false);
      securityLogger = new logger.SecurityLogger();
    });

    describe('ensureLogDirectory', () => {
      it('should create log directory if it does not exist', () => {
        fsStub.existsSync.returns(false);

        securityLogger.ensureLogDirectory();

        expect(fsStub.mkdirSync).to.have.been.calledWith(
          sinon.match.string,
          { recursive: true }
        );
      });

      it('should not create log directory if it already exists', () => {
        fsStub.existsSync.returns(true);

        securityLogger.ensureLogDirectory();

        expect(fsStub.mkdirSync).to.not.have.been.called;
      });
    });

    describe('getLogFileName', () => {
      it('should return correct log file name', () => {
        const fileName = securityLogger.getLogFileName('SECURITY');
        
        expect(fileName).to.include('security-');
        expect(fileName).to.include('.log');
        expect(fileName).to.include(new Date().toISOString().split('T')[0]);
      });
    });

    describe('formatLogEntry', () => {
      it('should format log entry correctly', () => {
        const details = {
          ip: '192.168.1.1',
          userAgent: 'test-agent',
          userId: 'test@example.com',
          sessionId: 'session123'
        };

        const logEntry = securityLogger.formatLogEntry('SECURITY', 'LOGIN_SUCCESS', details);

        expect(logEntry).to.be.a('string');
        const parsed = JSON.parse(logEntry);
        expect(parsed).to.have.property('timestamp');
        expect(parsed).to.have.property('level', 'SECURITY');
        expect(parsed).to.have.property('event', 'LOGIN_SUCCESS');
        expect(parsed.details).to.deep.include(details);
      });

      it('should handle missing details gracefully', () => {
        const logEntry = securityLogger.formatLogEntry('SECURITY', 'LOGIN_SUCCESS', {});

        expect(logEntry).to.be.a('string');
        const parsed = JSON.parse(logEntry);
        expect(parsed.details).to.have.property('userAgent', 'unknown');
        expect(parsed.details).to.have.property('ip', 'unknown');
        expect(parsed.details).to.have.property('userId', 'anonymous');
        expect(parsed.details).to.have.property('sessionId', 'none');
      });
    });

    describe('writeLog', () => {
      it('should write log entry to file', () => {
        const details = {
          ip: '192.168.1.1',
          userAgent: 'test-agent'
        };

        securityLogger.writeLog('SECURITY', 'LOGIN_SUCCESS', details);

        expect(fsStub.appendFileSync).to.have.been.calledWith(
          sinon.match.string,
          sinon.match.string
        );
      });

      it('should handle file write errors gracefully', () => {
        fsStub.appendFileSync.throws(new Error('Write failed'));

        const details = { ip: '192.168.1.1' };

        // Should not throw
        expect(() => {
          securityLogger.writeLog('SECURITY', 'LOGIN_SUCCESS', details);
        }).to.not.throw();
      });
    });

    describe('logSecurityEvent', () => {
      it('should log security event', () => {
        const details = {
          ip: '192.168.1.1',
          userAgent: 'test-agent'
        };

        securityLogger.logSecurityEvent('LOGIN_SUCCESS', details);

        expect(fsStub.appendFileSync).to.have.been.calledWith(
          sinon.match.string,
          sinon.match.string
        );
      });
    });

    describe('logLoginSuccess', () => {
      it('should log login success', () => {
        const email = 'test@example.com';
        const ip = '192.168.1.1';
        const userAgent = 'test-agent';

        securityLogger.logLoginSuccess(email, ip, userAgent);

        expect(fsStub.appendFileSync).to.have.been.calledWith(
          sinon.match.string,
          sinon.match.string
        );
      });
    });

    describe('logLoginFailed', () => {
      it('should log login failure', () => {
        const email = 'test@example.com';
        const ip = '192.168.1.1';
        const userAgent = 'test-agent';
        const reason = 'Invalid credentials';

        securityLogger.logLoginFailed(email, ip, userAgent, reason);

        expect(fsStub.appendFileSync).to.have.been.calledWith(
          sinon.match.string,
          sinon.match.string
        );
      });
    });

    describe('logCsrfViolation', () => {
      it('should log CSRF violation', () => {
        const ip = '192.168.1.1';
        const userAgent = 'test-agent';
        const path = '/api/login';
        const method = 'POST';
        const tokenStatus = 'missing_header';

        securityLogger.logCsrfViolation(ip, userAgent, path, method, tokenStatus);

        expect(fsStub.appendFileSync).to.have.been.calledWith(
          sinon.match.string,
          sinon.match.string
        );
      });
    });

    describe('logRateLimitExceeded', () => {
      it('should log rate limit exceeded', () => {
        const ip = '192.168.1.1';
        const userAgent = 'test-agent';
        const path = '/api/login';
        const method = 'POST';

        securityLogger.logRateLimitExceeded(ip, userAgent, path, method);

        expect(fsStub.appendFileSync).to.have.been.calledWith(
          sinon.match.string,
          sinon.match.string
        );
      });
    });

    describe('logMaliciousInput', () => {
      it('should log malicious input', () => {
        const ip = '192.168.1.1';
        const userAgent = 'test-agent';
        const path = '/api/test';
        const method = 'POST';
        const input = '<script>alert("xss")</script>';
        const reason = 'XSS attempt';

        securityLogger.logMaliciousInput(ip, userAgent, path, method, input, reason);

        expect(fsStub.appendFileSync).to.have.been.calledWith(
          sinon.match.string,
          sinon.match.string
        );
      });
    });

    describe('sanitizeInput', () => {
      it('should sanitize input by removing sensitive data', () => {
        const input = {
          password: 'secret123',
          email: 'test@example.com',
          token: 'jwt-token',
          normalField: 'normal-value'
        };

        const sanitized = securityLogger.sanitizeInput(input);

        expect(sanitized).to.not.have.property('password');
        expect(sanitized).to.not.have.property('token');
        expect(sanitized).to.have.property('email', 'test@example.com');
        expect(sanitized).to.have.property('normalField', 'normal-value');
      });

      it('should handle non-object input', () => {
        const input = 'test string';

        const sanitized = securityLogger.sanitizeInput(input);

        expect(sanitized).to.equal(input);
      });
    });

    describe('getRecentSecurityEvents', () => {
      it('should return recent security events', () => {
        const mockLogContent = JSON.stringify({
          timestamp: new Date().toISOString(),
          level: 'SECURITY',
          event: 'LOGIN_SUCCESS',
          details: { ip: '192.168.1.1' }
        }) + '\n';

        fsStub.readFileSync.returns(mockLogContent);

        const events = securityLogger.getRecentSecurityEvents(24);

        expect(events).to.be.an('array');
        expect(fsStub.readFileSync).to.have.been.called;
      });

      it('should handle file read errors gracefully', () => {
        fsStub.readFileSync.throws(new Error('File not found'));

        const events = securityLogger.getRecentSecurityEvents(24);

        expect(events).to.be.an('array');
        expect(events).to.be.empty;
      });
    });

    describe('getSecurityStats', () => {
      it('should return security statistics', () => {
        const mockLogContent = JSON.stringify({
          timestamp: new Date().toISOString(),
          level: 'SECURITY',
          event: 'LOGIN_SUCCESS',
          details: { ip: '192.168.1.1' }
        }) + '\n';

        fsStub.readFileSync.returns(mockLogContent);

        const stats = securityLogger.getSecurityStats(24);

        expect(stats).to.be.an('object');
        expect(stats).to.have.property('totalEvents');
        expect(stats).to.have.property('eventTypes');
        expect(fsStub.readFileSync).to.have.been.called;
      });

      it('should handle file read errors gracefully', () => {
        fsStub.readFileSync.throws(new Error('File not found'));

        const stats = securityLogger.getSecurityStats(24);

        expect(stats).to.be.an('object');
        expect(stats.totalEvents).to.equal(0);
        expect(stats.eventTypes).to.be.an('object');
      });
    });
  });

  describe('SECURITY_EVENTS', () => {
    it('should have all required security event types', () => {
      expect(logger.SECURITY_EVENTS).to.have.property('LOGIN_SUCCESS');
      expect(logger.SECURITY_EVENTS).to.have.property('LOGIN_FAILED');
      expect(logger.SECURITY_EVENTS).to.have.property('REGISTRATION_SUCCESS');
      expect(logger.SECURITY_EVENTS).to.have.property('CSRF_TOKEN_INVALID');
      expect(logger.SECURITY_EVENTS).to.have.property('RATE_LIMIT_EXCEEDED');
      expect(logger.SECURITY_EVENTS).to.have.property('MALICIOUS_INPUT');
    });
  });

  describe('LOG_LEVELS', () => {
    it('should have all required log levels', () => {
      expect(logger.LOG_LEVELS).to.have.property('INFO');
      expect(logger.LOG_LEVELS).to.have.property('WARN');
      expect(logger.LOG_LEVELS).to.have.property('ERROR');
      expect(logger.LOG_LEVELS).to.have.property('SECURITY');
      expect(logger.LOG_LEVELS).to.have.property('AUDIT');
    });
  });
}); 