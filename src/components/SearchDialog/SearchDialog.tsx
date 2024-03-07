import { FC } from "react";
import ZModal from "../ZModal/ZModal";
import useDialog, { dialogNames } from "@/hooks/useDialog";

const SearchDialog:FC = () => {
  
  const { register } = useDialog(dialogNames.SearchDialog)

  return <ZModal
    ref={register}
  >
    Sousuo

  </ZModal>
}

export default SearchDialog
