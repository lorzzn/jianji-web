import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";
import ZButton, { ZButtonVariants } from "../ZButton/ZButton";
import { VariantProps } from "class-variance-authority";
import ZModal, { ZModalRef } from "../ZModal/ZModal";
import { twclx } from "@/utils/twclx";

export interface ZModalBoxButton extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ZButtonVariants> {
}

export interface ZModalBoxProps {
  buttons?: ZModalBoxButton[]
  title?: ReactNode
  children?: ReactNode
}

const ZModalBox = forwardRef<ZModalRef, ZModalBoxProps>((props, ref) => {
  
  const modalRef = useRef<ZModalRef>(null)

  useImperativeHandle(ref, () => ({
    show: () => {
      modalRef.current?.show()
    },
    hide: () => {
      modalRef.current?.hide()
    },
  }))

  return <ZModal
    ref={modalRef}
    title={props.title}
    classNames={{
      modal: twclx([
        " min-h-unset rounded-lg min-w-96"
      ]),
      footer: twclx([
        " flex flex-row justify-end space-x-2"
      ])
    }}
    footer={
      <>
        {
          props.buttons?.map(button => (
            <ZButton
              {...button}
            >
              {button.children}
            </ZButton>
          ))
        }
      </>
    }
  >
    <div className="min-h-12">{props.children}</div>
  </ZModal>
})

export default ZModalBox
