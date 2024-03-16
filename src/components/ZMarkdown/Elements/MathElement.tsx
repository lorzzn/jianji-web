import { CustomElementProps, MathElementType } from "../customTypes"

const MathElement = (props: CustomElementProps<MathElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default MathElement
