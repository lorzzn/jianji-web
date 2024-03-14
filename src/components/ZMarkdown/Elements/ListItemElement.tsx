import { RenderElementProps } from "slate-react"

const ListItemElement = (props: RenderElementProps) => {
  return (
    <div {...props.attributes} className="mb-4 flex items-center">
      <input type="checkbox" className="mr-2 h-5 w-5 cursor-pointer accent-blue-300 checked:border-0" />
      {props.children}
    </div>
  )
}

export default ListItemElement
