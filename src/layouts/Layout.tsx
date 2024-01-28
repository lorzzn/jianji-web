import { FC } from "react"
import Sider from "./components/Sider"
import Content from "./components/Content"
import Footer from "./components/Footer"


const Layout:FC = () => {

  return (
    <div className="flex h-screen bg-gray-100">
      <Sider />
      <div className="flex flex-col flex-1 justify-center items-center overflow-y-auto">
        <Content />
        <Footer />
      </div>
      
    </div>
  )
}

export default Layout