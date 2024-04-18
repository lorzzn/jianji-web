import { uuidjs } from "@/utils/uuid"
import { values } from "lodash"
import { PropsWithChildren, createContext, useEffect, useRef, useState } from "react"
import ZMessageBox, { ZMessageBoxProps, ZMessageBoxRef } from "./ZMessageBox"

type AlertProps = Omit<ZMessageBoxProps, "ref" | "onModalAnimationEnd" | "autoShow"> & {
  okText?: string
  onOk?: () => void
}

type ConfirmProps = AlertProps & {
  cancelText?: string
  onCancel?: () => void
}

interface ZMessageBoxContext {
  showModal: (props: ZMessageBoxProps, uuid: string) => void
  showAlert: (props: AlertProps) => void
  showConfirm: (props: ConfirmProps) => void
  hideMessageBoxByUUID: (uuid: string) => void
}

export const ZMessageBoxContext = createContext<ZMessageBoxContext>({
  showModal: () => {},
  showAlert: () => {},
  showConfirm: () => {},
  hideMessageBoxByUUID: () => {},
})

const ZMessageBoxContainer = (props: PropsWithChildren) => {
  const [modals, setModals] = useState<Record<string, React.ReactNode>>()
  const [modalRefs, setModalRefs] = useState<Record<string, ZMessageBoxRef>>()
  const modalsRealValue = useRef(modals)
  const modalRefsRealValue = useRef(modalRefs)

  useEffect(() => {
    modalsRealValue.current = modals
    modalRefsRealValue.current = modalRefs
  }, [modals, modalRefs])

  const showModal = (props: ZMessageBoxProps, uuid: string) => {
    const modalBoxProps = props as ZMessageBoxProps
    uuid = uuid || uuidjs.v4()

    setModals((prev) => ({
      ...prev,
      [uuid]: (
        <ZMessageBox
          {...modalBoxProps}
          autoShow
          key={uuid}
          ref={(e) => {
            if (e) {
              setModalRefs((prev) => {
                return {
                  ...prev,
                  [uuid]: e,
                }
              })
            }
          }}
          onModalAnimationEnd={({ open }) => {
            if (!open) {
              setModals((prev) => {
                const value = { ...prev }
                delete value[uuid]
                return value
              })
              setModalRefs((prev) => {
                const value = { ...prev }
                delete value[uuid]
                return value
              })
            }
          }}
          onClose={() => {
            modalBoxProps.onClose?.()
          }}
        />
      ),
    }))
  }

  const showAlert = (props: AlertProps) => {
    const uuid = uuidjs.v4()

    showModal(
      {
        ...props,
        buttons: [
          {
            children: props.okText || "确定",
            onClick: () => {
              props.onOk?.()
              modalRefs?.[uuid]?.hide()
            },
          },
        ],
      },
      uuid,
    )
  }

  const showConfirm = (props: ConfirmProps) => {
    const uuid = uuidjs.v4()

    showModal(
      {
        ...props,
        buttons: [
          {
            children: props.okText || "确定",
            onClick: () => {
              props.onOk?.()
              hideMessageBoxByUUID(uuid)
            },
          },
          {
            children: props.cancelText || "取消",
            variant: "normal",
            onClick: () => {
              props.onCancel?.()
              hideMessageBoxByUUID(uuid)
            },
          },
        ],
      },
      uuid,
    )
  }

  const hideMessageBoxByUUID = (uuid: string) => {
    modalRefsRealValue.current?.[uuid]?.hide()
  }

  return (
    <ZMessageBoxContext.Provider value={{ showModal, showAlert, showConfirm, hideMessageBoxByUUID }}>
      {props.children}
      {values(modals)}
    </ZMessageBoxContext.Provider>
  )
}

export default ZMessageBoxContainer
