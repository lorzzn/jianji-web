import ZButton from "@/components/ZButton/ZButton"
import ZEmpty from "@/components/ZEmpty/ZEmpty"
import CategoriesSelector, { CategoriesNode, CategoriesSelectorProps } from "@/components/ZPost/CategoriesSelector"
import { useStore } from "@/store"
import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import { RiStackLine } from "@remixicon/react"
import { isEmpty } from "lodash"
import { observer } from "mobx-react"
import Tree, { TreeProps } from "rc-tree"
import { FC, useEffect, useMemo } from "react"
import tw from "twin.macro"

const Categories: FC = observer(() => {
  const { categoriesStore } = useStore()
  const { categories, getCategories, categoriesLoading } = categoriesStore

  const expandedKeys = useMemo(() => categories.map((category) => category.value), [categories])

  useEffect(() => {
    getCategories()
  }, [])

  const treeTitleRender: TreeProps<CategoriesNode>["titleRender"] = (node) => {
    return (
      <ZButton
        variant={"primary_plain"}
        className={twclx([
          "flex items-start justify-start text-lg space-x-2 h-full w-full hover:bg-gray-200 hover:bg-opacity-60 rounded-md text-black p-2",
        ])}
        componentTag="a"
        href={`category/${node.data.value}`}
        data-value={node.data.value}
      >
        <RiStackLine size={"1rem"} className={twclx("shrink-0 h-7")} />
        <span>{node.data.label}</span>
      </ZButton>
    )
  }

  const contentRender: CategoriesSelectorProps["contentRender"] = (treeData) => {
    return (
      <Tree
        className={twclx(
          "categories-selector h-full",
          css`
            user-select: none;
            border-width: 0;
            .rc-tree-treenode {
              ${tw`whitespace-normal flex items-center w-full`}
              & span.rc-tree-title {
                height: 100%;
                width: 100%;
              }
              & span.rc-tree-switcher {
                background-image: none;
                margin-right: 0;
                width: auto;
              }
              & span.rc-tree-node-selected {
                box-shadow: none;
                background-color: transparent;
              }
              & span.rc-tree-node-content-wrapper {
                height: 100%;
                width: 100%;
              }
            }
          `,
        )}
        virtual
        showIcon={false}
        treeData={treeData}
        titleRender={treeTitleRender}
        expandedKeys={expandedKeys}
      />
    )
  }

  return isEmpty(categories) && !categoriesLoading ? (
    <div className="flex-1 flex place-content-center">
      <ZEmpty />
    </div>
  ) : (
    <>
      <div className="flex justify-center my-24">
        <div className="flex flex-wrap w-7/12 max-w-5xl -mr-5 -mb-4">
          <CategoriesSelector categories={categories} contentRender={contentRender} />
        </div>
      </div>
    </>
  )
})

export default Categories
