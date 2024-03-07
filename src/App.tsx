import { FC } from "react";
import Layout from "./layouts/Layout";
import { Provider } from "mobx-react";
import rootStore from "./store";
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
    <BrowserRouter>
      <Layout />
      <LoginDialog />
      <HolaDialog />
      <UserDialog />
      <ActiveDialog />
      <SearchDialog />
      <ZToastContainer />
    </BrowserRouter>
  </Provider>
}

export default App
