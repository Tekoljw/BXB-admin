// RSA加密工具（使用JSEncrypt）
import JSEncrypt from 'jsencrypt';

export function encryptPassword(publicKey: string, password: string): string {
  try {
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(publicKey);
    const encrypted = jsEncrypt.encrypt(password);
    
    if (!encrypted) {
      throw new Error('Encryption failed');
    }
    
    return encrypted;
  } catch (error) {
    console.error('RSA encryption error:', error);
    throw new Error('Failed to encrypt password');
  }
}

export function isRSAEncryptAvailable(): boolean {
  return typeof JSEncrypt !== 'undefined';
}
