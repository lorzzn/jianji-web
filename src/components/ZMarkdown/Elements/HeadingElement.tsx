import { CustomElementProps, HeadingElementType } from "../custom-types"

const HeadingElement = (props: CustomElementProps<HeadingElementType>) => {
  const CustomTag = `h${props.element.depth}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

  return <CustomTag {...props.attributes}>{props.children}</CustomTag>
}

export default HeadingElement
