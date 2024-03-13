import { Editor, Transforms } from 'slate';

export const withParser = (editor: Editor) => {
  const { insertText, isVoid } = editor;

  editor.isVoid = (element) => {
    return (element.type === 'text'
      || element.type === 'yaml'
      || element.type === 'code'
      || element.type === 'math'
      || element.type === 'image'
      || element.type === 'table'
      || element.type === 'list'
      || element.type === 'listItem'
    ) ? true : isVoid(element);
  }

  editor.insertText = text => {
    insertText(text);
  }

  return editor;
};
