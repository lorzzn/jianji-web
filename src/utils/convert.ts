
export const bin2hex = (s: string): string => {
  let n, o = ''
  s += ''
  for (let i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i).toString(16)
    o += n.length < 2 ? '0' + n : n
  }

  return o
}
