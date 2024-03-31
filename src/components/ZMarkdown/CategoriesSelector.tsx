import { ICategories } from "@/api/types/response/categories"
import { css } from "@emotion/css"
import { RiArrowDownSLine, RiArrowRightSLine } from "@remixicon/react"
import Tree from "rc-tree"
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
            className={css`
              user-select: none;
              .rc-tree-treenode span.rc-tree-switcher {
                background-image: none;
                width: auto;
              }
              .rc-tree-treenode span.rc-tree-node-selected {
                ${tw`bg-blue-100`}
                box-shadow: 0 0 0 1px #000;
              }
            `}
            showLine
            showIcon={false}
            switcherIcon={switcherIconRender}
            onExpand={onExpand}
            expandAction={"doubleClick"}
            onSelect={onSelect}
            treeData={treeData}
            height={150}
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
