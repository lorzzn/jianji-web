import useDialog, { dialogNames } from "@/hooks/useDialog"
import { useStore } from "@/store"
import { RiInformation2Line } from "@remixicon/react"
import classNames from "classnames"
import { observer } from "mobx-react"
import { FC, useEffect } from "react"
import ZModal from "../ZModal/ZModal"
import CategoriesSelector, { CategoriesSelectorProps } from "../ZPost/CategoriesSelector"
import { ZTooltip, ZTooltipContent, ZTooltipTrigger } from "../ZTooltip/ZTooltip"

const SavePostDialog: FC = observer(() => {
  const { register } = useDialog(dialogNames.SavePostDialog)

  const { postStore } = useStore()
  const {
    categories,
    categoriesLoading,
    getCategories,
    category,
    setCategory,
    updateCategories,
    createCategories,
    deleteCategories,
  } = postStore

  useEffect(() => {
    getCategories()
  }, [])

  const onCategoriesSelected: CategoriesSelectorProps["onSelect"] = (_, category) => {
    setCategory(category)
  }

  return (
    <ZModal
      title={"保存文章"}
      ref={register}
      classNames={{
        modal: classNames([" w-full rounded-lg"]),
      }}
    >
      <div className="flex min-h-96">
        <div className="flex-1 mr-3">
          <div className="text-base mb-2 flex items-center">
            <span className="mr-2">选择分类</span>
            <ZTooltip>
              <ZTooltipTrigger>
                <RiInformation2Line size={"1rem"} className="text-gray-950 hover:text-blue-500" />
              </ZTooltipTrigger>
              <ZTooltipContent>
                <div>拖动分类可以排序</div>
                <div>右键可以选择更多操作</div>
                <div>点击图标或者双击分类名称展开/收起子分类</div>
                <div>注意：删除分类时子分类也会一起被删除</div>
              </ZTooltipContent>
            </ZTooltip>
          </div>
          <div>
            <CategoriesSelector
              loading={categoriesLoading}
              categories={categories}
              selectedCategory={category}
              onUpdate={updateCategories}
              onCreate={createCategories}
              onDelete={deleteCategories}
              onSelect={onCategoriesSelected}
            />
          </div>
        </div>

        <div className="flex-1 ml-3">
          <div>选择标签</div>
        </div>
      </div>
    </ZModal>
  )
})

export default SavePostDialog
