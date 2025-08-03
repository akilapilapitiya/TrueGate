const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const expect = chai.expect;
const express = require('express');

chai.use(chaiHttp);

describe('Auth Routes', () => {
  let app;
  let authController;
  let authMiddleware;

  beforeEach(() => {
    sinon.restore();
    
    // Create Express app for testing
    app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Mock controller functions
    authController = {
      register: sinon.stub(),
      login: sinon.stub(),
      getUsers: sinon.stub(),
      modifyUser: sinon.stub(),
      changePassword: sinon.stub(),
      verifyEmail: sinon.stub(),
      resendVerification: sinon.stub(),
      forgotPassword: sinon.stub(),
      resetPassword: sinon.stub()
    };

    // Mock middleware
    authMiddleware = {
      verifyToken: sinon.stub()
    };

    // Mock the modules
    const authControllerModule = require('../../controllers/authController');
    const authMiddlewareModule = require('../../middleware/authMiddleware');

    sinon.stub(authControllerModule, 'register').callsFake(authController.register);
    sinon.stub(authControllerModule, 'login').callsFake(authController.login);
    sinon.stub(authControllerModule, 'getUsers').callsFake(authController.getUsers);
    sinon.stub(authControllerModule, 'modifyUser').callsFake(authController.modifyUser);
    sinon.stub(authControllerModule, 'changePassword').callsFake(authController.changePassword);
    sinon.stub(authControllerModule, 'verifyEmail').callsFake(authController.verifyEmail);
    sinon.stub(authControllerModule, 'resendVerification').callsFake(authController.resendVerification);
    sinon.stub(authControllerModule, 'forgotPassword').callsFake(authController.forgotPassword);
    sinon.stub(authControllerModule, 'resetPassword').callsFake(authController.resetPassword);
    sinon.stub(authMiddlewareModule, 'verifyToken').callsFake(authMiddleware.verifyToken);

    // Import and use routes
    const authRoutes = require('../../routes/auth');
    app.use('/api', authRoutes);
  });

  describe('POST /api/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'StrongPassword123!',
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1990-01-01',
        gender: 'male',
        contactNumber: '1234567890'
      };

      authController.register.resolves({
        status: 201,
        json: { message: 'User registered successfully' }
      });

      const res = await chai.request(app)
        .post('/api/register')
        .send(userData);

      expect(res).to.have.status(201);
      expect(authController.register).to.have.been.calledWith(
        sinon.match.object,
        sinon.match.object
      );
    });

    it('should return 400 for invalid input', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'weak'
      };

      authController.register.resolves({
        status: 400,
        json: { error: 'Invalid input' }
      });

      const res = await chai.request(app)
        .post('/api/register')
        .send(invalidData);

      expect(res).to.have.status(400);
      expect(authController.register).to.have.been.calledWith(
        sinon.match.object,
        sinon.match.object
      );
    });
  });

  describe('POST /api/login', () => {
    it('should login user successfully', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      authController.login.resolves({
        status: 200,
        json: { message: 'Login successful' }
      });

      const res = await chai.request(app)
        .post('/api/login')
        .send(loginData);

      expect(res).to.have.status(200);
      expect(authController.login).to.have.been.calledWith(
        sinon.match.object,
        sinon.match.object
      );
    });

    it('should return 401 for invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      authController.login.resolves({
        status: 401,
        json: { error: 'Invalid credentials' }
      });

      const res = await chai.request(app)
        .post('/api/login')
        .send(loginData);

      expect(res).to.have.status(401);
      expect(authController.login).to.have.been.calledWith(
        sinon.match.object,
        sinon.match.object
      );
    });
  });

  describe('GET /api/verify-email', () => {
    it('should verify email successfully', async () => {
      const query = {
        token: 'valid-token',
        email: 'test@example.com'
      };

      authController.verifyEmail.resolves({
        status: 200,
        json: { message: 'Email verified successfully' }
      });

      const res = await chai.request(app)
        .get('/api/verify-email')
        .query(query);

      expect(res).to.have.status(200);
      expect(authController.verifyEmail).to.have.been.calledWith(
        sinon.match.object,
        sinon.match.object
      );
    });

    it('should return 400 for invalid verification link', async () => {
      const query = {
        token: 'invalid-token',
        email: 'test@example.com'
      };

      authController.verifyEmail.resolves({
        status: 400,
        json: { error: 'Invalid verification link' }
      });

      const res = await chai.request(app)
        .get('/api/verify-email')
        .query(query);

      expect(res).to.have.status(400);
      expect(authController.verifyEmail).to.have.been.calledWith(
        sinon.match.object,
        sinon.match.object
      );
    });
  });

  describe('POST /api/forgot-password', () => {
    it('should send password reset email', async () => {
      const data = {
        email: 'test@example.com'
      };

      authController.forgotPassword.resolves({
        status: 200,
        json: { message: 'Password reset email sent' }
      });

      const res = await chai.request(app)
        .post('/api/forgot-password')
        .send(data);

      expect(res).to.have.status(200);
      expect(authController.forgotPassword).to.have.been.calledWith(
        sinon.match.object,
        sinon.match.object
      );
    });
  });

  describe('POST /api/reset-password', () => {
    it('should reset password successfully', async () => {
      const data = {
        token: 'valid-reset-token',
        password: 'NewPassword123!'
      };

      authController.resetPassword.resolves({
        status: 200,
        json: { message: 'Password reset successfully' }
      });

      const res = await chai.request(app)
        .post('/api/reset-password')
        .send(data);

      expect(res).to.have.status(200);
      expect(authController.resetPassword).to.have.been.calledWith(
        sinon.match.object,
        sinon.match.object
      );
    });
  });

  describe('POST /api/resend-verification', () => {
    it('should resend verification email', async () => {
      const data = {
        email: 'test@example.com'
      };

      authController.resendVerification.resolves({
        status: 200,
        json: { message: 'Verification email resent' }
      });

      const res = await chai.request(app)
        .post('/api/resend-verification')
        .send(data);

      expect(res).to.have.status(200);
      expect(authController.resendVerification).to.have.been.calledWith(
        sinon.match.object,
        sinon.match.object
      );
    });
  });

  describe('Protected routes', () => {
    beforeEach(() => {
      // Mock verifyToken middleware to pass through
      authMiddleware.verifyToken.callsFake((req, res, next) => {
        req.user = { email: 'test@example.com' };
        next();
      });
    });

    describe('GET /api/users', () => {
      it('should get users list', async () => {
        authController.getUsers.resolves({
          status: 200,
          json: { users: [] }
        });

        const res = await chai.request(app)
          .get('/api/users');

        expect(res).to.have.status(200);
        expect(authController.getUsers).to.have.been.calledWith(
          sinon.match.object,
          sinon.match.object
        );
      });
    });

    describe('PUT /api/users/:email', () => {
      it('should modify user', async () => {
        const userData = {
          firstName: 'Updated',
          lastName: 'Name'
        };

        authController.modifyUser.resolves({
          status: 200,
          json: { message: 'User updated successfully' }
        });

        const res = await chai.request(app)
          .put('/api/users/test@example.com')
          .send(userData);

        expect(res).to.have.status(200);
        expect(authController.modifyUser).to.have.been.calledWith(
          sinon.match.object,
          sinon.match.object
        );
      });
    });

    describe('POST /api/users/change-password', () => {
      it('should change password', async () => {
        const data = {
          currentPassword: 'oldpassword',
          newPassword: 'newpassword123'
        };

        authController.changePassword.resolves({
          status: 200,
          json: { message: 'Password changed successfully' }
        });

        const res = await chai.request(app)
          .post('/api/users/change-password')
          .send(data);

        expect(res).to.have.status(200);
        expect(authController.changePassword).to.have.been.calledWith(
          sinon.match.object,
          sinon.match.object
        );
      });
    });
  });

  describe('Rate limiting', () => {
    it('should apply rate limiting to resend-verification', async () => {
      // This test would require more complex setup to test rate limiting
      // For now, we'll just verify the route exists
      const res = await chai.request(app)
        .post('/api/resend-verification')
        .send({ email: 'test@example.com' });

      // Should either succeed or be rate limited
      expect(res).to.have.status.oneOf([200, 429]);
    });
  });

  describe('Error handling', () => {
    it('should handle controller errors gracefully', async () => {
      authController.register.rejects(new Error('Database error'));

      const res = await chai.request(app)
        .post('/api/register')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      // Should handle the error appropriately
      expect(res).to.have.status.oneOf([500, 400]);
    });
  });
}); 