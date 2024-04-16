import { useStore } from "@/store"
import eventBus from "@/utils/eventBus"
import { RiArrowUpDoubleLine } from "@remixicon/react"
import { motion } from "framer-motion"
import { observer } from "mobx-react"
import { FC, RefObject, useEffect } from "react"

interface ScrollToTopProps {
  scrollRef: RefObject<Element>
}

const ScrollToTop: FC<ScrollToTopProps> = observer(({ scrollRef }) => {
  const { layoutStore } = useStore()
  const { scrollTop } = layoutStore

  const scrollElementToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    eventBus.on("scrolltotop", scrollElementToTop)
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
      onClick={scrollElementToTop}
    >
      <RiArrowUpDoubleLine />
    </motion.div>
  )
})

export default ScrollToTop
