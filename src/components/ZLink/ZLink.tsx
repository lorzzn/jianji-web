import { twclx } from "@/utils/twclx"
import { ComponentProps, FC } from "react"

interface ZLinkProps extends ComponentProps<"a"> {}

const ZLink: FC<ZLinkProps> = ({ className, ...restProps }) => {
  return <a className={twclx(["text-blue-400 hover:text-blue-500 active:text-blue-600", className])} {...restProps} />
}

export default ZLink
