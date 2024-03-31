import { apiCategories } from "@/api/categories"
import { ICategories } from "@/api/types/response/categories"
import errorHandler from "@/utils/errorHandler"
import { FC, useEffect, useState } from "react"
import CategoriesSelector from "./CategoriesSelector"

const ToolBar: FC = () => {
  const [categories, setCategories] = useState<ICategories[]>([])

  const getCategoriesList = async () => {
    try {
      const res = await apiCategories.list()
      setCategories(res.data.data)
    } catch (error) {
      errorHandler.handle(error)
    }
  }

  useEffect(() => {
    getCategoriesList()
  }, [])

  return (
    <div className="bg-white mb-2">
      <CategoriesSelector categories={categories} />
    </div>
  )
}

export default ToolBar
