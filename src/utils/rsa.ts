import JSEncrypt from "jsencrypt"
import { encryptAES, generateKeyIvPair } from "./aes"

const encryptor = new JSEncrypt()

export function encryptRSA(text: string, publicKey: string): string|false {

  encryptor.setPublicKey(publicKey)

  const encrypted = encryptor.encrypt(text)
  return encrypted
}

export function encryptRSAWithAES(data: any, publicKey: string) {
  const dataStr = typeof data === "string" ? data:JSON.stringify(data)

  const keyIv = generateKeyIvPair()
  const keyIvStr = JSON.stringify(keyIv)
  const { key, iv } = keyIv

  const encryptedData = encryptAES(dataStr, key, iv)
  const encryptedKeyIv = encryptRSA(keyIvStr, publicKey)

  if (encryptedData && encryptedKeyIv) {
    return {
      key: encryptedKeyIv,
      data: encryptedData
    }
  }

}
