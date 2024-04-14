import { forwardRef } from "react";
import ZModalBox, { ZModalBoxProps } from "./ZModalBox"
import { ZModalRef } from "../ZModal/ZModal";

export interface ZAlertProps extends ZModalBoxProps {
  onOk?: () => void;
}

const ZAlert = forwardRef<ZModalRef, ZAlertProps>((props, ref) => {

  return <ZModalBox
    ref={ref}
    title={props.title}
    buttons={[
      {
        children: "确定",
        onClick: () => props.onOk?.()
      }
    ]}
  >
    {props.children}
  </ZModalBox>
})


export default ZAlert
