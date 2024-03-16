import { CustomElementProps, InlineCodeElementType } from "../customTypes"

const InlineCodeElement = (props: CustomElementProps<InlineCodeElementType>) => {
  return (
    <span {...props.attributes} className="bg-gray-200 px-1 rounded-sm">
      {props.children}
    </span>
  )
}

export default InlineCodeElement
