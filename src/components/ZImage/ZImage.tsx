import { FC } from "react"
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component'

export const assetsBaseURL = import.meta.env.VITE_APP_ASSETSBASEURL

export const assestsRoot = "!"

export const joinAssetsUrl = (url:string|undefined):string => {
  if (!url) {
    return ""
  }
  if (url.startsWith(assestsRoot)) {
    return url.replace(assestsRoot, assetsBaseURL)
  }
  return url
}

export const ZImage:FC<LazyLoadImageProps> = ({ src, ...restProps}) => {

  return <LazyLoadImage
    src={joinAssetsUrl(src)}
    {...restProps}
  />
}

export default ZImage
