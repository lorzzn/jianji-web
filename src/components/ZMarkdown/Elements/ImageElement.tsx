import { CustomElementProps, ImageElementType } from "../custom-types"

const ImageElement = (props: CustomElementProps<ImageElementType>) => {
  if (props.element.type !== "image") return <></>

  return (
    <div {...props.attributes} className="group relative flex max-w-lg flex-col">
      {props.children}
      <img alt="" src={props.element.url} />
    </div>
  )
}

export default ImageElement
