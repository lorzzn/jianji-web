import { isNull } from "lodash"
import { CustomElementProps, ListItemElementType } from "../customTypes"

const ListItemElement = (props: CustomElementProps<ListItemElementType>) => {
  const isTaskList = !isNull(props.element.checked)

  if (isTaskList) {
    return (
      <div {...props.attributes} className="flex items-center -ml-4 my-[0.5rem]">
        <input type="checkbox" disabled checked={!!props.element.checked} className="cursor-pointer mr-2" />
        {props.children}
      </div>
    )
  } else {
    return <li {...props.attributes}>{props.children}</li>
  }
}

export default ListItemElement
