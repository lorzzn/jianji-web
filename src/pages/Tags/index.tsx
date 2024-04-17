import ZEmpty from "@/components/ZEmpty/ZEmpty"
import Tag from "@/components/ZPost/Tag"
import { useStore } from "@/store"
import { isEmpty } from "lodash"
import { observer } from "mobx-react"
import { FC, useEffect } from "react"

const Tags: FC = observer(() => {
  const { tagsStore } = useStore()
  const { tags, getTags, loading } = tagsStore

  useEffect(() => {
    getTags()
  }, [])

  return isEmpty(tags) && !loading ? (
    <div className="flex-1 flex place-content-center">
      <ZEmpty />
    </div>
  ) : (
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
