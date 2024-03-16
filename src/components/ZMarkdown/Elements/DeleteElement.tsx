import { CustomElementProps, DeleteElementType } from "../customTypes"

const DeleteElement = (props: CustomElementProps<DeleteElementType>) => {
  return (
    <span {...props.attributes} className="line-through">
      {props.children}
    </span>
  )
}

export default DeleteElement
