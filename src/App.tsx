import { FC } from "react";
import Layout from "./layouts/Layout";
import { Provider } from "mobx-react";
import rootStore, { StoreContext } from "./store";
import LoginDialog from "./components/LoginDialog/LoginDialog";
import HolaDialog from "./components/HolaDialog/HolaDialog";
import UserDialog from "./components/UserDialog/UserDialog";
import ZToastContainer from "./components/ZToastContainer/ZToastContainer";
import ActiveDialog from "./components/ActiveDialog/ActiveDialog";
import SearchDialog from "./components/SearchDialog/SearchDialog";
import { BrowserRouter } from "react-router-dom";
import { injectStores } from '@mobx-devtools/tools';

injectStores({
  rootStore
})

const App:FC = () => {

  // Provider 供 inject 使用
  return <Provider rootStore={rootStore}>
    <StoreContext.Provider value={rootStore}>
      <BrowserRouter>
        <Layout />
        <LoginDialog />
        <HolaDialog />
        <UserDialog />
        <ActiveDialog />
        <SearchDialog />
        <ZToastContainer />
      </BrowserRouter>
    </StoreContext.Provider>
  </Provider>
}

export default App
