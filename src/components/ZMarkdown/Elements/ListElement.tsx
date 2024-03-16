import { CustomElementProps, ListElementType } from "../customTypes"

const ListElement = (props: CustomElementProps<ListElementType>) => {
  return <ul {...props.attributes}>{props.children}</ul>
}

export default ListElement
