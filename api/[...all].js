const app = require('../src/app');
const { connectDB } = require('../src/config/db');

connectDB().catch((error) => {
  console.error('Failed to initialize database connection for Vercel:', error.message);
});

module.exports = app;