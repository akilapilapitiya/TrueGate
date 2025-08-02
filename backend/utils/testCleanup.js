const { connectDb } = require('../db');
const { findUserByEmail, deleteUser } = require('../services/userService');

class TestCleanup {
  constructor() {
    this.testEmails = [];
  }

  // Initialize database connection
  async init() {
    try {
      await connectDb();
    } catch (error) {
      console.error('❌ Failed to connect to database:', error.message);
      throw error;
    }
  }

  // Add test email to cleanup list
  addTestEmail(email) {
    this.testEmails.push(email);
  }

  // Clean up all test users by pattern
  async cleanupTestUsers() {
    console.log('🧹 Cleaning up test users by pattern...');
    let cleanedCount = 0;
    
    try {
      // Initialize database connection
      await this.init();
      
      // Clean up tracked test users first
      for (const email of this.testEmails) {
        try {
          const user = await findUserByEmail(email);
          if (user) {
            await deleteUser(email);
            cleanedCount++;
            console.log(`✅ Cleaned up tracked test user: ${email}`);
          }
        } catch (error) {
          console.log(`⚠️  Failed to clean up ${email}:`, error.message);
        }
      }
      
      // Clean up ALL users matching test pattern
      const { getDb } = require('../db');
      const db = getDb();
      
      // Find and delete all users matching test pattern
      const testPattern = /^test-.*@example\.com$/;
      const result = await db.collection('users').deleteMany({
        email: { $regex: testPattern }
      });
      
      if (result.deletedCount > 0) {
        console.log(`✅ Cleaned up ${result.deletedCount} additional test users by pattern`);
        cleanedCount += result.deletedCount;
      }
      
      this.testEmails = []; // Reset the list
      console.log(`🎉 Cleanup completed: ${cleanedCount} total test users removed`);
      return cleanedCount;
    } catch (error) {
      console.log('⚠️  Database connection failed, skipping automatic cleanup');
      return 0;
    }
  }

  // Clean up by email pattern (e.g., all test-*@example.com users)
  async cleanupByPattern(pattern = 'test-*@example.com') {
    console.log(`🧹 Cleaning up users matching pattern: ${pattern}`);
    
    // This would require a database query to find all matching users
    // For now, we'll use the existing test emails list
    return this.cleanupTestUsers();
  }

  // Clean up all users created in the last X minutes (for automated testing)
  async cleanupRecentUsers(minutes = 5) {
    console.log(`🧹 Cleaning up users created in the last ${minutes} minutes...`);
    
    // This would require a database query with timestamp filtering
    // For now, we'll use the existing test emails list
    return this.cleanupTestUsers();
  }
}

// Export singleton instance
module.exports = new TestCleanup(); 