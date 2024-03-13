import { FC } from "react"
import { Slide, ToastContainer, ToastContainerProps } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

interface ZToastContainerProps extends ToastContainerProps {}

const ZToastContainer:FC<ZToastContainerProps> = ({ ...restProps }) => {

  return <ToastContainer 
    transition={Slide}
    position="top-right"
    autoClose={3000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick={false}
    pauseOnFocusLoss={false}
    pauseOnHover={false}
    theme="light"
    {...restProps}
  />
}

export default ZToastContainer
