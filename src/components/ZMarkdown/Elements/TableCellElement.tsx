import { CustomElementProps, TableCellElementType } from "../custom-types"

const TableCellElement = (props: CustomElementProps<TableCellElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default TableCellElement
