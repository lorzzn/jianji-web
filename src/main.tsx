import App from "@/App.tsx"
import "@/index.css"
import "rc-tree/assets/index.css"
import "react-contexify/ReactContexify.css"
import ReactDOM from "react-dom/client"
import "react-responsive-modal/styles.css"
import "url-search-params-polyfill"

export const reactRootElement = document.getElementById("root")!

ReactDOM.createRoot(reactRootElement).render(<App />)
