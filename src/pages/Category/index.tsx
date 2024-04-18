import { useParams } from "react-router-dom"
import Base from "../Home/Base"

const Category = () => {
  const { categoryValue } = useParams()

  return (
    <Base
      extraParams={{
        categoryValue: Number(categoryValue),
      }}
    />
  )
}

export default Category
