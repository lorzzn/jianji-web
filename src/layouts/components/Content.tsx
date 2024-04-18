import { FC, Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import RequireAuth from "./RequireAuth"

const Active = lazy(() => import("@/pages/Active"))
const Archives = lazy(() => import("@/pages/Archives"))
const Categories = lazy(() => import("@/pages/Categories"))
const Category = lazy(() => import("@/pages/Category"))
const Edit = lazy(() => import("@/pages/Edit"))
const Post = lazy(() => import("@/pages/Post"))
const Favlist = lazy(() => import("@/pages/Favlist"))
const Home = lazy(() => import("@/pages/Home"))
const Search = lazy(() => import("@/pages/Search"))
const Tags = lazy(() => import("@/pages/Tags"))
const Tag = lazy(() => import("@/pages/Tag"))
const Login = lazy(() => import("@/pages/Login"))
const Tos = lazy(() => import("@/pages/Tos"))

const NotFoundPage = lazy(() => import("@/pages/BadStatus/404"))
const ServerErrorPage = lazy(() => import("@/pages/BadStatus/500"))

const Content: FC = () => {
  return (
    <div className="flex flex-col flex-1 w-full">
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path="/active" element={<Active />} />
          <Route
            path="/archives"
            element={
              <RequireAuth>
                <Archives />
              </RequireAuth>
            }
          />
          <Route
            path="/favlist"
            element={
              <RequireAuth>
                <Favlist />
              </RequireAuth>
            }
          />
          <Route
            path="/categories"
            element={
              <RequireAuth>
                <Categories />
              </RequireAuth>
            }
          />
          <Route
            path="/tags"
            element={
              <RequireAuth>
                <Tags />
              </RequireAuth>
            }
          />
          <Route path="/login" Component={Login} />
          <Route path="/tos" Component={Tos} />
          <Route
            path="/search"
            element={
              <RequireAuth>
                <Search />
              </RequireAuth>
            }
          />
          <Route
            path="/edit/:uuid?"
            element={
              <RequireAuth>
                <Edit />
              </RequireAuth>
            }
          />
          <Route
            path="/post/:uuid?"
            element={
              <RequireAuth>
                <Post />
              </RequireAuth>
            }
          />
          <Route
            path="/tag/:tagValue"
            element={
              <RequireAuth>
                <Tag />
              </RequireAuth>
            }
          />
          <Route
            path="/category/:categoryValue"
            element={
              <RequireAuth>
                <Category />
              </RequireAuth>
            }
          />

          <Route path="/404" Component={NotFoundPage} />
          <Route path="/500" Component={ServerErrorPage} />
          <Route path="*" element={<Navigate replace to={"/404"} />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default Content
