const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const expect = chai.expect;
const bcrypt = require('bcrypt');
const crypto = require('crypto');

chai.use(chaiHttp);

describe('Auth Controller', () => {
  let authController;
  let userService;
  let mailer;
  let authUtils;

  beforeEach(() => {
    // Reset all stubs
    sinon.restore();
    
    // Stub dependencies
    userService = {
      findUserByEmail: sinon.stub(),
      addUser: sinon.stub(),
      updateUser: sinon.stub(),
      getAllUsers: sinon.stub(),
      changeUserPassword: sinon.stub(),
      setResetToken: sinon.stub(),
      findUserByResetToken: sinon.stub(),
      clearResetToken: sinon.stub()
    };

    mailer = {
      sendVerificationEmail: sinon.stub(),
      sendResetPasswordEmail: sinon.stub()
    };

    authUtils = {
      signJwt: sinon.stub(),
      JWT_EXPIRY: '24h'
    };

    // Mock the modules before requiring the controller
    const userServiceModule = require('../../services/userService');
    const mailerModule = require('../../utils/mailer');
    const authModule = require('../../utils/auth');

    sinon.stub(userServiceModule, 'findUserByEmail').callsFake(userService.findUserByEmail);
    sinon.stub(userServiceModule, 'addUser').callsFake(userService.addUser);
    sinon.stub(userServiceModule, 'updateUser').callsFake(userService.updateUser);
    sinon.stub(mailerModule, 'sendVerificationEmail').callsFake(mailer.sendVerificationEmail);
    sinon.stub(authModule, 'signJwt').callsFake(authUtils.signJwt);

    // Now require the controller
    authController = require('../../controllers/authController');
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'StrongPassword123!',
          firstName: 'John',
          lastName: 'Doe',
          birthDate: '1990-01-01',
          gender: 'male',
          contactNumber: '1234567890'
        },
        ip: '192.168.1.1',
        headers: { host: 'localhost:4000' }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      userService.findUserByEmail.resolves(null);
      userService.addUser.resolves();
      mailer.sendVerificationEmail.resolves();

      await authController.register(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        message: 'User registered successfully. Please check your email to verify your account.'
      });
    });

    it('should return error if user already exists', async () => {
      const req = {
        body: {
          email: 'existing@example.com',
          password: 'StrongPassword123!',
          firstName: 'John',
          lastName: 'Doe',
          birthDate: '1990-01-01',
          gender: 'male',
          contactNumber: '1234567890'
        }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      userService.findUserByEmail.resolves({ email: 'existing@example.com' });

      await authController.register(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ error: 'User already exists' });
    });
  });

  describe('verifyEmail', () => {
    it('should verify email successfully', async () => {
      const req = {
        query: {
          token: 'valid-token',
          email: 'test@example.com'
        }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const mockUser = {
        email: 'test@example.com',
        verified: false,
        verificationToken: 'valid-token',
        verificationTokenExpires: Date.now() + 3600000 // 1 hour from now
      };

      userService.findUserByEmail.resolves(mockUser);
      userService.updateUser.resolves();

      await authController.verifyEmail(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        message: 'Email verified successfully. You can now log in.'
      });
    });

    it('should return error for invalid verification link', async () => {
      const req = {
        query: {}
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      await authController.verifyEmail(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ error: 'Invalid verification link' });
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123'
        },
        ip: '192.168.1.1'
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
        cookie: sinon.stub()
      };

      const hashedPassword = await bcrypt.hash('password123', 12);
      const mockUser = {
        email: 'test@example.com',
        hashedPassword,
        verified: true,
        locked: false,
        allowedIps: ['192.168.1.1']
      };

      userService.findUserByEmail.resolves(mockUser);
      userService.updateUser.resolves();
      authUtils.signJwt.returns('mock-jwt-token');

      await authController.login(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        message: 'Login successful',
        user: {
          email: mockUser.email,
          verified: mockUser.verified
        }
      });
    });

    it('should return error for invalid credentials', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'wrongpassword'
        }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const hashedPassword = await bcrypt.hash('password123', 12);
      const mockUser = {
        email: 'test@example.com',
        hashedPassword,
        verified: true,
        locked: false
      };

      userService.findUserByEmail.resolves(mockUser);

      await authController.login(req, res);

      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({ error: 'Invalid credentials' });
    });
  });

  describe('forgotPassword', () => {
    it('should send reset password email', async () => {
      const req = {
        body: {
          email: 'test@example.com'
        }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const mockUser = {
        email: 'test@example.com',
        verified: true
      };

      userService.findUserByEmail.resolves(mockUser);
      userService.setResetToken.resolves();
      mailer.sendResetPasswordEmail.resolves();

      await authController.forgotPassword(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        message: 'If an account with that email exists, a password reset link has been sent.'
      });
    });
  });

  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      const req = {
        body: {
          token: 'valid-reset-token',
          password: 'NewPassword123!'
        }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const mockUser = {
        email: 'test@example.com',
        resetToken: 'valid-reset-token',
        resetTokenExpires: Date.now() + 3600000
      };

      userService.findUserByResetToken.resolves(mockUser);
      userService.changeUserPassword.resolves();
      userService.clearResetToken.resolves();

      await authController.resetPassword(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        message: 'Password reset successfully'
      });
    });
  });
}); 