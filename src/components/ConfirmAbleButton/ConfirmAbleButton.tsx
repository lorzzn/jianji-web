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
  const [firstClicked, setFirstClicked] = useState(false)
  const textSpanRef = useRef<HTMLSpanElement>(null)

  const onButtonClick = () => {
    if (firstClicked) {
      const callFn = props.onConfirm?.()
      if (callFn?.finally) {
        callFn.finally(() => {
          setFirstClicked(false)
        })
      } else {
        setFirstClicked(false)
      }
    } else {
      props.onClick?.()
      setFirstClicked(true)
    }
  }

  useUpdateEffect(() => {
    if (textSpanRef.current) {
      animate(textSpanRef.current, { opacity: [0, 1] }, { duration: 0.3 })
    }
  }, [firstClicked])

  const resetFirstClickedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onMouseEnter: ZButtonProps["onMouseEnter"] = (e) => {
    if (resetFirstClickedTimer.current) {
      clearTimeout(resetFirstClickedTimer.current)
    }
    props.buttonProps?.onMouseEnter?.(e)
  }

  const onMouseLeave: ZButtonProps["onMouseLeave"] = (e) => {
    resetFirstClickedTimer.current = setTimeout(() => {
      setFirstClicked(false)
    }, 1500)
    props.buttonProps?.onMouseLeave?.(e)
  }

  return (
    <ZButton
      variant={"primary_plain"}
      className="transition-all w-auto"
      onClick={onButtonClick}
      loadingSize={"1rem"}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      {...props.buttonProps}
    >
      <span ref={textSpanRef}>{firstClicked ? props.confirmText : props.text}</span>
    </ZButton>
  )
}

export default ConfirmAbleButton
