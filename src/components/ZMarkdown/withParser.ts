import { Editor } from "slate"

export const withParser = (editor: Editor) => {
  const { insertText } = editor

  editor.insertText = (text) => {
    insertText(text)
  }

  return editor
}
