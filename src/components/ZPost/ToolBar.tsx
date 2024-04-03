import { useStore } from "@/store"
import { observer } from "mobx-react"
import { FC, useEffect } from "react"
import CategoriesSelector, { CategoriesSelectorProps } from "./CategoriesSelector"

const ToolBar: FC = observer(() => {
  const { postStore } = useStore()
  const { categories, categoriesLoading, getCategories, updateCategories } = postStore

  useEffect(() => {
    getCategories()
  }, [])

  const onCategoriesSelected: CategoriesSelectorProps["onSelect"] = (selectedKeys, info) => {
    console.log(selectedKeys)
    console.log(info)
  }

  return (
    <div className="bg-white mb-2">
      <CategoriesSelector
        loading={categoriesLoading}
        categories={categories}
        onUpdate={updateCategories}
        onSelect={onCategoriesSelected}
      />
    </div>
  )
})

export default ToolBar
