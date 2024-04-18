export const staticsBaseURL = import.meta.env.VITE_APP_STATICS_BASEURL

export const staticsRoot = "!"

export const joinStaticsUrl = (url: string | undefined): string => {
  if (!url) {
    return ""
  }
  if (url.startsWith(staticsRoot)) {
    return url.replace(staticsRoot, staticsBaseURL)
  }

  return url
}
