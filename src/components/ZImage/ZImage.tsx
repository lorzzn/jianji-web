import { RiImageLine } from "@remixicon/react"
import classNames from "classnames"
import { FC, useState } from "react"
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component'

export const assetsBaseURL = import.meta.env.VITE_APP_ASSETS_BASEURL

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

export const ZImage:FC<LazyLoadImageProps> = ({ src, className, ...restProps}) => {

  const [loadError, setLoadError] = useState<boolean>(false)
  src = joinAssetsUrl(src)

  return !loadError ? <LazyLoadImage
    src={src}
    className={className}
    onError={() => setLoadError(true)}
    {...restProps}
  /> : <div 
    className={classNames(["overflow-hidden", className])} 
    {...restProps}
  >
    <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-sm">
      <RiImageLine className="text-gray-300" />
    </div>
  </div>
}

export default ZImage
