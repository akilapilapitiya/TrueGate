const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const jwt = require('jsonwebtoken');

describe('Auth Utils', () => {
  let authUtils;
  let jwtStub;

  beforeEach(() => {
    // Reset all stubs
    sinon.restore();
    
    // Stub JWT
    jwtStub = {
      sign: sinon.stub(),
      verify: sinon.stub()
    };
    
    sinon.stub(jwt, 'sign').callsFake(jwtStub.sign);
    sinon.stub(jwt, 'verify').callsFake(jwtStub.verify);

    authUtils = require('../utils/auth');
  });

  describe('signJwt', () => {
    it('should sign JWT token successfully', () => {
      const payload = { userId: '123', email: 'test@example.com' };
      const expectedToken = 'mock.jwt.token';
      
      jwtStub.sign.returns(expectedToken);

      const result = authUtils.signJwt(payload);

      expect(result).to.equal(expectedToken);
      expect(jwtStub.sign).to.have.been.calledWith(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );
    });

    it('should handle JWT signing errors', () => {
      const payload = { userId: '123' };
      const error = new Error('JWT signing failed');
      
      jwtStub.sign.throws(error);

      expect(() => authUtils.signJwt(payload)).to.throw('JWT signing failed');
    });
  });

  describe('verifyJwt', () => {
    it('should verify JWT token successfully', () => {
      const token = 'valid.jwt.token';
      const expectedPayload = { userId: '123', email: 'test@example.com' };
      
      jwtStub.verify.returns(expectedPayload);

      const result = authUtils.verifyJwt(token);

      expect(result).to.deep.equal(expectedPayload);
      expect(jwtStub.verify).to.have.been.calledWith(token, process.env.JWT_SECRET);
    });

    it('should handle JWT verification errors', () => {
      const token = 'invalid.jwt.token';
      const error = new Error('JWT verification failed');
      
      jwtStub.verify.throws(error);

      expect(() => authUtils.verifyJwt(token)).to.throw('JWT verification failed');
    });
  });

  describe('JWT_EXPIRY', () => {
    it('should have correct JWT expiry time', () => {
      expect(authUtils.JWT_EXPIRY).to.equal('15m');
    });
  });
}); 