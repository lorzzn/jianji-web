import { useStore } from "@/store"
import useWindowScroll from "beautiful-react-hooks/useWindowScroll"
import { FC, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Content from "./components/Content"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ScrollToTop from "./components/ScrollToTop"

const Layout: FC = () => {
  const location = useLocation()
  const { layoutStore } = useStore()
  const onWindowScroll = useWindowScroll()
  const { updateLayoutState, updateLocationState, updateClickTrace, updateScrollTop } = layoutStore

  onWindowScroll(() => {
    updateScrollTop(window.scrollY)
  })

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
    onWindowStateChange()
    return () => {
      listenEvents.forEach(({ name, handler }) => window.removeEventListener(name, handler))
    }
  }, [])

  useEffect(() => {
    updateLocationState(location)
  }, [location])

  return (
    <div className="flex flex-col bg-gray-50 bg-opacity-80 min-w-fit min-h-screen relative">
      <Header />
      <div className="flex flex-col flex-1 items-center overflow-y-auto">
        <Content />
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  )
}

export default Layout
