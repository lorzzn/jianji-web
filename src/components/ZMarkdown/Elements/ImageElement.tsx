import { RenderElementProps } from 'slate-react'

const ImageElement = (props: RenderElementProps) => {
  if (props.element.type !== 'image') return
  
  return (
    <div {...props.attributes} className="group relative flex max-w-lg flex-col">
      {props.children}
      <img alt="" src={(props.element).url} />
    </div>
  )
}

export default ImageElement
