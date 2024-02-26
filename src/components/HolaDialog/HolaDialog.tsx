import { FC } from "react";
import ZModal from "../ZModal/ZModal";
import useDialog, { dialogNames } from "@/hooks/useDialog";

const HolaDialog:FC = () => {

  const { register } = useDialog(dialogNames.HolaDialog)

  return <ZModal
    ref={register}
    title={"欢迎你"}
  >
    耶耶耶耶耶
  </ZModal>
}

export default HolaDialog
