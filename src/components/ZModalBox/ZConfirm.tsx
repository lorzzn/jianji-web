import { forwardRef } from "react";
import ZModalBox, { ZModalBoxProps } from "./ZModalBox"
import { ZModalRef } from "../ZModal/ZModal";

export interface ZConfirmProps extends ZModalBoxProps {
  onOk?: () => void;
  onCancel?: () => void;
}

const ZConfirm = forwardRef<ZModalRef, ZConfirmProps>((props, ref) => {

  return <ZModalBox
    ref={ref}
    title={props.title}
    buttons={[
      {
        children: "确定",
        onClick: () => props.onOk?.()
      },
      {
        children: "取消",
        variant: "primary_plain",
        onClick: () => props.onCancel?.()
      }
    ]}
  >{props.children}</ZModalBox>
})


export default ZConfirm
