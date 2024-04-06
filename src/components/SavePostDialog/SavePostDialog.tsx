import { ITag } from "@/api/types/request/tags"
import useDialog, { dialogNames } from "@/hooks/useDialog"
import { useStore } from "@/store"
import { RiInformation2Line } from "@remixicon/react"
import classNames from "classnames"
import { observer } from "mobx-react"
import { FC, useEffect, useRef, useState } from "react"
import ZButton from "../ZButton/ZButton"
import ZCheckBox from "../ZCheckBox/ZCheckBox"
import ZInput from "../ZInput/ZInput"
import ZModal from "../ZModal/ZModal"
import CategoriesSelector, { CategoriesSelectorProps } from "../ZPost/CategoriesSelector"
import ZSelect from "../ZSelect/ZSelect"
import { ZTooltip, ZTooltipContent, ZTooltipTrigger } from "../ZTooltip/ZTooltip"

const SavePostDialog: FC = observer(() => {
  const { register } = useDialog(dialogNames.SavePostDialog)
  const [categoryFilterKeyword, setCategoryFilterKeyword] = useState<string>("")

  const { postStore, categoriesStore, tagsStore } = useStore()
  const { category, setCategory } = postStore
  const { categories, categoriesLoading, getCategories, updateCategories, createCategories, deleteCategories } =
    categoriesStore
  const { tags, getTags, createTags } = tagsStore

  useEffect(() => {
    getCategories()
    getTags()
  }, [])

  const selectInputValue = useRef("")
  const selectedTags = useRef<ITag[]>([])

  const onCategoriesSelected: CategoriesSelectorProps["onSelect"] = (_, category) => {
    setCategory(category)
  }

  const onCategoryFilterKeywordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCategoryFilterKeyword(e.target.value)
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
            <ZInput
              showClearIcon={"not-empty"}
              onClear={() => setCategoryFilterKeyword("")}
              className="w-full mb-2"
              placeholder="搜索分类..."
              value={categoryFilterKeyword}
              onChange={onCategoryFilterKeywordChange}
            />
            <CategoriesSelector
              loading={categoriesLoading}
              categories={categories}
              selectedCategory={category}
              onUpdate={updateCategories}
              onCreate={createCategories}
              onDelete={deleteCategories}
              onSelect={onCategoriesSelected}
              filterKeyword={categoryFilterKeyword}
            />
          </div>
        </div>

        <div className="flex-1 ml-3 flex flex-col justify-between">
          <div className="flex-1">
            <div className="mb-2">选择标签</div>
            <ZSelect
              isMulti
              placeholder="选择标签..."
              options={tags}
              onInputChange={(value) => (selectInputValue.current = value)}
              onChange={(value) => (selectedTags.current = value as ITag[])}
              noOptionsMessage={() => {
                return (
                  <div>
                    标签不存在，
                    <button
                      className="text-blue-500 hover:underline active:text-blue-600"
                      onClick={() => {
                        createTags([{ label: selectInputValue.current }])
                      }}
                    >
                      点击创建
                    </button>
                  </div>
                )
              }}
            ></ZSelect>
            <div className="my-2">其他选项</div>
            <div className="text-sm">
              <ZCheckBox className="w-3 h-3" label="放至收藏"></ZCheckBox>
            </div>
          </div>
          <ZButton>确认保存</ZButton>
        </div>
      </div>
    </ZModal>
  )
})

export default SavePostDialog
