import { useStore } from "@/store"
import { observer } from "mobx-react"
import { FC, useEffect } from "react"
import CategoriesSelector, { CategoriesSelectorProps } from "./CategoriesSelector"

const ToolBar: FC = observer(() => {
  const { postStore } = useStore()
  const { categories, categoriesLoading, getCategories, updateCategories, setSelectedCategory } = postStore

  useEffect(() => {
    getCategories()
  }, [])

  const onCategoriesSelected: CategoriesSelectorProps["onSelect"] = (_, category) => {
    setSelectedCategory(category)
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
