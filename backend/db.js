const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client;
let db;

// Only create client if URI is available
if (uri) {
  client = new MongoClient(uri);
  const sanitizedUri = uri.split('@')[1] || uri; // Extract host part if credentials are present
  console.log('MONGODB_URI (sanitized):', sanitizedUri);
  console.log('MONGODB_DB:', process.env.MONGODB_DB);
} else {
  console.log('⚠️  MONGODB_URI not set - database operations will be skipped');
}

async function connectDb() {
  if (!uri) {
    throw new Error('MONGODB_URI not configured');
  }
  
  if (!db) {
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}

function getDb() {
  if (!db) throw new Error('DB not connected');
  return db;
}

module.exports = { connectDb, getDb };
