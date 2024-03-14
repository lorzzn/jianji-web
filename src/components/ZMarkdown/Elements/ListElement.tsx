import { CustomElementProps, ListElementType } from "../custom-types"

const ListElement = (props: CustomElementProps<ListElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default ListElement
