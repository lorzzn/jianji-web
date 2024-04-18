import { twclx } from "@/utils/twclx"
import useDidMount from "beautiful-react-hooks/useDidMount"
import { VariantProps } from "class-variance-authority"
import { forwardRef, useImperativeHandle, useRef } from "react"
import ZButton, { ZButtonVariants } from "../ZButton/ZButton"
import ZModal, { ZModalProps, ZModalRef } from "../ZModal/ZModal"

export interface ZMessageBoxButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ZButtonVariants> {}

export interface ZMessageBoxProps extends Omit<ZModalProps, "footer" | "children" | "onAnimationEnd"> {
  buttons?: ZMessageBoxButton[]
  content?: React.ReactNode
  autoShow?: boolean
  onModalAnimationEnd?: (state: { open?: boolean }) => void
}

export interface ZMessageBoxRef {
  show: () => void
  hide: () => void
}

const ZMessageBox = forwardRef<ZMessageBoxRef, ZMessageBoxProps>((props, ref) => {
  const modalRef = useRef<ZModalRef>(null)

  const show = () => {
    modalRef.current?.show()
    return modalRef
  }

  const hide = () => {
    modalRef.current?.hide()
  }

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }))

  useDidMount(() => {
    if (props.autoShow) {
      modalRef.current?.show()
    }
  })

  const footerRenderer = () => {
    return (
      <>
        {props.buttons?.map((button, index) => (
          <ZButton {...button} key={index}>
            {button.children}
          </ZButton>
        ))}
      </>
    )
  }

  const onModalAnimationEnd = () => {
    props.onModalAnimationEnd?.({ open: modalRef.current?.open })
  }

  return (
    <ZModal
      ref={modalRef}
      classNames={{
        modal: twclx(["min-h-unset rounded-lg !max-w-96"]),
        footer: twclx([" flex flex-row justify-end space-x-2 pt-3"]),
      }}
      {...props}
      onAnimationEnd={onModalAnimationEnd}
      footer={footerRenderer()}
    >
      {props.content}
    </ZModal>
  )
})

export default ZMessageBox
