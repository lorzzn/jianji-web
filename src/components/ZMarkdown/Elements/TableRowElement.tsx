import { CustomElementProps, TableRowElementType } from "../custom-types"

const TableRowElement = (props: CustomElementProps<TableRowElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default TableRowElement
