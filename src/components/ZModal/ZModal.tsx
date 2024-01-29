import classNames from "classnames"
import { observer } from "mobx-react"
import { ForwardRefRenderFunction, forwardRef, useImperativeHandle, useState } from "react"
import { Modal, ModalProps } from "react-responsive-modal"

export interface ZModalProps extends Omit<ModalProps, "open" | "onClose"> {
  title?: any
  onClose?: Function
  footer?: any
}

export interface ZModalRef {
  show: Function
  hide: Function
}

const ZModal:ForwardRefRenderFunction<ZModalRef, ZModalProps> = ({ onClose, title, children, footer, ...restProps }, ref) => {
  const [ open, setOpen ] = useState(false)

  const show = ():void => setOpen(true)
  const hide = ():void => {
    setOpen(false)
    onClose?.()
  }

  useImperativeHandle(ref, () => ({
    show,
    hide
  }))

  return <Modal
    open={open}
    onClose={hide}
    center
    classNames={{
      modal: classNames('w-1/3 h-1/4 rounded-lg')
    }}
    {...restProps}
  >
    <div className="w-full h-full flex flex-col">
      {title && <div className="text-xl font-semibold">{title}</div>}
      <div className="flex-1 w-full py-2">
        {children}
      </div>
      <div>
        {footer}
      </div>
    </div>
  </Modal>
}

export default observer(forwardRef(ZModal))
