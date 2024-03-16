import { CustomElementProps, EmphasisElementType } from "../customTypes"

const EmphasisElement = (props: CustomElementProps<EmphasisElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default EmphasisElement
