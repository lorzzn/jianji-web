import { CustomElementProps, ImageReferenceElementType } from "../customTypes"

const ImageReferenceElement = (props: CustomElementProps<ImageReferenceElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default ImageReferenceElement
