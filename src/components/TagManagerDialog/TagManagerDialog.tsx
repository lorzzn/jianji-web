import { ITag } from "@/api/types/request/tags"
import { useZMessageBox } from "@/components/ZMessageBox/hooks/useZMessageBox"
import useDialog, { dialogNames } from "@/hooks/useDialog"
import { useStore } from "@/store"
import fuzzysort from "fuzzysort"
import { observer } from "mobx-react"
import { forwardRef, useMemo, useState } from "react"
import ConfirmAbleButton from "../ConfirmAbleButton/ConfirmAbleButton"
import ZInput from "../ZInput/ZInput"
import ZLink from "../ZLink/ZLink"
import ZList from "../ZList/ZList"
import ZListItem from "../ZList/ZListItem"
import ZModal, { ZModalRef } from "../ZModal/ZModal"

const TagManagerDialog = observer(
  forwardRef<ZModalRef>(() => {
    const { register } = useDialog(dialogNames.TagManagerDialog)
    const [tagFilterKeyword, setTagFilterKeyword] = useState("")
    const [optingTag, setOptingTag] = useState<ITag | null>(null)
    const { showConfirm } = useZMessageBox()

    const { tagsStore } = useStore()
    const { tags, deleteTags, loading: tagsLoading, getTagStatistics } = tagsStore

    // 模糊搜索
    const fzsortResult = useMemo(() => {
      const result = fuzzysort.go(tagFilterKeyword || "", tags, { key: "label" })
      return result.map((item) => item.obj)
    }, [tagFilterKeyword])

    const onTagFilterKeywordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      setTagFilterKeyword(e.target.value)
    }

    const onDeleteTag = async (tag: ITag) => {
      try {
        setOptingTag(tag)
        const tagValue = tag.value
        if (!tagValue) return

        const res = await getTagStatistics(tagValue)
        if (res.totalPosts > 0) {
          showConfirm({
            title: "注意",
            content: (
              <div>
                <span>该标签有</span>
                <ZLink href={`/tag/${tagValue}`}>{res.totalPosts}</ZLink>
                <span>篇文章正在使用，删除后不会删除文章，但是文章将失去该标签</span>
              </div>
            ),
            okText: "确认继续",
            onOk: () => {
              deleteTags([tagValue])
            },
          })
        } else {
          deleteTags([tagValue])
        }
      } catch (error) {
        //
      }
    }

    return (
      <>
        <ZModal title={"管理标签"} ref={register}>
          <ZInput
            showClearIcon={"not-empty"}
            onClear={() => setTagFilterKeyword("")}
            className="w-full mb-2"
            placeholder="搜索标签..."
            value={tagFilterKeyword}
            onChange={onTagFilterKeywordChange}
          />
          <ZList className="max-h-96 overflow-y-auto">
            {(tagFilterKeyword ? fzsortResult : tags).map((tag) => {
              return (
                <ZListItem
                  key={tag.value}
                  className="p-2"
                  suffixNode={
                    <ConfirmAbleButton
                      text="删除"
                      confirmText="确认删除?"
                      onConfirm={() => onDeleteTag(tag)}
                      buttonProps={{
                        loadingSize: "1.1rem",
                        loading: tagsLoading && optingTag?.value === tag.value,
                      }}
                    />
                  }
                >
                  {tag.label}
                </ZListItem>
              )
            })}
          </ZList>
        </ZModal>
      </>
    )
  }),
)

export default TagManagerDialog
