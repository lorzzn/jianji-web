export const assetsBaseURL = import.meta.env.VITE_APP_ASSETS_BASEURL

export const assestsRoot = "!"

export const joinAssetsUrl = (url: string | undefined): string => {
  if (!url) {
    return ""
  }
  if (url.startsWith(assestsRoot)) {
    return url.replace(assestsRoot, assetsBaseURL)
  }

  return url
}
