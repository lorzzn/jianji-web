import { FC } from "react";
import Layout from "./layouts/Layout";
import { Provider } from "mobx-react";
import rootStore from "./store";
import LoginDialog from "./components/LoginDialog/LoginDialog";
import HolaDialog from "./components/HolaDialog/HolaDialog";
import UserDialog from "./components/UserDialog/UserDialog";

const App:FC = () => {

  // Provider 供 inject 使用
  return <Provider rootStore={rootStore}>
    <Layout />
    
    {/* 注册登录弹窗 */}
    <LoginDialog />
    {/* 欢迎新注册用户弹窗 */}
    <HolaDialog />
    {/* 用户信息弹窗 */}
    <UserDialog />

  </Provider>
}

export default App
