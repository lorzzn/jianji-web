import { observer } from "mobx-react"
import { FC, useImperativeHandle, useState } from "react"
import { Modal, ModalProps } from "react-responsive-modal"

export interface UniDialogProps extends Omit<ModalProps, "open"> {
  name: string
}

const UniDialog:FC<UniDialogProps> = (props, ref) => {
  const [ open, setOpen ] = useState(false)

  const show = ():void => setOpen(true)
  const hide = ():void => setOpen(false)

  useImperativeHandle(ref, () => ({
    show,
    hide
  }))

  return <Modal
    open={open}
    {...props}
  />
}

export default observer(UniDialog)
