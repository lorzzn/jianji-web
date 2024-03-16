import { CustomElementProps, DefinitionElementType } from "../customTypes"

const DefinitionElement = (props: CustomElementProps<DefinitionElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default DefinitionElement
