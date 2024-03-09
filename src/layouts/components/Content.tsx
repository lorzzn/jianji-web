import Active from "@/pages/Active"
import Archives from "@/pages/Archives"
import Categories from "@/pages/Categories"
import Favlist from "@/pages/Favlist"
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Tags from "@/pages/Tags"
import { FC } from "react"
import { Route, Routes } from "react-router-dom"

const Content:FC = () => {

  return (
    <div className="flex flex-col flex-1 w-full">
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/active" Component={Active} />
        <Route path="/archives" Component={Archives} />
        <Route path="/favlist" Component={Favlist} />
        <Route path="/categories" Component={Categories} />
        <Route path="/tags" Component={Tags} />
        <Route path="/search" Component={Search} />
      </Routes>
    </div>
  )
}

export default Content
