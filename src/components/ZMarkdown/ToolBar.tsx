import { apiCategories } from "@/api/categories"
import { ICategories } from "@/api/types/response/categories"
import errorHandler from "@/utils/errorHandler"
import { assign, clone } from "lodash"
import { FC, useEffect, useState } from "react"
import CategoriesSelector, { CategoriesSelectorProps } from "./CategoriesSelector"

const ToolBar: FC = () => {
  const [categories, setCategories] = useState<ICategories[]>([])
  const [loading, setLoading] = useState(false)

  const getCategoriesList = async () => {
    setLoading(true)
    try {
      const res = await apiCategories.list()
      setCategories(res.data.data)
    } catch (error) {
      errorHandler.handle(error)
    }
    setLoading(false)
  }

  const onCategoriesUpdate = async (data: ICategories[]) => {
    setLoading(true)
    try {
      const res = await apiCategories.update({ data })
      res.data.data.forEach((item) => {
        const target = categories.find((c) => c.value === item.value)
        if (!target) {
          categories.push(item)
        } else {
          assign(target, item)
        }
      })
      setCategories(clone(categories))
    } catch (error) {
      errorHandler.handle(error)
    }
    setLoading(false)
  }

  const onCategoriesSelected: CategoriesSelectorProps["onSelect"] = (selectedKeys, info) => {
    console.log(selectedKeys)
    console.log(info)
  }

  useEffect(() => {
    getCategoriesList()
  }, [])

  return (
    <div className="bg-white mb-2">
      <CategoriesSelector
        loading={loading}
        categories={categories}
        onUpdate={onCategoriesUpdate}
        onSelect={onCategoriesSelected}
      />
    </div>
  )
}

export default ToolBar
