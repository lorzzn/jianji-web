import { createContext, useContext } from "react"
import { useZTooltip } from "./useZTooltip"

type ContextType = ReturnType<typeof useZTooltip> | null

export const ZTooltipContext = createContext<ContextType>(null)

export const useZTooltipContext = () => {
  const context = useContext(ZTooltipContext)

  if (context == null) {
    throw new Error("ZTooltip components must be wrapped in <ZTooltip />")
  }

  return context
}
