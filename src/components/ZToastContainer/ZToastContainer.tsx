import { FC } from "react"
import { ToastContainer, ToastContainerProps } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

interface ZToastContainerProps extends ToastContainerProps {}


const ZToastContainer:FC<ZToastContainerProps> = ({ ...restProps }) => {

  return <ToastContainer 
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    {...restProps}
  />
}

export default ZToastContainer
