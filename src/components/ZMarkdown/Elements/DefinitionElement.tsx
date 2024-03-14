import { CustomElementProps, DefinitionElementType } from "../custom-types"

const DefinitionElement = (props: CustomElementProps<DefinitionElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default DefinitionElement
