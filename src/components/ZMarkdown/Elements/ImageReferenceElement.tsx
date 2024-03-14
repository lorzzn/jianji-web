import { CustomElementProps, ImageReferenceElementType } from "../custom-types"

const ImageReferenceElement = (props: CustomElementProps<ImageReferenceElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default ImageReferenceElement
