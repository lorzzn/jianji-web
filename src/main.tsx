import App from "@/App.tsx"
import "@/index.scss"
import "rc-tree/assets/index.css"
import ReactDOM from "react-dom/client"
import "react-responsive-modal/styles.css"
import "url-search-params-polyfill"

// highlight.js
import "highlight.js/scss/default.scss"
import "highlight.js/styles/github-dark-dimmed.min.css"

export const reactRootElement = document.getElementById("root")!

ReactDOM.createRoot(reactRootElement).render(<App />)
