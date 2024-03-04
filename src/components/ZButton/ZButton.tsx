import { cva, type VariantProps } from "class-variance-authority"
import classNames from "classnames"
import { FC } from "react"
import { twMerge } from "tailwind-merge"
import ZLoading from "../ZLoading/ZLoading"

interface ZButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const buttonVariants = cva(
  classNames('inline-flex items-center justify-center disabled:opacity-50'),
  {
    variants: {
      variant: {
        primary: classNames('bg-blue-500 text-white enabled:hover:bg-blue-600 enabled:active:bg-blue-700 transition'),
        success: classNames('bg-green-500 text-white enabled:hover:bg-green-600 enabled:active:bg-green-700 transition'),
        danger: classNames('bg-red-500 text-white enabled:hover:bg-red-600 enabled:active:bg-red-700 transition'),
      },
      scale: {
        small: classNames('h-6 px-3 text-xs'),
        middle: classNames('h-8 px-3 text-sm'),
        large: classNames('h-10 px-5 text-[1rem]'),
      },
      shape: {
        round: classNames('rounded-full'),
        square: classNames('rounded-s rounded-e'),
      },
    },
    defaultVariants: {
      variant: 'primary',
      scale: 'middle',
      shape: "square",
    },
  }
)

const ZButton:FC<ZButtonProps> = ({ className, variant, scale, shape, children, loading, disabled, ...restProps }) => {
  return (
    <button
      className={twMerge(
        classNames([buttonVariants({ variant, scale, shape, className }), { "cursor-not-allowed": loading || disabled }])
      )}
      disabled={loading || disabled}
      {...restProps}
    >
      {loading && <div className="mr-1">
        <ZLoading />
      </div>}
      {children}
    </button>
  )
}

export default ZButton
