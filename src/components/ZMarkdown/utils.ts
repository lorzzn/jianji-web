import { Editor, Transforms, Element } from 'slate'
import { CustomElement, CustomElementProps, CustomElementStrings } from './custom-types'

export const isBlockActive = (editor: Editor, type: CustomElementStrings) => {
  if (!editor.selection) return false
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, editor.selection),
      match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) && n.type === type,
    })
  )
  return !!match
}


export const toggleCurrentBlock = (editor: Editor, type: CustomElementStrings, props?: Partial<CustomElement>) => {
  Transforms.setNodes(
    editor,
    { type, ...props },
    { match: (n) => {
      return Element.isElement(n) && Editor.isBlock(editor, n)
    }}
  );
};
