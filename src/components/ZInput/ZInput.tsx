import { twclx } from "@/utils/twclx"
import { VariantProps, cva } from "class-variance-authority"
import classNames from "classnames"
import { forwardRef } from "react"

interface ZInputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariant> {}

const inputVariant = cva(
  classNames("border outline-none disabled:ring-0 hover:ring-1 transition-shadow duration-200"),
  {
    variants: {
      variant: {
        primary: classNames("hover:ring-blue-200 focus:ring-1 focus:ring-blue-400"),
        success: classNames("hover:ring-green-200 focus:ring-1 focus:ring-green-400"),
        danger: classNames("hover:ring-red-200 focus:ring-1 focus:ring-red-400"),
      },
      scale: {
        small: classNames("w-80 h-6 px-2 text-xs"),
        middle: classNames("w-80 h-8 px-2 text-sm"),
        large: classNames("w-80 h-10 px-3 text-[1rem]"),
      },
      shape: {
        round: classNames("rounded-full px-4"),
        square: classNames("rounded-e rounded-s"),
      },
    },
    defaultVariants: {
      variant: "primary",
      scale: "middle",
      shape: "square",
    },
  },
)

const ZInput = forwardRef<HTMLInputElement, ZInputProps>(({ className, variant, scale, shape, ...restProps }, ref) => {
  return <input ref={ref} className={twclx(inputVariant({ variant, scale, shape, className }))} {...restProps} />
})

export default ZInput
