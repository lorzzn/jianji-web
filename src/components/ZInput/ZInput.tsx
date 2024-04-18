import { twclx } from "@/utils/twclx"
import { RiCloseLine } from "@remixicon/react"
import { VariantProps } from "class-variance-authority"
import { FocusEventHandler, forwardRef, useState } from "react"
import { inputVariant } from "./variant"

export interface ZInputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariant> {
  showClearIcon?: "always" | "focus" | "never" | "hover" | "not-empty"
  clearIconRender?: (show?: boolean) => React.ReactNode
  onClear?: () => void
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
    const [focus, setFocus] = useState(false)
    const [hover, setHover] = useState(false)

    const onInputFocus: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocus(true)
      onFocus?.(e)
    }

    const onInputBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocus(false)
      onBlur?.(e)
    }

    const onClearClick = () => {
      onClear?.()
    }

    const renderClearIcon = () => {
      const show = Boolean(
        showClearIcon === "always" ||
          (showClearIcon === "focus" && focus) ||
          (showClearIcon === "hover" && hover) ||
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
                    "z-input-clear-icon text-gray-400 bg-transparent cursor-pointer hover:text-gray-500 active:text-gray-600"
                  }
                />
              )}
        </button>
      )
    }

    return (
      <div
        className={twclx([
          "flex items-center bg-white overflow-hidden",
          { "is-focus": focus },
          { "is-hover": hover },
          { "is-disabled": disabled },
          inputVariant({ variant, scale, shape, className }),
        ])}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <input
          ref={ref}
          className="flex-1 bg-transparent w-full"
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
