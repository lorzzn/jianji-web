import { FC, useRef, useState } from "react";
import ZButton, { ZButtonProps } from "../ZButton/ZButton";
import { animate, } from 'framer-motion'
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect'

interface ConfirmAbleButtonProps {
  text?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onClick?: () => void;
  buttonProps?: ZButtonProps
}

const ConfirmAbleButton:FC<ConfirmAbleButtonProps> = (props) => {
  const [confirmed, setConfirmed] = useState(false)
  const textSpanRef = useRef<HTMLSpanElement>(null)

  const onButtonClick = () => {
    if (confirmed) {
      props.onConfirm?.()
      setConfirmed(false)
    } else {
      props.onClick?.()
      setConfirmed(true)
    }
  }

  useUpdateEffect(() => {
    if (textSpanRef.current) {
      animate(textSpanRef.current, { opacity: [ 0, 1 ] }, { duration: 0.3 })
    }
  }, [ confirmed ])

  return <ZButton variant={"primary_plain"} className="transition-all w-auto" onClick={onButtonClick} {...props.buttonProps}>
    <span ref={textSpanRef} >
      {confirmed ? props.confirmText : props.text}
    </span>
  </ZButton>
}

export default ConfirmAbleButton;
