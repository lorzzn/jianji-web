import { forwardRef, useState } from "react";
import ZModal, { ZModalRef } from "../ZModal/ZModal";
import { observer } from "mobx-react";
import ZList from "../ZList/ZList";
import ZListItem from "../ZList/ZListItem";
import useDialog, { dialogNames } from "@/hooks/useDialog";
import { useStore } from "@/store";
import ZInput from "../ZInput/ZInput";
import ConfirmAbleButton from "../ConfirmAbleButton/ConfirmAbleButton";
import { ITag } from "@/api/types/request/tags";


const TagManagerDialog = observer(forwardRef<ZModalRef>(() => {
  const { register } = useDialog(dialogNames.TagManagerDialog)
  const [tagFilterKeyword, setTagFilterKeyword] = useState("")
  const [optingTag, setOptingTag] = useState<ITag|null>(null)

  const { tagsStore } = useStore()
  const { tags, deleteTags, tagsLoading } = tagsStore

  const onTagFilterKeywordChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTagFilterKeyword(e.target.value)
  }

  const onDeleteTag = (tag:ITag) => {
    setOptingTag(tag)
    deleteTags([tag.value])
  }

  return <>
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
        {
          tags.map(tag => {
            return <ZListItem 
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
          })
        }
      </ZList>
    </ZModal>
        
  </>
}))

export default TagManagerDialog
