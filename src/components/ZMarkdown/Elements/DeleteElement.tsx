import { CustomElementProps, DeleteElementType } from "../custom-types"

const DeleteElement = (props: CustomElementProps<DeleteElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default DeleteElement
