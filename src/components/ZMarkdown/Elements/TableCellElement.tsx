import { CustomElementProps, TableCellElementType } from "../customTypes"

const TableCellElement = (props: CustomElementProps<TableCellElementType>) => {
  return <td {...props.attributes}>{props.children}</td>
}

export default TableCellElement
