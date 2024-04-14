import { useStore } from "@/store"
import { FC, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import Content from "./components/Content"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ScrollToTop from "./components/ScrollToTop"
import { throttle } from "lodash"

const Layout: FC = () => {
  const location = useLocation()
  const { layoutStore } = useStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  const { updateLayoutState, updateLocationState, updateClickTrace, updateScrollTop } = layoutStore

  const onScroll = throttle(() => {
    if (scrollRef.current) {
      updateScrollTop(scrollRef.current.scrollTop)
    }
  }, 100)

  const onWindowStateChange = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const focus = document.hasFocus()
    updateLayoutState(width, height, focus)
  }

  const onWindowClick = (e: Event) => {
    const { target } = e
    if (target instanceof Element) {
      updateClickTrace(target)
    }
  }

  useEffect(() => {
    const listenEvents = [
      { name: "resize", handler: onWindowStateChange },
      { name: "blur", handler: onWindowStateChange },
      { name: "focus", handler: onWindowStateChange },
      { name: "click", handler: onWindowClick },
    ]
    listenEvents.forEach(({ name, handler }) => window.addEventListener(name, handler))
    updateLocationState(location)
    return () => {
      listenEvents.forEach(({ name, handler }) => window.removeEventListener(name, handler))
    }
  }, [location])

  return (
    <div className="flex flex-col bg-gray-50 bg-opacity-80 min-w-fit h-screen relative">
      <Header />
      <div ref={scrollRef} className="flex flex-col flex-1 items-center overflow-y-auto" onScroll={onScroll}>
        <Content />
        <Footer />
      </div>
      <ScrollToTop scrollRef={scrollRef} />
    </div>
  )
}

export default Layout
