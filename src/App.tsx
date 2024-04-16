import { injectStores } from "@mobx-devtools/tools"
import { Provider } from "mobx-react"
import { FC } from "react"
import { BrowserRouter } from "react-router-dom"
import ActiveDialog from "./components/ActiveDialog/ActiveDialog"
import HolaDialog from "./components/HolaDialog/HolaDialog"
import LoginDialog from "./components/LoginDialog/LoginDialog"
import TagManagerDialog from "./components/TagManagerDialog/TagManagerDialog"
import UserDialog from "./components/UserDialog/UserDialog"
import ZToastContainer from "./components/ZToastContainer/ZToastContainer"
import Layout from "./layouts/Layout"
import rootStore, { StoreContext } from "./store"

injectStores({
  rootStore,
})

const App: FC = () => {
  // Provider 供 inject 使用
  return (
    <Provider rootStore={rootStore}>
      <StoreContext.Provider value={rootStore}>
        <BrowserRouter>
          <Layout />

          <LoginDialog />
          <HolaDialog />
          <UserDialog />
          <ActiveDialog />
          <TagManagerDialog />

          <ZToastContainer />
        </BrowserRouter>
      </StoreContext.Provider>
    </Provider>
  )
}

export default App
