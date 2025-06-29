const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

const client = new MongoClient(uri); // removed useUnifiedTopology
let db;

const sanitizedUri = uri ? uri.split('@')[1] || uri : 'undefined'; // Extract host part if credentials are present
console.log('MONGODB_URI (sanitized):', sanitizedUri);
console.log('MONGODB_DB:', process.env.MONGODB_DB);

async function connectDb() {
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
