import { useStore } from "@/store"
import { observer } from "mobx-react"
import { FC, useEffect } from "react"
import CategoriesSelector, { CategoriesSelectorProps } from "./CategoriesSelector"

const ToolBar: FC = observer(() => {
  const { postStore } = useStore()
  const { categories, categoriesLoading, getCategories, category, setCategory, updateCategories, createCategories } =
    postStore

  useEffect(() => {
    getCategories()
  }, [])

  const onCategoriesSelected: CategoriesSelectorProps["onSelect"] = (_, category) => {
    setCategory(category)
  }

  return (
    <div className="bg-white mb-2">
      <CategoriesSelector
        loading={categoriesLoading}
        categories={categories}
        selectedCategory={category}
        onUpdate={updateCategories}
        onCreate={createCategories}
        onSelect={onCategoriesSelected}
      />
    </div>
  )
})

export default ToolBar
