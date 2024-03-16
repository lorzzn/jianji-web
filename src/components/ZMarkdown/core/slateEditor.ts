import { Descendant, Editor, Transforms, createEditor } from "slate"
import Markdown from "./markdown"

class SlateEditor {
  editor: Editor
  content: Markdown
  _value: Descendant[]

  constructor() {
    this.editor = createEditor()
    this.content = new Markdown()
    this._value = [{ type: "paragraph", children: [{ text: "" }] }]
  }

  get value(): Descendant[] {
    return this._value
  }

  set value(value: Descendant[]) {
    this._value = value
  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.key.toLocaleLowerCase() === "Enter") {
      Transforms.insertNodes(this.editor, {
        type: "paragraph",
        children: [{ text: "" }],
      })
      e.preventDefault()
    }
  }
}

export default SlateEditor
