import { FC, useEffect } from "react"
import Content from "./components/Content"
import Footer from "./components/Footer"
import Header from "./components/Header"
import rootStore from "@/store"
import { useLocation } from "react-router-dom"

const Layout:FC = () => {

  const location = useLocation()
  const updateLayoutState = rootStore.layoutStore.updateLayoutState
  const updateLocationState = rootStore.layoutStore.updateLocationState

  const onWindowStateChange = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const focus = document.hasFocus()
    updateLayoutState(width, height, focus)
  }

  useEffect(() => {
    const listenEvents = [
      "resize", 
      "blur", 
      "focus", 
    ]
    listenEvents.forEach(eventName => window.addEventListener(eventName, onWindowStateChange))
    updateLocationState(location)
    return () => {
      listenEvents.forEach(eventName => window.removeEventListener(eventName, onWindowStateChange))
    }
  }, [ location ])

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
