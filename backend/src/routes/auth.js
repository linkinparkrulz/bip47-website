import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import * as secp256k1 from '@noble/secp256k1';
import { sha256 } from '@noble/hashes/sha2';
import { generateUsername } from '../utils/usernameGenerator.js';

const router = express.Router();

// Helper function to get callback URL - prioritize production URLs
function getCallbackUrl() {
  // In production, use the Railway URL
  if (process.env.NODE_ENV === 'production' && process.env.CALLBACK_URL) {
    return process.env.CALLBACK_URL;
  }
  // In development with ngrok, use ngrok URL
  if (process.env.NGROK_URL) {
    return `${process.env.NGROK_URL}/api/auth/authenticate`;
  }
  // Fallback to local development
  return process.env.CALLBACK_URL || 'http://localhost:3001/api/auth/authenticate';
}

// Helper function to generate auth47 URI format
function generateAuth47URI(nonce, callback, expiresAt) {
  return `auth47://${nonce}?c=${callback}&e=${expiresAt}`;
}

// Helper function to create Bitcoin message hash
function magicHash(message) {
  const messagePrefix = '\u0018Bitcoin Signed Message:\n';
  const messageBytes = new TextEncoder().encode(message);
  const prefixBytes = new TextEncoder().encode(messagePrefix);
  
  // Create message with varint length
  const messageLength = messageBytes.length;
  const lengthBytes = [];
  let len = messageLength;
  while (len >= 0x80) {
    lengthBytes.push((len & 0x7f) | 0x80);
    len >>= 7;
  }
  lengthBytes.push(len);
  
  // Combine all parts
  const combined = new Uint8Array(prefixBytes.length + lengthBytes.length + messageBytes.length);
  combined.set(prefixBytes, 0);
  combined.set(lengthBytes, prefixBytes.length);
  combined.set(messageBytes, prefixBytes.length + lengthBytes.length);
  
  // Double SHA256
  return sha256(sha256(combined));
}

// Helper function to verify auth47 proof using noble/secp256k1
function verifyAuth47Proof(proof) {
  try {
    const { auth47_response, challenge, nym, signature } = proof;
    
    // Basic validation
    if (!auth47_response || !challenge || !nym || !signature) {
      return { result: 'error', error: 'Missing required fields' };
    }
    
    // Extract nonce from challenge
    const nonceMatch = challenge.match(/auth47:\/\/([a-f0-9]+)/);
    if (!nonceMatch) {
      return { result: 'error', error: 'Invalid challenge format' };
    }
    
    const nonce = nonceMatch[1];
    
    // Convert signature from base64 to bytes
    let signatureBytes;
    try {
      signatureBytes = Uint8Array.from(atob(signature), c => c.charCodeAt(0));
    } catch (e) {
      return { result: 'error', error: 'Invalid signature format' };
    }
    
    // Parse signature to extract recovery flag
    if (signatureBytes.length !== 65) {
      return { result: 'error', error: 'Invalid signature length' };
    }
    
    const recoveryFlag = signatureBytes[0] - 27;
    if (recoveryFlag < 0 || recoveryFlag > 7) {
      return { result: 'error', error: 'Invalid recovery flag' };
    }
    
    const signatureData = signatureBytes.slice(1);
    
    // Create message hash
    const messageHash = magicHash(challenge);
    
    // Convert public key from hex to bytes
    let publicKeyBytes;
    try {
      publicKeyBytes = new Uint8Array(nym.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    } catch (e) {
      return { result: 'error', error: 'Invalid public key format' };
    }
    
    try {
      // Verify signature using noble/secp256k1
      const isValidSignature = secp256k1.verify(signatureData, messageHash, publicKeyBytes);
      
      if (!isValidSignature) {
        return { result: 'error', error: 'Invalid signature' };
      }
      
      return { result: 'ok', nonce, publicKey: nym };
    } catch (sigError) {
      return { result: 'error', error: `Signature verification failed: ${sigError.message}` };
    }
    
  } catch (error) {
    return { result: 'error', error: `Proof verification error: ${error.message}` };
  }
}

// Store challenges in memory (in production, use Redis or database)
const challenges = new Map();

// Generate auth47 URI using our custom implementation
router.get('/challenge', (req, res) => {
  try {
    const nonce = crypto.randomBytes(12).toString('hex');
    const expiresAt = Math.floor(Date.now() / 1000) + 300; // 5 minutes
    
    // Get the current callback URL
    const currentCallbackUrl = getCallbackUrl();
    
    // Use our custom auth47 URI generation
    const auth47Uri = generateAuth47URI(nonce, currentCallbackUrl, expiresAt);
    
    challenges.set(nonce, {
      created: Date.now(),
      expiresAt,
      used: false,
      callbackUrl: currentCallbackUrl
    });
    
    // Clean up old challenges
    setTimeout(() => {
      challenges.delete(nonce);
    }, 5 * 60 * 1000);
    
    res.json({ 
      auth47Uri,
      nonce,
      callbackUrl: currentCallbackUrl,
      expiresAt
    });
  } catch (error) {
    console.error('Error generating auth47 URI:', error);
    res.status(500).json({ error: 'Failed to generate authentication challenge' });
  }
});

// Handle auth47 callback from wallet using proper Auth47Verifier
router.get('/authenticate', (req, res) => {
  try {
    const { auth47_response, challenge, nym, signature } = req.query;
    
    if (!auth47_response || !challenge || !nym || !signature) {
      return res.status(400).send(`
        <html>
          <body style="background: #000; color: #0f0; font-family: monospace; text-align: center; padding: 2rem;">
            <h1>AUTHENTICATION FAILED</h1>
            <p>Missing required auth47 parameters</p>
            <p>Expected: auth47_response, challenge, nym, signature</p>
            <a href="http://localhost:3000/auth" style="color: #0f0;">Try Again</a>
          </body>
        </html>
      `);
    }
    
    // Create proof object for Auth47Verifier
    const proof = {
      'auth47_response': auth47_response,
      'challenge': challenge,
      'nym': nym,
      'signature': signature
    };
    
    // Verify the proof using our custom auth47 verification
    const verifiedProof = verifyAuth47Proof(proof);
    
    if (verifiedProof.result !== 'ok') {
      console.error('Auth47 verification failed:', verifiedProof.error);
      return res.status(400).send(`
        <html>
          <body style="background: #000; color: #0f0; font-family: monospace; text-align: center; padding: 2rem;">
            <h1>AUTHENTICATION FAILED</h1>
            <p>Invalid proof: ${verifiedProof.error || 'Unknown error'}</p>
            <a href="http://localhost:3000/auth" style="color: #0f0;">Try Again</a>
          </body>
        </html>
      `);
    }
    
    // Mark challenge as used in our tracking
    if (verifiedProof.nonce) {
      const challengeData = challenges.get(verifiedProof.nonce);
      if (challengeData) {
        challengeData.used = true;
      }
    }
    
    // Generate username from public key (nym)
    const username = generateUsername(verifiedProof.publicKey);
    
    // Create JWT token
    const token = jwt.sign(
      { 
        publicKey: verifiedProof.publicKey, 
        username,
        iat: Math.floor(Date.now() / 1000)
      },
      req.app.locals.jwtSecret,
      { expiresIn: '24h' }
    );
    
    // Success page with token
    res.send(`
      <html>
        <body style="background: #000; color: #0f0; font-family: monospace; text-align: center; padding: 2rem;">
          <h1>AUTHENTICATION SUCCESSFUL</h1>
          <p>Welcome, ${username}!</p>
          <p>Auth47 proof verified successfully</p>
          <p>Redirecting to dashboard...</p>
          <script>
            localStorage.setItem('authToken', '${token}');
            localStorage.setItem('user', JSON.stringify({
              username: '${username}',
              publicKey: '${verifiedProof.publicKey}'
            }));
            setTimeout(() => {
              window.location.href = 'http://localhost:3000/dashboard';
            }, 2000);
          </script>
        </body>
      </html>
    `);
    
  } catch (error) {
    console.error('Error during auth47 authentication:', error);
    res.status(500).send(`
      <html>
        <body style="background: #000; color: #0f0; font-family: monospace; text-align: center; padding: 2rem;">
          <h1>AUTHENTICATION ERROR</h1>
          <p>Server error during authentication</p>
          <a href="http://localhost:3000/auth" style="color: #0f0;">Try Again</a>
        </body>
      </html>
    `);
  }
});

// Legacy verify endpoint for backward compatibility - now uses proper auth47 verification
router.post('/verify', (req, res) => {
  try {
    const { auth47_response, challenge, nym, signature } = req.body;
    
    if (!auth47_response || !challenge || !nym || !signature) {
      return res.status(400).json({ error: 'Missing required auth47 fields' });
    }
    
    // Create proof object for Auth47Verifier
    const proof = {
      'auth47_response': auth47_response,
      'challenge': challenge,
      'nym': nym,
      'signature': signature
    };
    
    // Verify the proof using our custom auth47 verification
    const verifiedProof = verifyAuth47Proof(proof);
    
    if (verifiedProof.result !== 'ok') {
      return res.status(400).json({ error: `Invalid proof: ${verifiedProof.error}` });
    }
    
    // Mark challenge as used in our tracking
    if (verifiedProof.nonce) {
      const challengeData = challenges.get(verifiedProof.nonce);
      if (challengeData) {
        challengeData.used = true;
      }
    }
    
    // Generate username from public key
    const username = generateUsername(verifiedProof.publicKey);
    
    // Create JWT token
    const token = jwt.sign(
      { 
        publicKey: verifiedProof.publicKey, 
        username,
        iat: Math.floor(Date.now() / 1000)
      },
      req.app.locals.jwtSecret,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        username,
        publicKey: verifiedProof.publicKey
      }
    });
    
  } catch (error) {
    console.error('Error during legacy auth47 verification:', error);
    res.status(500).json({ error: 'Server error during verification' });
  }
});

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, req.app.locals.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default router;
export { verifyToken };
