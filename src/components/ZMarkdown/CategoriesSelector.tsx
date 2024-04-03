import { ICategories } from "@/api/types/response/categories"
import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import { RiFolder2Line, RiFolderLine, RiFolderOpenLine } from "@remixicon/react"
import { clone, fromPairs, partition, values } from "lodash"
import Tree, { TreeProps } from "rc-tree"
import DropIndicator from "rc-tree/lib/DropIndicator"
import { DataNode, Key, TreeNodeProps } from "rc-tree/lib/interface"
import { FC, useEffect, useMemo, useRef, useState } from "react"
import tw from "twin.macro"
import ZButton from "../ZButton/ZButton"
import ZLoadingContent from "../ZLoadingContent/ZLoadingContent"
import ZModal, { ZModalRef } from "../ZModal/ZModal"

export interface CategoriesSelectorProps {
  loading?: boolean
  categories: ICategories[]
  onUpdate: (data: ICategories[]) => void
  onSelect: (keys: Key[], value: CategoriesNode[]) => void
}

export interface CategoriesNode extends DataNode {
  data: ICategories
  children: CategoriesNode[]
}

const CategoriesSelector: FC<CategoriesSelectorProps> = ({
  categories,
  loading = false,
  onUpdate,
  onSelect: propOnSelect,
}) => {
  const modalRef = useRef<ZModalRef>(null)
  const [selectedNode, setSelectedNode] = useState<CategoriesNode>()
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([])
  const [expandKeys, setExpandKeys] = useState<Key[]>([])

  const showModal = () => modalRef.current?.show()
  const onSelect: TreeProps<CategoriesNode>["onSelect"] = (selectedKeys) => setSelectedKeys(selectedKeys)
  const onExpand: TreeProps<CategoriesNode>["onExpand"] = (expandedKeys) => setExpandKeys(expandedKeys)

  const treeDataRecord = useMemo<Record<number, CategoriesNode>>(() => {
    const all: ICategories = {
      value: 0,
      label: "全部",
      parentValue: null,
      ordinalNumber: 0,
    }
    return fromPairs(
      [all, ...categories].map((item) => [
        item.value,
        {
          title: item.label,
          key: item.value,
          data: item,
          children: [],
        },
      ]),
    )
  }, [categories])

  // 根据ordinalNumber进行排序
  const sortChildren = (children: CategoriesNode[]): CategoriesNode[] => {
    const [orderedItems, unorderedItems] = partition(children, Boolean)
    orderedItems.sort((a, b) => {
      return a.data.ordinalNumber - b.data.ordinalNumber
    })
    return [...orderedItems, ...unorderedItems]
  }

  // 转化为TreeData数据结构
  const treeData = useMemo<CategoriesNode[]>(() => {
    categories.forEach((item) => {
      const parent = treeDataRecord[item.parentValue ?? 0]
      parent.children?.push(treeDataRecord[item.value])
    })
    values(treeDataRecord).forEach((item) => (item.children = sortChildren(item.children)))
    return treeDataRecord[0].children
  }, [treeDataRecord])

  useEffect(() => {
    const node = treeDataRecord[selectedKeys[0] as number]
    if (node) {
      setSelectedNode(node)
      propOnSelect?.(selectedKeys, [node])
    }
  }, [treeDataRecord, selectedKeys])

  const switcherIconRender = (props: TreeNodeProps) => {
    if (props.isLeaf) {
      return <RiFolderLine size={"1rem"} />
    }
    if (props.expanded) {
      return <RiFolderOpenLine size={"1rem"} />
    }
    return <RiFolder2Line size={"1rem"} />
  }

  const onDrop: TreeProps<CategoriesNode>["onDrop"] = (info) => {
    console.log(info)

    let parent: CategoriesNode
    const { dragNode, node, dropPosition } = info
    const oldParent = treeDataRecord[dragNode.data.parentValue ?? 0]

    if (dropPosition === -1) {
      parent = treeDataRecord[0]
    } else if (dropPosition === 0) {
      parent = treeDataRecord[node.data.value]
    } else {
      parent = treeDataRecord[node.data.parentValue ?? 0]
    }

    // 计算新的次序
    let targetIndex = dropPosition
    if (targetIndex < 0) {
      targetIndex = 0
    }
    dragNode.data.parentValue = parent.data.value || null
    oldParent.children = oldParent.children.filter((item) => item.data.value !== dragNode.data.value)
    parent.children.splice(targetIndex, 0, dragNode)
    parent.children.forEach((item, index) => (item.data.ordinalNumber = index + 1))

    onUpdate([...parent.children, ...oldParent.children].map((item) => item.data))
  }

  const createCategories = () => {
    if (!selectedNode?.data) return
    const { data } = selectedNode

    const newCategories = {
      value: Date.now(),
      label: `分类${Date.now()}`,
      parentValue: data.value,
      ordinalNumber: 0,
    }
    onUpdate([newCategories])
    setExpandKeys((prev) => {
      prev.push(data.value)
      return clone(prev)
    })
    setSelectedKeys([newCategories.value])
  }

  return (
    <div>
      <ZButton onClick={showModal}>选择分类</ZButton>
      <ZModal ref={modalRef} title={"选择文章分类"}>
        <div className="flex flex-col">
          <ZLoadingContent loading={loading}>
            <Tree
              className={twclx(
                "categories-selector min-h-48",
                css`
                  user-select: none;
                  border-width: 0;
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
              onDrop={onDrop}
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
              selectedKeys={selectedKeys}
              expandedKeys={expandKeys}
              onExpand={onExpand}
              expandAction={"click"}
              onSelect={onSelect}
              treeData={treeData}
              height={360}
              virtual
              onClick={(e) => {
                console.log(e)
              }}
              onActiveChange={(key) => console.log("Active:", key)}
            />
          </ZLoadingContent>

          <div className="flex justify-between pt-6">
            <ZButton onClick={createCategories}>新建分类</ZButton>
            <div className="space-x-2">
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
