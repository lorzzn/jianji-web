import { CustomElementProps, EmphasisElementType } from "../custom-types"

const EmphasisElement = (props: CustomElementProps<EmphasisElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default EmphasisElement
