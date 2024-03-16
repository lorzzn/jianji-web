import { CodeElementType, CustomElementProps } from "../customTypes"

const CodeElement = (props: CustomElementProps<CodeElementType>) => {
  return (
    <pre {...props.attributes} className="rounded bg-gray-100 p-8 font-mono text-sm text-gray-800">
      <code>{props.children}</code>
    </pre>
  )
}

export default CodeElement
