import { CustomElementProps, TableElementType } from "../customTypes"

const TableElement = (props: CustomElementProps<TableElementType>) => {
  return (
    <table {...props.attributes}>
      <tbody>{props.children}</tbody>
    </table>
  )
}

export default TableElement
