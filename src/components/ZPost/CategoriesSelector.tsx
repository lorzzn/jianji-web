import { ICategory } from "@/api/types/response/categories"
import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import { RiFolder2Line, RiFolderLine, RiFolderOpenLine } from "@remixicon/react"
import fuzzysort from "fuzzysort"
import { first, fromPairs, partition, uniq, values } from "lodash"
import Tree, { TreeProps } from "rc-tree"
import DropIndicator from "rc-tree/lib/DropIndicator"
import { DraggableFn } from "rc-tree/lib/Tree"
import { DataNode, Key, TreeNodeProps } from "rc-tree/lib/interface"
import { FC, useEffect, useMemo, useRef, useState } from "react"
import tw from "twin.macro"
import { ZFloatingMenu, ZFloatingMenuItem, ZFloatingMenuItemProps } from "../ZFloatingMenu/ZFloatingMenu"
import ZInput from "../ZInput/ZInput"
import ZLoadingContent from "../ZLoadingContent/ZLoadingContent"

export interface CategoriesSelectorProps {
  loading?: boolean
  categories: ICategory[]
  selectedCategory?: ICategory | null
  filterKeyword?: string
  onUpdate?: (data: ICategory[]) => void
  onCreate?: (data: Partial<ICategory>[], callback?: (created: ICategory[] | null) => void) => void
  onSelect?: (key: Key, value: ICategory) => void
  onDelete?: (value: number | number[]) => void
  onConfirm?: (data: ICategory) => void
  contentRender?: (treeData: CategoriesNode[]) => JSX.Element
  enableContextMenu?: boolean
}

export interface CategoriesNode extends DataNode {
  data: ICategory
  children: CategoriesNode[]
}

type FMenuActions = "create" | "delete" | "rename" | "moveup" | "movedown"

const CategoriesSelector: FC<CategoriesSelectorProps> = ({
  categories,
  selectedCategory,
  loading = false,
  onUpdate,
  onCreate,
  onDelete,
  onSelect: propOnSelect,
  filterKeyword,
  contentRender,
  enableContextMenu = true,
}) => {
  const [expandKeys, setExpandKeys] = useState<Key[]>([])
  const [editingKey, setEditingKey] = useState<Key | null>(null)
  const treeContainerRef = useRef<HTMLDivElement>(null)
  const selectedKey = useMemo<number>(() => selectedCategory?.value || 0, [selectedCategory])

  const onSelect: TreeProps<CategoriesNode>["onSelect"] = (selectedKeys, info) => {
    if (selectedKeys[0] !== undefined) {
      propOnSelect?.(info.node.key, info.node.data)
    }
  }
  const onExpand: TreeProps<CategoriesNode>["onExpand"] = (expandedKeys) => setExpandKeys(expandedKeys)
  const [contextMenuNode, setContextMenuNode] = useState<CategoriesNode | null>(null)

  const treeDataRecord = useMemo<Record<number, CategoriesNode>>(() => {
    const all: ICategory = {
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

  // 模糊搜索
  const fzsortResult = useMemo(() => {
    const result = fuzzysort.go(filterKeyword || "", categories, { key: "label" })
    return result.map((item) => item.obj)
  }, [filterKeyword])

  useEffect(() => {
    if (fzsortResult.length > 0) {
      fzsortResult.forEach((item) => {
        setExpandKeys((prev) => uniq([...prev, ...getCategoryPath(treeDataRecord[item.parentValue ?? 0].data)]))
      })
    }
  }, [fzsortResult])

  const filterTreeNodeFunc: TreeProps<CategoriesNode>["filterTreeNode"] = (node): boolean => {
    return fzsortResult.map((item) => item.value).includes(node.data.value)
  }

  // 根据ordinalNumber进行排序
  const sortChildren = (children: CategoriesNode[]): CategoriesNode[] => {
    const [orderedItems, unorderedItems] = partition(children, (child) => Boolean(child.data.ordinalNumber))

    orderedItems.sort((a, b) => {
      return Number(a.data.ordinalNumber) - Number(b.data.ordinalNumber) || 0
    })
    return [...orderedItems, ...unorderedItems]
  }

  // 转化为TreeData数据结构
  const treeData = useMemo<CategoriesNode[]>(() => {
    categories.forEach((item) => {
      const parent = treeDataRecord[item.parentValue ?? 0]
      parent?.children?.push(treeDataRecord[item.value])
    })
    values(treeDataRecord).forEach((item) => (item.children = sortChildren(item.children)))
    return treeDataRecord[0].children
  }, [treeDataRecord])

  const renameCategory = (value: number, label: string) => {
    const node = treeDataRecord[value]
    if (!node) return
    node.data.label = label
    onUpdate?.([node.data])
  }

  const onEditingTitleInputRef = (instance: HTMLInputElement | null) => {
    setTimeout(() => {
      instance?.focus()
      instance?.select()
    })
  }

  const treeTitleRender: TreeProps<CategoriesNode>["titleRender"] = (node) => {
    const onTitleEditingConfirm = (e: any) => {
      setEditingKey(null)
      renameCategory(node.data.value, e?.target?.value)
    }

    return editingKey === node.data.value ? (
      <ZInput
        ref={onEditingTitleInputRef}
        className=" h-6 !ring-0 bg-transparent border-none w-full"
        onBlur={onTitleEditingConfirm}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onTitleEditingConfirm(e)
          }
        }}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
        defaultValue={node.data.label}
        maxLength={32}
      />
    ) : (
      <div data-value={node.data.value} className="line-clamp-1 text-ellipsis">
        {node.data.label}
      </div>
    )
  }

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
    let parent: CategoriesNode
    const { dragNode, node, dropPosition, dropToGap } = info
    const oldParent = treeDataRecord[dragNode.data.parentValue ?? 0]

    if (dropPosition === -1) {
      parent = treeDataRecord[0]
    } else if (dropPosition === 0) {
      parent = treeDataRecord[node.data.value]
    } else {
      if (dropToGap) {
        parent = treeDataRecord[node.data.parentValue ?? 0]
      } else {
        parent = treeDataRecord[node.data.value]
      }
    }

    // 计算新的次序
    dragNode.data.parentValue = parent.data.value || null
    oldParent.children = oldParent.children.filter((item) => item.data.value !== dragNode.data.value)
    let targetIndex = parent.children.findIndex((item) => item.data.value === node.data.value)
    if (dropPosition === -1) {
      targetIndex -= 1
    }
    parent.children.splice(targetIndex + 1, 0, dragNode)
    parent.children.forEach((item, index) => (item.data.ordinalNumber = index + 1))

    onUpdate?.([...parent.children, ...oldParent.children].map((item) => item.data))
  }

  const getCategoryPath = (node: ICategory) => {
    const path = [node.value]
    if (node.parentValue) {
      const parent = categories.find((item) => item.value === node.parentValue)
      if (parent) {
        path.unshift(...getCategoryPath(parent))
      }
    }
    return path
  }

  const createCategories = () => {
    let node
    if (!selectedKey) {
      node = treeDataRecord[0].data
    } else {
      node = treeDataRecord[selectedKey as number].data
    }

    const category = {
      label: `新分类`,
      parentValue: node.value || null,
    }

    onCreate?.([category], (created) => {
      const remoteValue = first(created)
      if (created && remoteValue) {
        setExpandKeys((prev) => uniq([...prev, ...getCategoryPath(remoteValue)]))
        propOnSelect?.(remoteValue.value, remoteValue)
      }
    })
  }

  const deleteCategories = () => {
    let node
    if (!selectedKey) {
      return
    } else {
      node = treeDataRecord[selectedKey as number].data
    }
    onDelete?.([node.value])
  }

  const onFolatingMenuItemClick =
    (actions: FMenuActions): ZFloatingMenuItemProps["onClick"] =>
    () => {
      const node = contextMenuNode
      if (!node) return

      switch (actions) {
        case "create":
          createCategories()
          break
        case "delete":
          deleteCategories()
          break
        case "rename":
          setEditingKey(node.data.value)
          break

        default:
          break
      }
    }

  const onTreeContextMenu = (e: React.MouseEvent) => {
    const treeTitleElement = (e.target as HTMLElement).closest(".rc-tree-title div") as HTMLElement
    const value = Number(treeTitleElement?.dataset.value) || 0
    const node = treeDataRecord[value]
    propOnSelect?.(node.data.value, node.data)
    setContextMenuNode(node)
  }

  const draggableFn: DraggableFn = (node): boolean => editingKey !== (node as CategoriesNode).data.value

  return (
    <ZLoadingContent loading={loading}>
      {contentRender ? (
        contentRender(treeData)
      ) : (
        <div
          ref={treeContainerRef}
          className="relative w-full h-full min-h-80 ring-1 ring-gray-300 rounded-sm py-2"
          onContextMenu={onTreeContextMenu}
        >
          {categories.length === 0 && (
            <div className="absolute inset-0 flex justify-center pt-20 text-gray-400 text-sm pointer-events-none select-none">
              无分类，右键可以选择新建分类
            </div>
          )}
          <Tree
            className={twclx(
              "categories-selector h-full",
              css`
                user-select: none;
                border-width: 0;
                .rc-tree-treenode {
                  ${tw`whitespace-normal flex items-center px-2`}
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
                  &.filter-node {
                    ${tw`bg-gray-100`}
                    & > .rc-tree-node-content-wrapper {
                      ${tw`!text-blue-500`}
                      & input {
                        ${tw`text-black font-normal`}
                      }
                    }
                  }
                }
              `,
            )}
            virtual
            showLine
            draggable={draggableFn}
            filterTreeNode={filterTreeNodeFunc}
            treeData={treeData}
            onDrop={onDrop}
            showIcon={false}
            titleRender={treeTitleRender}
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
            selectedKeys={[selectedKey]}
            expandedKeys={expandKeys}
            onExpand={onExpand}
            expandAction={"doubleClick"}
            onSelect={onSelect}
          />

          {/* 是否启用右键菜单 */}
          {enableContextMenu && (
            <ZFloatingMenu className="hidden" contextMenuTrigger={treeContainerRef}>
              <ZFloatingMenuItem label="新建分类" onClick={onFolatingMenuItemClick("create")} />
              <ZFloatingMenuItem label="重命名" disabled={!selectedKey} onClick={onFolatingMenuItemClick("rename")} />
              <ZFloatingMenuItem label="删除" disabled={!selectedKey} onClick={onFolatingMenuItemClick("delete")} />
            </ZFloatingMenu>
          )}
        </div>
      )}
    </ZLoadingContent>
  )
}

export default CategoriesSelector
