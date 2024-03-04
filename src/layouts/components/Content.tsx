import Active from "@/pages/Active"
import Home from "@/pages/Home"
import { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Content:FC = () => {

  return (
    <div className="h-full w-full flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/active" Component={Active} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Content
