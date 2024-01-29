import classNames from "classnames"
import { ForwardRefRenderFunction, forwardRef } from "react"
import styles from './index.module.scss'

export interface ZInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const ZInput:ForwardRefRenderFunction<HTMLInputElement, ZInputProps> = ({ className, ...restProps }, ref) => {

  return <input
    ref={ref}
    className={classNames("w-80 h-8 border rounded-sm outline-none px-2 hover:ring-1 hover:ring-blue-200 focus:ring-1 focus:ring-blue-400 transition-shadow duration-200", styles.zInput, className)}
    {...restProps}
  />
}

export default forwardRef(ZInput)
