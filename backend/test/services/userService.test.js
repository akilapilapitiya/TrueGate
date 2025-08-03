const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

describe('User Service', () => {
  let userService;
  let mockDb;
  let mockCollection;

  beforeEach(() => {
    // Reset all stubs
    sinon.restore();
    
    // Create mock collection
    mockCollection = {
      findOne: sinon.stub(),
      insertOne: sinon.stub(),
      findOneAndUpdate: sinon.stub(),
      find: sinon.stub(),
      updateOne: sinon.stub(),
      deleteOne: sinon.stub()
    };

    // Create mock database
    mockDb = {
      collection: sinon.stub().returns(mockCollection)
    };

    // Mock the database module
    const dbModule = require('../db');
    sinon.stub(dbModule, 'getDb').returns(mockDb);

    userService = require('../services/userService');
  });

  describe('findUserByEmail', () => {
    it('should find user by email successfully', async () => {
      const mockUser = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe'
      };

      mockCollection.findOne.resolves(mockUser);

      const result = await userService.findUserByEmail('test@example.com');

      expect(result).to.deep.equal(mockUser);
      expect(mockCollection.findOne).to.have.been.calledWith({ email: 'test@example.com' });
    });

    it('should return null when user not found', async () => {
      mockCollection.findOne.resolves(null);

      const result = await userService.findUserByEmail('nonexistent@example.com');

      expect(result).to.be.null;
    });

    it('should handle database errors gracefully', async () => {
      mockCollection.findOne.rejects(new Error('Database connection failed'));

      const result = await userService.findUserByEmail('test@example.com');

      expect(result).to.be.null;
    });
  });

  describe('addUser', () => {
    it('should add user successfully', async () => {
      const newUser = {
        email: 'new@example.com',
        firstName: 'Jane',
        lastName: 'Doe'
      };

      mockCollection.insertOne.resolves({ insertedId: '123' });

      await userService.addUser(newUser);

      expect(mockCollection.insertOne).to.have.been.calledWith(newUser);
    });
  });

  describe('updateUser', () => {
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

      mockCollection.findOneAndUpdate.resolves({ value: updatedUser });

      const result = await userService.updateUser('test@example.com', updates);

      expect(result).to.deep.equal(updatedUser);
      expect(mockCollection.findOneAndUpdate).to.have.been.calledWith(
        { email: 'test@example.com' },
        { $set: updates },
        { returnDocument: 'after' }
      );
    });

    it('should handle fallback when findOneAndUpdate returns no value', async () => {
      const updates = { firstName: 'Updated' };
      const fallbackUser = { email: 'test@example.com', firstName: 'Updated' };

      mockCollection.findOneAndUpdate.resolves({ value: null });
      mockCollection.findOne.resolves(fallbackUser);

      const result = await userService.updateUser('test@example.com', updates);

      expect(result).to.deep.equal(fallbackUser);
    });

    it('should remove hashedPassword from returned user', async () => {
      const updates = { firstName: 'Updated' };
      const userWithPassword = {
        email: 'test@example.com',
        firstName: 'Updated',
        hashedPassword: 'secret'
      };

      mockCollection.findOneAndUpdate.resolves({ value: userWithPassword });

      const result = await userService.updateUser('test@example.com', updates);

      expect(result.hashedPassword).to.be.undefined;
      expect(result.email).to.equal('test@example.com');
    });
  });

  describe('getAllUsers', () => {
    it('should get all users excluding sensitive fields', async () => {
      const mockUsers = [
        { email: 'user1@example.com', firstName: 'John' },
        { email: 'user2@example.com', firstName: 'Jane' }
      ];

      const mockCursor = {
        toArray: sinon.stub().resolves(mockUsers)
      };

      mockCollection.find.returns(mockCursor);

      const result = await userService.getAllUsers();

      expect(result).to.deep.equal(mockUsers);
      expect(mockCollection.find).to.have.been.calledWith(
        {},
        { projection: { hashedPassword: 0, verificationToken: 0, verificationTokenExpires: 0 } }
      );
    });
  });

  describe('changeUserPassword', () => {
    it('should change user password successfully', async () => {
      const newHashedPassword = 'new-hashed-password';

      mockCollection.updateOne.resolves({ modifiedCount: 1 });

      await userService.changeUserPassword('test@example.com', newHashedPassword);

      expect(mockCollection.updateOne).to.have.been.calledWith(
        { email: 'test@example.com' },
        { $set: { hashedPassword: newHashedPassword } }
      );
    });
  });

  describe('setResetToken', () => {
    it('should set reset token successfully', async () => {
      const token = 'reset-token';
      const expires = Date.now() + 3600000;

      mockCollection.updateOne.resolves({ modifiedCount: 1 });

      await userService.setResetToken('test@example.com', token, expires);

      expect(mockCollection.updateOne).to.have.been.calledWith(
        { email: 'test@example.com' },
        { $set: { resetPasswordToken: token, resetPasswordExpires: expires } }
      );
    });
  });

  describe('findUserByResetToken', () => {
    it('should find user by reset token successfully', async () => {
      const mockUser = {
        email: 'test@example.com',
        resetPasswordToken: 'valid-token'
      };

      mockCollection.findOne.resolves(mockUser);

      const result = await userService.findUserByResetToken('valid-token');

      expect(result).to.deep.equal(mockUser);
      expect(mockCollection.findOne).to.have.been.calledWith({ resetPasswordToken: 'valid-token' });
    });
  });

  describe('clearResetToken', () => {
    it('should clear reset token successfully', async () => {
      mockCollection.updateOne.resolves({ modifiedCount: 1 });

      await userService.clearResetToken('test@example.com');

      expect(mockCollection.updateOne).to.have.been.calledWith(
        { email: 'test@example.com' },
        { $unset: { resetPasswordToken: "", resetPasswordExpires: "" } }
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      mockCollection.deleteOne.resolves({ deletedCount: 1 });

      const result = await userService.deleteUser('test@example.com');

      expect(result).to.be.true;
      expect(mockCollection.deleteOne).to.have.been.calledWith({ email: 'test@example.com' });
    });

    it('should return false when user not found', async () => {
      mockCollection.deleteOne.resolves({ deletedCount: 0 });

      const result = await userService.deleteUser('nonexistent@example.com');

      expect(result).to.be.false;
    });

    it('should handle database errors gracefully', async () => {
      mockCollection.deleteOne.rejects(new Error('Database connection failed'));

      const result = await userService.deleteUser('test@example.com');

      expect(result).to.be.false;
    });
  });
}); 