import Active from "@/pages/Active"
import Archives from "@/pages/Archives"
import Categories from "@/pages/Categories"
import Favlist from "@/pages/Favlist"
import Home from "@/pages/Home"
import Tags from "@/pages/Tags"
import { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Content:FC = () => {

  return (
    <div className="h-full w-full flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/active" Component={Active} />
          <Route path="/archives" Component={Archives} />
          <Route path="/favlist" Component={Favlist} />
          <Route path="/categories" Component={Categories} />
          <Route path="/tags" Component={Tags} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Content
