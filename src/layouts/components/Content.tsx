import { FC, Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import RequireAuth from "./RequireAuth"

const Active = lazy(() => import("@/pages/Active"))
const Archives = lazy(() => import("@/pages/Archives"))
const Categories = lazy(() => import("@/pages/Categories"))
const Edit = lazy(() => import("@/pages/Edit"))
const Post = lazy(() => import("@/pages/Post"))
const Favlist = lazy(() => import("@/pages/Favlist"))
const Home = lazy(() => import("@/pages/Home"))
const Search = lazy(() => import("@/pages/Search"))
const Tags = lazy(() => import("@/pages/Tags"))
const Login = lazy(() => import("@/pages/Login"))

const NotFoundPage = lazy(() => import("@/pages/BadStatus/404"))
const ServerErrorPage = lazy(() => import("@/pages/BadStatus/500"))

const Content: FC = () => {
  return (
    <div className="flex flex-col flex-1 w-full">
      <Suspense>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/active" Component={Active} />
          <Route path="/archives" Component={Archives} />
          <Route path="/favlist" Component={Favlist} />
          <Route path="/categories" Component={Categories} />
          <Route path="/tags" Component={Tags} />
          <Route path="/login" Component={Login} />
          <Route path="/search" Component={Search} />
          <Route
            path="/edit/:uuid?"
            element={
              <RequireAuth>
                <Edit />
              </RequireAuth>
            }
          />
          <Route path="/post/:uuid?" Component={Post} />

          <Route path="/404" Component={NotFoundPage} />
          <Route path="/500" Component={ServerErrorPage} />
          <Route path="*" element={<Navigate replace to={"/404"} />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default Content
