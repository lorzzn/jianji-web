import { ICategories } from "@/api/types/response/categories"
import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import { RiArrowDownSLine, RiArrowRightSLine } from "@remixicon/react"
import Tree from "rc-tree"
import DropIndicator from "rc-tree/lib/DropIndicator"
import { DataNode, TreeNodeProps } from "rc-tree/lib/interface"
import { FC, useEffect, useRef, useState } from "react"
import tw from "twin.macro"
import ZButton from "../ZButton/ZButton"
import ZModal, { ZModalRef } from "../ZModal/ZModal"

interface CategoriesSelectorProps {
  categories: ICategories[]
}

const CategoriesSelector: FC<CategoriesSelectorProps> = ({ categories }) => {
  const modalRef = useRef<ZModalRef>(null)
  const [treeData, setTreeData] = useState<DataNode[]>([])

  useEffect(() => {
    setTreeData(categoriesToTreeData())
  }, [categories])

  const categoriesToTreeData = (): DataNode[] => {
    const map = new Map<number, DataNode>()
    categories.forEach((item) => {
      const dataNode: DataNode = {
        title: item.label,
        key: item.value,
        children: [],
      }
      map.set(item.value, dataNode)
      if (item.parentValue !== null) {
        const parent = map.get(item.parentValue)
        if (parent) {
          parent.children?.push(dataNode)
        }
      }
    })

    return categories.filter((node) => node.parentValue === null).map((node) => map.get(node.value)!)
  }

  const switcherIconRender = (props: TreeNodeProps) => {
    if (props.isLeaf) {
      return <></>
    }
    if (props.expanded) {
      return <RiArrowDownSLine size={"1rem"} />
    }
    return <RiArrowRightSLine size={"1rem"} />
  }

  const showModal = () => {
    modalRef.current?.show()
  }

  const onExpand = () => {}
  const onSelect = () => {}

  return (
    <div>
      <ZButton onClick={showModal}>选择分类</ZButton>
      <ZModal ref={modalRef}>
        <div className="flex flex-col">
          <Tree
            className={twclx(
              "categories-selector",
              css`
                user-select: none;
                .rc-tree-treenode {
                  & span.rc-tree-switcher {
                    background-image: none;
                    margin-right: 0;
                    width: auto;
                  }
                  & span.rc-tree-node-selected {
                    box-shadow: none;
                    ${tw`bg-blue-200 ring-2 ring-inset ring-blue-300`}
                  }
                  & span.rc-tree-node-content-wrapper {
                    ${tw`px-1 hover:bg-blue-100 rounded-sm`}
                  }
                  &.drop-target {
                    ${tw`bg-blue-100`}
                  }
                  &.drop-container ~ .rc-tree-treenode {
                    ${tw`!border-l-blue-400`}
                  }
                }
              `,
            )}
            showLine
            draggable
            showIcon={false}
            switcherIcon={switcherIconRender}
            dropIndicatorRender={(props) => {
              return (
                <div
                  className={css`
                    div {
                      ${tw`!bg-blue-400`}
                    }
                  `}
                >
                  <DropIndicator {...props} />
                </div>
              )
            }}
            onExpand={onExpand}
            expandAction={"doubleClick"}
            onSelect={onSelect}
            treeData={treeData}
            height={150}
            onClick={(e) => {
              console.log(e)
            }}
            onActiveChange={(key) => console.log("Active:", key)}
          />

          <div className="flex justify-end">
            <div>
              <ZButton>确认</ZButton>
              <ZButton>取消</ZButton>
            </div>
          </div>
        </div>
      </ZModal>
    </div>
  )
}

export default CategoriesSelector
