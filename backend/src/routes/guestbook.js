import express from 'express';
import { verifyToken } from './auth.js';

const router = express.Router();

// Get all guestbook entries
router.get('/', (req, res) => {
  const db = req.app.locals.db;
  
  try {
    const entries = db.prepare(`
      SELECT id, username, payment_code, message, signature, created_at
      FROM guestbook_entries
      ORDER BY created_at DESC
      LIMIT 50
    `).all();
    
    res.json({ entries });
  } catch (error) {
    console.error('Error fetching guestbook entries:', error);
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

// Add new guestbook entry (requires authentication)
router.post('/', verifyToken, (req, res) => {
  const db = req.app.locals.db;
  const { message, signature, payment_code } = req.body;
  const { username, publicKey } = req.user;
  
  if (!message || !signature || !payment_code) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (message.length > 500) {
    return res.status(400).json({ error: 'Message too long (max 500 characters)' });
  }
  
  try {
    const stmt = db.prepare(`
      INSERT INTO guestbook_entries (username, payment_code, message, signature, public_key)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(username, payment_code, message, signature, publicKey);
    
    res.json({ 
      success: true, 
      id: result.lastInsertRowid,
      message: 'Entry added successfully'
    });
  } catch (error) {
    console.error('Error adding guestbook entry:', error);
    res.status(500).json({ error: 'Failed to add entry' });
  }
});

// Get guestbook statistics
router.get('/stats', (req, res) => {
  const db = req.app.locals.db;
  
  try {
    const totalEntries = db.prepare('SELECT COUNT(*) as count FROM guestbook_entries').get();
    const uniqueUsers = db.prepare('SELECT COUNT(DISTINCT public_key) as count FROM guestbook_entries').get();
    
    res.json({
      totalEntries: totalEntries.count,
      uniqueUsers: uniqueUsers.count
    });
  } catch (error) {
    console.error('Error fetching guestbook stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;
