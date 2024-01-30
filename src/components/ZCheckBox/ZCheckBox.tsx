import classNames from "classnames"
import { FC } from "react"
import { twMerge } from "tailwind-merge"

interface ZCheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const ZCheckBox:FC<ZCheckBoxProps> = ({ className, ...restProps }) => {

  return <input 
    type="checkbox" 
    className={twMerge(
      classNames(
        'cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600',
        className
      )
    )}
    {...restProps} 
  />
}

export default ZCheckBox
