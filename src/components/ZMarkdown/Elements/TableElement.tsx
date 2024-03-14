import { CustomElementProps, TableElementType } from "../custom-types"

const TableElement = (props: CustomElementProps<TableElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default TableElement
