import useUpdateEffect from "beautiful-react-hooks/useUpdateEffect"
import { animate } from "framer-motion"
import { FC, useRef, useState } from "react"
import ZButton, { ZButtonProps } from "../ZButton/ZButton"

interface ConfirmAbleButtonProps {
  text?: string
  confirmText?: string
  onConfirm?: (() => Promise<void>) | (() => void)
  onClick?: () => void
  buttonProps?: ZButtonProps
}

const ConfirmAbleButton: FC<ConfirmAbleButtonProps> = (props) => {
  const [confirmed, setConfirmed] = useState(false)
  const textSpanRef = useRef<HTMLSpanElement>(null)

  const onButtonClick = () => {
    if (confirmed) {
      const callFn = props.onConfirm?.()
      if (callFn?.finally) {
        callFn.finally(() => {
          setConfirmed(false)
        })
      } else {
        setConfirmed(false)
      }
    } else {
      props.onClick?.()
      setConfirmed(true)
    }
  }

  useUpdateEffect(() => {
    if (textSpanRef.current) {
      animate(textSpanRef.current, { opacity: [0, 1] }, { duration: 0.3 })
    }
  }, [confirmed])

  return (
    <ZButton
      variant={"primary_plain"}
      className="transition-all w-auto"
      onClick={onButtonClick}
      loadingSize={"1rem"}
      {...props.buttonProps}
    >
      <span ref={textSpanRef}>{confirmed ? props.confirmText : props.text}</span>
    </ZButton>
  )
}

export default ConfirmAbleButton
