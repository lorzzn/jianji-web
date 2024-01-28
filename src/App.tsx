import { FC } from "react";
import Layout from "./layouts/Layout";
import { Provider } from "mobx-react";
import rootStore from "./store";
import LoginDialog from "./components/LoginDialog/LoginDialog";

const App:FC = () => {

  // Provider 供 inject 使用
  return <Provider rootStore={rootStore}>
    <Layout />
    
    <LoginDialog />
  </Provider>
}

export default App
