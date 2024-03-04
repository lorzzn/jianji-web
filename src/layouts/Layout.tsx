import { FC } from "react"
// import Sider from "./components/Sider"
import Content from "./components/Content"
import Footer from "./components/Footer"
import Header from "./components/Header"


const Layout:FC = () => {

  return (
    <div className="flex flex-col h-screen bg-gray-100 min-w-fit">
      {/* <Sider /> */}
      <Header />
      <div className="flex flex-col flex-1 justify-center items-center overflow-y-auto">
        <Content />
        <Footer />
      </div>
      
    </div>
  )
}

export default Layout