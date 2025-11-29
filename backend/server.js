import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { initDatabase } from './src/database/init.js';
import { generateUsername } from './src/utils/usernameGenerator.js';
import authRoutes from './src/routes/auth.js';
import guestbookRoutes from './src/routes/guestbook.js';
import paynymRoutes from './src/routes/paynym.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database and make it available to routes
initDatabase().then(db => {
  app.locals.db = db;
}).catch(error => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});

// Simple challenge generator (replacing auth47 for now)
const generateChallenge = () => {
  return `AUTH47_CHALLENGE_${Date.now()}_${crypto.randomBytes(16).toString('hex')}`;
};

// Make challenge generator available to routes
app.locals.generateChallenge = generateChallenge;
app.locals.jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/guestbook', guestbookRoutes);
app.use('/api/paynym', paynymRoutes);

// Authentication is now handled by the /api/auth routes
// The /authenticate endpoint is now properly implemented in backend/src/routes/auth.js

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BIP47 & Paynyms Showcase Backend running on port ${PORT}`);
  console.log(`📡 Simple authentication mode (auth47 compatibility layer)`);
});

export default app;
