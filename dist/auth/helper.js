"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
const crypto = require("crypto");
const algorithm = 'aes-256-cbc';
const key = '6be4e4b19fae1e034a94be4a1bff5c9e577508f8543d8f522a2c9e587e849515';
const secretKey = Buffer.from(key, 'hex');
if (secretKey.length !== 32) {
    throw new Error('Secret key must be 32 bytes long');
}
const generateIv = () => crypto.randomBytes(16);
function encrypt(text) {
    const iv = generateIv();
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([
        cipher.update(text, 'utf8'),
        cipher.final(),
    ]);
    return { iv: iv.toString('hex'), content: encrypted.toString('hex') };
}
function decrypt(encrypted) {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(encrypted.iv, 'hex'));
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encrypted.content, 'hex')),
        decipher.final(),
    ]);
    return decrypted.toString();
}
//# sourceMappingURL=helper.js.map