const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

async function startServer() {
  const allowStartWithoutDb =
    process.env.ALLOW_START_WITHOUT_DB === 'true' || process.env.NODE_ENV !== 'production';

  try {
    await connectDB();
  } catch (error) {
    if (!allowStartWithoutDb) {
      console.error('Failed to start API:', error.message);
      process.exit(1);
    }

    console.warn(`MongoDB unavailable. Starting API without DB: ${error.message}`);
  }

  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
