import { FC } from "react"
import Content from "./components/Content"
import Footer from "./components/Footer"
import Header from "./components/Header"


const Layout:FC = () => {

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