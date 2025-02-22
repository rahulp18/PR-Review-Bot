import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
// For production, set your key via environment variable.
// Example: process.env.ENCRYPTION_KEY should be a 64-character hex string.
const key = '6be4e4b19fae1e034a94be4a1bff5c9e577508f8543d8f522a2c9e587e849515';
 
// Convert hex string to a Buffer. This Buffer must be 32 bytes.
const secretKey = Buffer.from(key, 'hex');

// Validate secret key length.
if (secretKey.length !== 32) {
  throw new Error('Secret key must be 32 bytes long');
}

const generateIv = () => crypto.randomBytes(16);

export function encrypt(text: string): { iv: string; content: string } {
  const iv = generateIv();
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);
  return { iv: iv.toString('hex'), content: encrypted.toString('hex') };
}

export function decrypt(encrypted: { iv: string; content: string }): string {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(encrypted.iv, 'hex'),
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted.content, 'hex')),
    decipher.final(),
  ]);
  return decrypted.toString();
}
