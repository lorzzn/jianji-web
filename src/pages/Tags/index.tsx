import HoverFloating from "@/components/ZAnimateDiv/HoverFloating"
import ZButton from "@/components/ZButton/ZButton"
import { useStore } from "@/store"
import { RiHashtag } from "@remixicon/react"
import { observer } from "mobx-react"
import { FC, useEffect } from "react"

const Tags: FC = observer(() => {
  const { tagsStore } = useStore()
  const { tags, getTags, loaded } = tagsStore

  useEffect(() => {
    if (!loaded) {
      getTags()
    }
  }, [ loaded ])

  return <>
    <div className="flex justify-center mt-24">
      <div className="flex flex-wrap w-7/12 max-w-5xl -mr-5 -mb-4">
        {
          tags.map(tag => {
            return <HoverFloating
              key={tag.value}
              className="rounded-full mr-5 mb-4 bg-gray-800 bg-opacity-90 text-white inline-block select-none cursor-pointer"
            >
              <ZButton 
                variant={"primary_plain"} 
                className="flex items-center space-x-1 h-auto px-5 py-2 text-lg text-white"
                componentTag="a"
                href={`/tag/${tag.value}`}
              >
                <RiHashtag size={"1.2rem"} />
                <span>{tag.label}</span>
              </ZButton>
            </HoverFloating>
          })
        }
      </div>
    </div>
  </>
})

export default Tags
