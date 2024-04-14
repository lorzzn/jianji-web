import { css } from "@emotion/css"
import type { Placement } from "@floating-ui/react"
import { FloatingPortal, useMergeRefs } from "@floating-ui/react"
import classNames from "classnames"
import { HTMLProps, ReactNode, cloneElement, forwardRef, isValidElement } from "react"
import tw from "twin.macro"
import { useZTooltip } from "./hooks/useZTooltip"
import { ZTooltipContext, useZTooltipContext } from "./hooks/useZTooltipContext"

const TooltipCSS = css`
  ${tw`w-max bg-black bg-opacity-80 text-white text-sm px-2 py-1 rounded z-[1000]`}
`

export interface ZTooltipOptions {
  initialOpen?: boolean
  placement?: Placement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ZTooltip({ children, ...options }: { children: ReactNode } & ZTooltipOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const ZTooltip = useZTooltip(options)
  return <ZTooltipContext.Provider value={ZTooltip}>{children}</ZTooltipContext.Provider>
}

export const ZTooltipTrigger = forwardRef<HTMLElement, HTMLProps<HTMLElement> & { asChild?: boolean }>(
  function ZTooltipTrigger({ children, asChild = false, ...props }, propRef) {
    const context = useZTooltipContext()
    const childrenRef = (children as any).ref
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

    // `asChild` allows the user to pass any element as the anchor
    if (asChild && isValidElement(children)) {
      return cloneElement(
        children,
        context.getReferenceProps({
          ref,
          ...props,
          ...children.props,
          "data-state": context.open ? "open" : "closed",
        }),
      )
    }

    return (
      <button
        ref={ref}
        // The user can style the trigger based on the state
        data-state={context.open ? "open" : "closed"}
        {...context.getReferenceProps(props)}
      >
        {children}
      </button>
    )
  },
)

export const ZTooltipContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function ZTooltipContent(
  { style, ...props },
  propRef,
) {
  const context = useZTooltipContext()
  const ref = useMergeRefs([context.refs.setFloating, propRef])

  if (!context.open) return null

  return (
    <FloatingPortal>
      <div
        ref={ref}
        style={{
          ...context.floatingStyles,
          ...style,
        }}
        {...context.getFloatingProps(props)}
        className={classNames([TooltipCSS, context.getFloatingProps(props)?.className])}
      />
    </FloatingPortal>
  )
})
