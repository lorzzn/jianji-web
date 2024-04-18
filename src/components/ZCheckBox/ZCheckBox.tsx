import { twclx } from "@/utils/twclx"
import classNames from "classnames"
import { FC, ReactNode } from "react"

export interface ZCheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
}

const ZCheckBox: FC<ZCheckBoxProps> = ({ className, label, checked, ...restProps }) => {
  return (
    <label className={classNames(["flex items-center cursor-pointer select-none"])}>
      <input
        type="checkbox"
        className={twclx(
          "cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600",
          { "mr-1": label },
          className,
        )}
        checked={Boolean(checked)}
        {...restProps}
      />
      {label}
    </label>
  )
}

export default ZCheckBox
