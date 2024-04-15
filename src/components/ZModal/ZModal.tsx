import useScrollLocker from "@/components/ZModal/hooks/useScrollLocker"
import classNames from "classnames"
import { observer } from "mobx-react"
import canUseDom from "rc-util/lib/Dom/canUseDom"
import { forwardRef, useImperativeHandle, useState } from "react"
import { Modal, ModalProps } from "react-responsive-modal"

export interface ZModalProps extends Omit<ModalProps, "open" | "onClose" | "classNames"> {
  title?: any
  titleAlignCenter?: boolean
  onClose?: () => void
  footer?: any
  classNames?: ModalProps["classNames"] & {
    footer?: string
  }
}

export interface ZModalRef {
  show: () => void
  hide: () => void
  open: boolean
}

const ZModal = observer(
  forwardRef<ZModalRef, ZModalProps>(
    (
      {
        onClose,
        title,
        titleAlignCenter,
        children,
        footer,
        blockScroll = true,
        classNames: propClassNames,
        ...restProps
      },
      ref,
    ) => {
      const [open, setOpen] = useState(false)

      const show = (): void => setOpen(true)
      const hide = (): void => {
        setOpen(false)
        onClose?.()
      }

      useScrollLocker(blockScroll && open && canUseDom())

      useImperativeHandle(ref, () => ({
        show,
        hide,
        open,
      }))

      return (
        <Modal
          open={open}
          onClose={hide}
          center
          classNames={{
            modal: classNames("min-w-96 min-h-52 rounded-lg"),
            ...propClassNames,
          }}
          blockScroll={false}
          {...restProps}
        >
          <div className="w-full h-full flex flex-col">
            {title && (
              <div className={classNames(["text-xl font-semibold", { "text-center": titleAlignCenter }])}>{title}</div>
            )}
            <div className="flex-1 w-full py-2">{children}</div>
            <div className={propClassNames?.footer}>{footer}</div>
          </div>
        </Modal>
      )
    },
  ),
)

export default ZModal
