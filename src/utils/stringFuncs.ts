import MarkdownIt from "markdown-it"
import PlainText from 'markdown-it-plain-text'

// 生成随机字符串
export function randomString(length: number, chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export const getPlainTextFromMarkdown = (str: string) => {
  const md = new MarkdownIt()
  md.use(PlainText)
  md.render(str)
  return (md as any).plainText
}
