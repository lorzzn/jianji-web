import { Transition, motion } from "framer-motion"
import { FC, ReactNode } from "react"

interface ZLoadingContentProps {
  children: ReactNode
  loading?: boolean
  motionTransition?: Transition
}

const ZLoadingContent: FC<ZLoadingContentProps> = ({
  children,
  loading = true,
  motionTransition = {
    duration: 1.5,
    ease: "easeInOut",
    times: [0, 0.2, 0.5, 0.8, 1],
    repeat: Infinity,
    repeatDelay: 0.3,
  },
}) => {
  return (
    <div className="relative w-full h-full">
      {children}
      {loading && (
        <>
          <div className="absolute inset-0 bg-white bg-opacity-50"></div>
          <div className="absolute -top-2 w-full h-2 bg-blue-100 overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-0 bg-blue-500 w-full rounded-full"
              animate={{
                marginLeft: ["-100%", "100%"],
                transform: ["scaleX(1)", "scaleX(0)"],
              }}
              transition={motionTransition}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ZLoadingContent
