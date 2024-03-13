import { bin2hex } from "./convert"

// 获取指纹 
export const getFingerprint = (): string => {
  const keyText = "f"
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return ""
  }

  ctx.textBaseline = 'top'
  ctx.font = "14px 'Arial'"
  ctx.fillStyle = '#f60'
  ctx.fillRect(125, 1, 62, 20)
  ctx.fillStyle = '#069'
  ctx.fillText(keyText, 2, 15)
  ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
  ctx.fillText(keyText, 4, 17)

  const b64 = canvas.toDataURL().replace('data:image/png;base64,', '')
  const crc = bin2hex(atob(b64).slice(-16, -12))
  return crc
}
