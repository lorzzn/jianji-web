import { useParams } from "react-router-dom";
import Base from "../Home/Base";

const Tag = () => {

  const { tagValue } = useParams()

  return <Base extraParams={{
    tagValues: [ Number(tagValue) ],
    archived: undefined
  }} />
}

export default Tag
