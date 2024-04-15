import CryptoJS from "./cryptoJS"
import { randomString } from "./stringFuncs"

// 生成 key iv
export function generateKeyIvPair() {
  return {
    key: randomString(16),
    iv: randomString(16),
  }
}

// aes 加密
export function encryptAES(text: string, key: string, iv: string): string {
  return CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString()
}

// aes 解密
export function decryptAES(ciphertext: string, key: string, iv: string): string {
  const decryptedBytes = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return decryptedBytes.toString(CryptoJS.enc.Utf8)
}
