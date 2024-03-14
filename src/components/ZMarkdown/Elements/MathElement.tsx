import { CustomElementProps, MathElementType } from "../custom-types"

const MathElement = (props: CustomElementProps<MathElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default MathElement
