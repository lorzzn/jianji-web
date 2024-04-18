import { ICategory } from "@/api/types/response/categories"
import { RiStackLine } from "@remixicon/react"
import { FC } from "react"
import HoverFloating from "../ZAnimateDiv/HoverFloating"
import ZButton from "../ZButton/ZButton"

interface CategoryProps {
  category: ICategory
}

const Category: FC<CategoryProps> = ({ category }) => {
  return (
    <HoverFloating title={category.label} className="min-w-0">
      <ZButton
        variant={"primary_plain"}
        className="flex flex-1 items-center text-gray-600 space-x-2 h-auto text-base"
        componentTag="a"
        href={`/category/${category.value}`}
      >
        <RiStackLine size={"1rem"} className="shrink-0" />
        <span className="select-none whitespace-nowrap text-ellipsis overflow-hidden">{category.label}</span>
      </ZButton>
    </HoverFloating>
  )
}

export default Category
