import { FC } from "react";
import Layout from "./layouts/Layout";
import { Provider } from "mobx-react";
import rootStore from "./store";
import LoginDialog from "./components/LoginDialog/LoginDialog";
import HolaDialog from "./components/HolaDialog/HolaDialog";

const App:FC = () => {

  // Provider 供 inject 使用
  return <Provider rootStore={rootStore}>
    <Layout />
    
    {/* 注册弹窗 */}
    <LoginDialog />
    <HolaDialog />
  </Provider>
}

export default App
