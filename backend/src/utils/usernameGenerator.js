import crypto from 'crypto';

const prefixes = ['cypher', 'crypto', 'stealth', 'node', 'anon', 'priv', 'zero', 'null', 'dark', 'shadow', 'ghost', 'matrix', 'terminal', 'binary', 'hex', 'quantum'];
const suffixes = ['punk', 'coder', 'node', 'agent', 'runner', 'ghost', 'walker', 'operator', 'miner', 'hacker', 'dev', 'tech', 'wiz', 'master', 'ninja', 'samurai'];

export function generateUsername(paymentCode) {
  // Remove "PM8T" prefix and take first 8 characters
  const hash = paymentCode.replace(/^PM8T/, '').slice(0, 8);
  
  if (hash.length < 8) {
    // Fallback if payment code is too short
    return `cypherpunk${Math.floor(Math.random() * 9999)}`;
  }
  
  try {
    // Generate deterministic but unique username based on payment code
    const prefixIndex = parseInt(hash.slice(0, 2), 16) % prefixes.length;
    const suffixIndex = parseInt(hash.slice(2, 4), 16) % suffixes.length;
    const number = parseInt(hash.slice(4, 8), 16) % 9999;
    
    return `${prefixes[prefixIndex]}${suffixes[suffixIndex]}${number.toString().padStart(3, '0')}`;
  } catch (error) {
    // Fallback to random username if parsing fails
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const randomNumber = Math.floor(Math.random() * 9999);
    
    return `${randomPrefix}${randomSuffix}${randomNumber.toString().padStart(3, '0')}`;
  }
}

export function generateAvatarUrl(paymentCode) {
  return `https://paynym.rs/${paymentCode}/avatar`;
}
