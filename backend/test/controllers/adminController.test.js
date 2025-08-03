const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

describe('Admin Controller', () => {
  let adminController;
  let userService;
  let logger;

  beforeEach(() => {
    // Reset all stubs
    sinon.restore();
    
    // Stub dependencies
    userService = {
      findUserByEmail: sinon.stub(),
      getAllUsers: sinon.stub(),
      updateUser: sinon.stub(),
      changeUserPassword: sinon.stub(),
      deleteUser: sinon.stub()
    };

    logger = {
      securityLogger: sinon.stub()
    };

    // Mock the modules
    sinon.stub(require('../services/userService'), 'findUserByEmail').callsFake(userService.findUserByEmail);
    sinon.stub(require('../services/userService'), 'getAllUsers').callsFake(userService.getAllUsers);
    sinon.stub(require('../services/userService'), 'updateUser').callsFake(userService.updateUser);
    sinon.stub(require('../services/userService'), 'changeUserPassword').callsFake(userService.changeUserPassword);
    sinon.stub(require('../services/userService'), 'deleteUser').callsFake(userService.deleteUser);
    sinon.stub(require('../utils/logger'), 'securityLogger').callsFake(logger.securityLogger);

    adminController = require('../controllers/adminController');
  });

  describe('getUsers', () => {
    it('should get all users with pagination', async () => {
      const mockUsers = [
        { email: 'user1@example.com', firstName: 'John', lastName: 'Doe', role: 'user', verified: true },
        { email: 'user2@example.com', firstName: 'Jane', lastName: 'Smith', role: 'admin', verified: false }
      ];

      const req = {
        query: { page: 1, limit: 10 }
      };

      const res = {
        json: sinon.stub()
      };

      userService.getAllUsers.resolves(mockUsers);

      await adminController.getUsers(req, res);

      expect(res.json).to.have.been.calledWith({
        users: mockUsers,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalUsers: 2,
          usersPerPage: 10
        }
      });
    });

    it('should filter users by search term', async () => {
      const mockUsers = [
        { email: 'john@example.com', firstName: 'John', lastName: 'Doe' },
        { email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith' }
      ];

      const req = {
        query: { search: 'john' }
      };

      const res = {
        json: sinon.stub()
      };

      userService.getAllUsers.resolves(mockUsers);

      await adminController.getUsers(req, res);

      expect(res.json).to.have.been.calledWith({
        users: [{ email: 'john@example.com', firstName: 'John', lastName: 'Doe' }],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalUsers: 1,
          usersPerPage: 10
        }
      });
    });

    it('should filter users by role', async () => {
      const mockUsers = [
        { email: 'user1@example.com', role: 'user' },
        { email: 'admin@example.com', role: 'admin' }
      ];

      const req = {
        query: { role: 'admin' }
      };

      const res = {
        json: sinon.stub()
      };

      userService.getAllUsers.resolves(mockUsers);

      await adminController.getUsers(req, res);

      expect(res.json).to.have.been.calledWith({
        users: [{ email: 'admin@example.com', role: 'admin' }],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalUsers: 1,
          usersPerPage: 10
        }
      });
    });

    it('should handle errors gracefully', async () => {
      const req = { query: {} };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      userService.getAllUsers.rejects(new Error('Database error'));

      await adminController.getUsers(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: 'Failed to fetch users' });
    });
  });

  describe('getUserByEmail', () => {
    it('should get user by email successfully', async () => {
      const mockUser = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        hashedPassword: 'secret'
      };

      const req = {
        params: { email: 'test@example.com' }
      };

      const res = {
        json: sinon.stub()
      };

      userService.findUserByEmail.resolves(mockUser);

      await adminController.getUserByEmail(req, res);

      expect(res.json).to.have.been.calledWith({
        user: {
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe'
        }
      });
    });

    it('should return 404 when user not found', async () => {
      const req = {
        params: { email: 'nonexistent@example.com' }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      userService.findUserByEmail.resolves(null);

      await adminController.getUserByEmail(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ error: 'User not found' });
    });
  });

  describe('updateUserByEmail', () => {
    it('should update user successfully', async () => {
      const updates = {
        firstName: 'Updated',
        lastName: 'Name'
      };

      const updatedUser = {
        email: 'test@example.com',
        firstName: 'Updated',
        lastName: 'Name'
      };

      const req = {
        params: { email: 'test@example.com' },
        body: updates
      };

      const res = {
        json: sinon.stub()
      };

      userService.updateUser.resolves(updatedUser);

      await adminController.updateUserByEmail(req, res);

      expect(userService.updateUser).to.have.been.calledWith('test@example.com', updates);
      expect(res.json).to.have.been.calledWith({
        message: 'User updated successfully',
        user: updatedUser
      });
    });

    it('should prevent updating sensitive fields', async () => {
      const updates = {
        firstName: 'Updated',
        password: 'newpassword',
        hashedPassword: 'newhash',
        email: 'new@example.com'
      };

      const req = {
        params: { email: 'test@example.com' },
        body: updates
      };

      const res = {
        json: sinon.stub()
      };

      const updatedUser = {
        email: 'test@example.com',
        firstName: 'Updated'
      };

      userService.updateUser.resolves(updatedUser);

      await adminController.updateUserByEmail(req, res);

      // Should not include sensitive fields in the update
      expect(userService.updateUser).to.have.been.calledWith('test@example.com', {
        firstName: 'Updated'
      });
    });
  });

  describe('deleteUserByEmail', () => {
    it('should delete user successfully', async () => {
      const req = {
        params: { email: 'test@example.com' }
      };

      const res = {
        json: sinon.stub()
      };

      userService.deleteUser.resolves(true);

      await adminController.deleteUserByEmail(req, res);

      expect(userService.deleteUser).to.have.been.calledWith('test@example.com');
      expect(res.json).to.have.been.calledWith({
        message: 'User deleted successfully'
      });
    });

    it('should handle user not found', async () => {
      const req = {
        params: { email: 'nonexistent@example.com' }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      userService.deleteUser.resolves(false);

      await adminController.deleteUserByEmail(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ error: 'User not found' });
    });
  });

  describe('resetUserPassword', () => {
    it('should reset user password successfully', async () => {
      const req = {
        params: { email: 'test@example.com' },
        body: { newPassword: 'newpassword123' }
      };

      const res = {
        json: sinon.stub()
      };

      userService.changeUserPassword.resolves();

      await adminController.resetUserPassword(req, res);

      expect(userService.changeUserPassword).to.have.been.calledWith('test@example.com', sinon.match.string);
      expect(res.json).to.have.been.calledWith({
        message: 'Password reset successfully'
      });
    });
  });
}); 