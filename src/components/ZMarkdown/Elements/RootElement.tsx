import { CustomElementProps, RootElementType } from "../customTypes"

const RootElement = (props: CustomElementProps<RootElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default RootElement
