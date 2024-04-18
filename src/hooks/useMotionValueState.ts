import { MotionValue, useMotionValue } from "framer-motion"
import { useEffect, useState } from "react"

type MotionValueState = [number | string, MotionValue]

export function useMotionValueState(initialValue: number | string): MotionValueState {
  const value = useMotionValue(initialValue)
  const [valueState, setValueState] = useState(value.get())

  useEffect(() => {
    value.on("change", setValueState)
  }, [])

  return [valueState, value]
}
