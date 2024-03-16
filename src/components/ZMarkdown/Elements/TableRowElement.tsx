import { CustomElementProps, TableRowElementType } from "../customTypes"

const TableRowElement = (props: CustomElementProps<TableRowElementType>) => {
  return <tr {...props.attributes}>{props.children}</tr>
}

export default TableRowElement
