import Tag from "@/components/ZPost/Tag"
import { useStore } from "@/store"
import { observer } from "mobx-react"
import { FC, useEffect } from "react"

const Tags: FC = observer(() => {
  const { tagsStore } = useStore()
  const { tags, getTags } = tagsStore

  useEffect(() => {
    getTags()
  }, [])

  return (
    <>
      <div className="flex justify-center mt-24">
        <div className="flex flex-wrap w-7/12 max-w-5xl -mr-5 -mb-4">
          {tags.map((tag) => (
            <Tag tag={tag} className="mr-5 mb-4" size={"normal"} key={tag.value} />
          ))}
        </div>
      </div>
    </>
  )
})

export default Tags
