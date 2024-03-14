import { CustomElementProps, YamlElementType } from "../custom-types"

const YamlElement = (props: CustomElementProps<YamlElementType>) => {
  return (
    <pre {...props.attributes}>
      <code className="language-yaml">{props.children}</code>
    </pre>
  )
}

export default YamlElement
