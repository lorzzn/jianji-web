import { twclx } from "@/utils/twclx"
import { RiCloseLine } from "@remixicon/react"
import { VariantProps, cva } from "class-variance-authority"
import classNames from "classnames"
import { FocusEventHandler, forwardRef, useState } from "react"

interface ZInputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariant> {
  showClearIcon?: "always" | "focus" | "never" | "hover" | "not-empty"
  clearIconRender?: (show?: boolean) => React.ReactNode
  onClear?: () => void
}

const inputVariant = cva(classNames("border outline-none disabled:ring-0 transition-shadow duration-200"), {
  variants: {
    variant: {
      primary: classNames("ring-blue-400"),
      success: classNames("ring-green-400"),
      danger: classNames("ring-red-400"),
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
})

const getHoverVariant = (variant: string | null | undefined) => {
  switch (variant) {
    case "success":
      return "hover:ring-1 hover:ring-green-200"
    case "danger":
      return "hover:ring-1 hover:ring-red-200"
    default:
      return "hover:ring-1 hover:ring-blue-200" // 默认返回primary的hover样式
  }
}

const ZInput = forwardRef<HTMLInputElement, ZInputProps>(
  (
    {
      className,
      variant,
      scale,
      shape,
      onFocus,
      onBlur,
      disabled,
      showClearIcon = "never",
      onClear,
      clearIconRender,
      ...restProps
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false)
    const [hovered, setHovered] = useState(false)

    const onInputFocus: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(true)
      onFocus?.(e)
    }

    const onInputBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(false)
      onBlur?.(e)
    }

    const onClearClick = () => {
      onClear?.()
    }

    const renderClearIcon = () => {
      const show = Boolean(
        showClearIcon === "always" ||
          (showClearIcon === "focus" && focused) ||
          (showClearIcon === "hover" && hovered) ||
          (showClearIcon === "not-empty" && restProps.value),
      )

      return (
        <button onClick={onClearClick}>
          {clearIconRender
            ? clearIconRender(show)
            : show && (
                <RiCloseLine
                  size={"1.2rem"}
                  className={
                    "z-input-clear-icon text-gray-400 bg-transparent ml-1 cursor-pointer hover:text-gray-500 active:text-gray-600"
                  }
                />
              )}
        </button>
      )
    }

    return (
      <div
        className={twclx([
          "flex items-center bg-white",
          disabled && "text-gray-800",
          !disabled && (focused ? "ring-1" : getHoverVariant(variant)),
          inputVariant({ variant, scale, shape, className }),
        ])}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <input
          ref={ref}
          className="flex-1"
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          disabled={disabled}
          {...restProps}
        />
        {renderClearIcon()}
      </div>
    )
  },
)

export default ZInput
