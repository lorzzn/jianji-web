import { useStore } from "@/store"
import eventBus, { events } from "@/utils/eventBus"
import { RiArrowUpDoubleLine } from "@remixicon/react"
import { motion } from "framer-motion"
import { observer } from "mobx-react"
import { FC, useEffect } from "react"

interface ScrollToTopProps {}

const ScrollToTop: FC<ScrollToTopProps> = observer(() => {
  const { layoutStore } = useStore()
  const { scrollTop } = layoutStore

  const scrollWindowToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    eventBus.on(events.ScrollToTop, scrollWindowToTop)
  }, [])

  return (
    <motion.div
      className="fixed right-10 bottom-10 bg-white rounded-full shadow-lg p-2 cursor-pointer hover:bg-gray-100"
      variants={{
        hidden: {
          opacity: 0,
          y: 100,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      animate={scrollTop > 1200 ? "visible" : "hidden"}
      onClick={scrollWindowToTop}
    >
      <RiArrowUpDoubleLine />
    </motion.div>
  )
})

export default ScrollToTop
