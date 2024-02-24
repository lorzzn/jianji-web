import classNames from "classnames"
import { FC, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface ZCheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
}

const ZCheckBox:FC<ZCheckBoxProps> = ({ className, label, ...restProps }) => {

  return <label className={classNames(['flex items-center cursor-pointer'])}>
    <input 
      type="checkbox" 
      className={twMerge(
        classNames(
          'cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600', { 'mr-1': label },
          className
        )
      )}
      {...restProps} 
    />
    {label}
  </label>
}

export default ZCheckBox
