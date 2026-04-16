const mongoose = require('mongoose');

let cachedConnection = global.mongoConnection;
let lastConnectionError = null;

if (!cachedConnection) {
  cachedConnection = global.mongoConnection = { conn: null, promise: null };
}

async function connectDB() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    lastConnectionError = new Error('MONGO_URI is missing in environment variables.');
    throw lastConnectionError;
  }

  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }

  if (!cachedConnection.promise) {
    const timeoutMs = Number(process.env.DB_CONNECT_TIMEOUT_MS || 10000);
    cachedConnection.promise = mongoose
      .connect(mongoUri, { serverSelectionTimeoutMS: timeoutMs })
      .then((mongooseInstance) => {
        lastConnectionError = null;
        return mongooseInstance;
      })
      .catch((error) => {
        lastConnectionError = error;
        cachedConnection.promise = null;
        throw error;
      });
  }

  cachedConnection.conn = await cachedConnection.promise;
  console.log('MongoDB connected');

  return cachedConnection.conn;
}

function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

function getDbStatus() {
  return {
    connected: isDbConnected(),
    readyState: mongoose.connection.readyState,
    lastError: lastConnectionError ? lastConnectionError.message : null
  };
}

module.exports = { connectDB, isDbConnected, getDbStatus };
