import { ITag } from "@/api/types/response/tags"
import useDialog, { dialogNames } from "@/hooks/useDialog"
import { useStore } from "@/store"
import { getPlainTextFromMarkdown } from "@/utils/stringFuncs"
import { RiInformation2Line } from "@remixicon/react"
import classNames from "classnames"
import { observer } from "mobx-react"
import { FC, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import ZButton from "../ZButton/ZButton"
import ZCheckBox, { ZCheckBoxProps } from "../ZCheckBox/ZCheckBox"
import ZInput from "../ZInput/ZInput"
import ZLink from "../ZLink/ZLink"
import { useZMessageBox } from "../ZMessageBox/hooks/useZMessageBox"
import ZModal from "../ZModal/ZModal"
import CategoriesSelector, { CategoriesSelectorProps } from "../ZPost/CategoriesSelector"
import Textarea from "../ZPost/Textarea"
import ZSelect from "../ZSelect/ZSelect"
import { ZTooltip, ZTooltipContent, ZTooltipTrigger } from "../ZTooltip/ZTooltip"

const SavePostDialog: FC = observer(() => {
  const { register, dialog } = useDialog(dialogNames.SavePostDialog)
  const { dialog: tagManagerDialog } = useDialog(dialogNames.TagManagerDialog)
  const [categoryFilterKeyword, setCategoryFilterKeyword] = useState<string>("")
  const { showConfirm } = useZMessageBox()

  const { postStore, categoriesStore, tagsStore, userStore } = useStore()
  const {
    content,
    category,
    setCategory,
    tags: postTags,
    setTags: setPostTags,
    createOrSavePost,
    favoured,
    archived,
    description,
    setDescription,
    setFavoured,
    setArchived,
    remoteLoading,
  } = postStore
  const {
    categories,
    categoriesLoading,
    getCategories,
    updateCategories,
    createCategories,
    deleteCategories,
    getCategoryStatistics,
  } = categoriesStore
  const { tags, getTags, createTags } = tagsStore
  const { authed } = userStore

  useEffect(() => {
    if (authed) {
      getCategories()
      getTags()
    }
  }, [authed])

  const selectInputValue = useRef("")

  const onCategoriesSelected: CategoriesSelectorProps["onSelect"] = (_, category) => {
    setCategory(category)
  }

  const onCategoryFilterKeywordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCategoryFilterKeyword(e.target.value)
  }

  const onFavouredCheckBoxChange: ZCheckBoxProps["onChange"] = (e) => {
    setFavoured(e.target.checked)
  }

  const onArchivedCheckBoxChange: ZCheckBoxProps["onChange"] = (e) => {
    setArchived(e.target.checked)
  }

  const onDescriptionChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDescription(e.target.value)
  }

  const onSaveClick = () => {
    createOrSavePost().then((res) => {
      toast.success("保存成功")
      dialog()?.hide()
      window.location.href = `/post/${res.data.data.uuid}`
    })
  }

  const onCategoriesDelete = async (value: number | number[]) => {
    try {
      const categoryValue = (Array.isArray(value) ? value : [value])[0]
      if (!categoryValue) return

      const res = await getCategoryStatistics(value)
      if (res.totalPosts > 0) {
        showConfirm({
          title: "注意",
          content: (
            <div>
              <span>该分类有</span>
              <ZLink href={`/category/${categoryValue}`}>{res.totalPosts}</ZLink>
              <span>
                篇文章正在使用，删除后不会删除文章，但是文章的分类将显示为空，如果不希望这样推荐使用重命名或者重新排序
              </span>
            </div>
          ),
          okText: "确认继续",
          onOk: () => {
            deleteCategories([categoryValue])
          },
        })
      } else {
        deleteCategories([categoryValue])
      }
    } catch (error) {
      //
    }
  }

  return (
    <>
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
                  <div>注意：删除分类时子分类将会被移动到根目录</div>
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
                onDelete={onCategoriesDelete}
                onSelect={onCategoriesSelected}
                filterKeyword={categoryFilterKeyword}
              />
            </div>
          </div>

          <div className="flex-1 ml-3 flex flex-col justify-between">
            <div className="flex-1">
              <div className="mb-2">
                <span>选择标签</span>
                <ZButton variant={"primary_plain"} onClick={() => tagManagerDialog()?.show()}>
                  管理
                </ZButton>
              </div>
              <ZSelect
                isMulti
                placeholder="选择标签..."
                options={tags}
                defaultValue={postTags}
                onInputChange={(value) => (selectInputValue.current = value)}
                onChange={(value) => setPostTags(value as ITag[])}
                noOptionsMessage={() => {
                  return (
                    <div>
                      无标签
                      {selectInputValue.current && (
                        <button
                          className="text-blue-500 hover:underline active:text-blue-600 ml-1"
                          onClick={() => {
                            createTags([{ label: selectInputValue.current }])
                          }}
                        >
                          点击创建
                        </button>
                      )}
                    </div>
                  )
                }}
              ></ZSelect>

              <div className="my-2 flex items-center">
                <span className="mr-2">文章描述</span>
                <ZTooltip>
                  <ZTooltipTrigger>
                    <RiInformation2Line size={"1rem"} className="text-gray-950 hover:text-blue-500" />
                  </ZTooltipTrigger>
                  <ZTooltipContent>
                    <div>自动生成使用文章前300个字符</div>
                  </ZTooltipContent>
                </ZTooltip>
                <ZButton
                  variant={"primary_plain"}
                  onClick={() => setDescription(getPlainTextFromMarkdown(content).slice(0, 300))}
                >
                  自动生成
                </ZButton>
              </div>

              <Textarea
                className="ring-1 ring-gray-300 rounded-sm w-full p-2 text-sm h-24"
                placeholder="文章描述..."
                value={description}
                onChange={onDescriptionChange}
              />

              <div className="my-2">其他选项</div>
              <div className="text-sm flex flex-wrap space-x-6">
                <ZCheckBox
                  className="w-3 h-3"
                  label="放至收藏"
                  checked={favoured}
                  onChange={onFavouredCheckBoxChange}
                ></ZCheckBox>
                <ZCheckBox
                  className="w-3 h-3"
                  label="放至归档"
                  checked={archived}
                  onChange={onArchivedCheckBoxChange}
                ></ZCheckBox>
              </div>
            </div>
            <ZButton scale={"large"} onClick={onSaveClick} loading={remoteLoading}>
              确认保存
            </ZButton>
          </div>
        </div>
      </ZModal>
    </>
  )
})

export default SavePostDialog
