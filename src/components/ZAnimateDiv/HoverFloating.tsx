import { HTMLMotionProps, motion } from 'framer-motion'
import { FC, PropsWithChildren } from 'react'

export interface HoverFloatingProps extends PropsWithChildren<HTMLMotionProps<"div">> {
  offset?: number
}

const HoverFloating:FC<HoverFloatingProps> = ({
  offset = -2,
  ...props
}) => {
  
  return <motion.div
    whileHover={{ transform: `translateY(${offset}px)` }}
    {...props}
  />
}

export default HoverFloating
