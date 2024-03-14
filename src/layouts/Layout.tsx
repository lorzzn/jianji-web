import { useStore } from "@/store"
import { FC, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Content from "./components/Content"
import Footer from "./components/Footer"
import Header from "./components/Header"

const Layout: FC = () => {
  const location = useLocation()
  const { layoutStore } = useStore()
  const { updateLayoutState, updateLocationState, updateClickTrace } = layoutStore

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
    <div className="flex flex-col bg-gray-100 min-w-fit min-h-screen">
      <Header />
      <div className="flex flex-col flex-1 items-center overflow-y-auto">
        <Content />
        <Footer />
      </div>
    </div>
  )
}

export default Layout
