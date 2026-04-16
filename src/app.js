const express = require('express');
const cors = require('cors');
const { connectDB, getDbStatus, isDbConnected } = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const blockRoutes = require('./routes/blockRoutes');
const doctorProfileRoutes = require('./routes/doctorProfileRoutes');

const app = express();

const configuredOrigins = (process.env.CLIENT_ORIGINS || process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (configuredOrigins.length === 0) {
      return callback(null, true);
    }

    if (configuredOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json({ limit: '10mb' }));

app.use((req, _res, next) => {
  const isAssetRequest = /\.[a-zA-Z0-9]+$/.test(req.url);

  if (process.env.VERCEL && req.url !== '/' && !req.url.startsWith('/api/') && !isAssetRequest) {
    req.url = `/api${req.url}`;
  }

  next();
});

app.get(['/favicon.ico', '/favicon.png'], (_req, res) => {
  res.status(204).end();
});

app.get('/api/health', (_req, res) => {
  const db = getDbStatus();
  res.json({ status: 'ok', db });
});
app.get("/", (_req, res) => {
  res.send("Welcome to the Dentes Clinic API");
});
app.get('/api', (_req, res) => {
  res.send('Welcome to the Dentes Clinic API');
});

app.use('/api', async (req, res, next) => {
  if (/\.[a-zA-Z0-9]+$/.test(req.path)) {
    return res.status(404).json({ message: 'Not found' });
  }

  if (req.path === '/health' || req.path.startsWith('/auth')) {
    return next();
  }

  if (!isDbConnected()) {
    try {
      await connectDB();
    } catch (error) {
      const dbStatus = getDbStatus();

      if (!dbStatus.lastError && error && error.message) {
        dbStatus.lastError = error.message;
      }

      return res.status(503).json({
        message: 'Database is currently unavailable. Please hello  retry shortly.',
        db: dbStatus
      });
    }
  }

  return next();
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/gallery-items', galleryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/content-blocks', blockRoutes);
app.use('/api/doctor-profiles', doctorProfileRoutes);

module.exports = app;
