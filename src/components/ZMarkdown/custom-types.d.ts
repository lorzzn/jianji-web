import { BaseEditor, Descendant, ExtendedType } from 'slate'
import { Node } from 'unist'
import { ReactEditor, RenderElementProps } from 'slate-react'
import { HistoryEditor } from 'slate-history'
import { 
  Blockquote,
  Break,
  Code,
  Definition,
  Delete,
  Emphasis,
  FootnoteDefinition,
  FootnoteReference,
  Heading,
  Html,
  Image,
  ImageReference,
  InlineCode,
  Link,
  LinkReference,
  List,
  ListItem,
  Paragraph,
  Root,
  Strong,
  Table,
  TableRow,
  TableCell,
  Text,
  ThematicBreak,
  Yaml,
} from 'mdast'

export type BlockquoteElementType = Omit<Blockquote, "children"> & {
  children: Descendant[]
}

export type BreakElementType = Omit<Break, "children"> & {
  children: Descendant[]
}

export type CodeElementType = Omit<Code, "children"> & {
  children: Descendant[]
}

export type DefinitionElementType = Omit<Definition, "children"> & {
  children: Descendant[]
}

export type DeleteElementType = Omit<Delete, "children"> & {
  children: Descendant[]
}

export type EmphasisElementType = Omit<Emphasis, "children"> & {
  children: Descendant[]
}

export type FootnoteDefinitionElementType = Omit<FootnoteDefinition, "children"> & {
  children: Descendant[]
}

export type FootnoteReferenceElementType = Omit<FootnoteReference, "children"> & {
  children: Descendant[]
}

export type HeadingElementType = Omit<Heading, "children"> & {
  children: Descendant[]
}

export type HtmlElementType = Omit<Html, "children"> & {
  children: Descendant[]
}

export type ImageElementType = Omit<Image, "children"> & {
  children: Descendant[]
}

export type ImageReferenceElementType = Omit<ImageReference, "children"> & {
  children: Descendant[]
}

export type InlineCodeElementType = Omit<InlineCode, "children"> & {
  children: Descendant[]
}

export type LinkElementType = Omit<Link, "children"> & {
  children: Descendant[]
}

export type LinkReferenceElementType = Omit<LinkReference, "children"> & {
  children: Descendant[]
}

export type ListElementType = Omit<List, "children"> & {
  children: Descendant[]
}

export type ListItemElementType = Omit<ListItem, "children"> & {
  children: Descendant[]
}

export type ParagraphElementType = Omit<Paragraph, "children"> & {
  children: Descendant[]
}

export type RootElementType = Omit<Root, "children"> & {
  children: Descendant[]
}

export type StrongElementType = Omit<Strong, "children"> & {
  children: Descendant[]
}

export type TableElementType = Omit<Table, "children"> & {
  children: Descendant[]
}

export type TableRowElementType = Omit<TableRow, "children"> & {
  children: Descendant[]
}

export type TableCellElementType = Omit<TableCell, "children"> & {
  children: Descendant[]
}

export type TextElementType = Omit<Text, "children"> & {
  children: Descendant[]
}

export type ThematicBreakElementType = Omit<ThematicBreak, "children"> & {
  children: Descendant[]
}
export type YamlElementType = Omit<Yaml, "children"> & {
  children: Descendant[]
}

export type MathElementType = {
  type: "math",
  value: string,
  children: Descendant[]
}

type CustomElement =  
  | BlockquoteElementType
  | BreakElementType
  | CodeElementType
  | DefinitionElementType
  | DeleteElementType
  | EmphasisElementType
  | FootnoteDefinitionElementType
  | FootnoteReferenceElementType
  | HeadingElementType
  | HtmlElementType
  | ImageElementType
  | ImageReferenceElementType
  | InlineCodeElementType
  | LinkElementType
  | LinkReferenceElementType
  | ListElementType
  | ListItemElementType
  | ParagraphElementType
  | RootElementType
  | StrongElementType
  | TableElementType
  | TableRowElementType
  | TableCellElementType
  | TextElementType
  | ThematicBreakElementType
  | YamlElementType
  | MathElementType

export type CustomElementStrings<T = CustomElement> = T['type']

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: BaseElement & CustomElement
  }
  export interface BaseElement {
    type: CustomElementStrings
  }
}

export interface CustomElementProps<T = CustomElement> extends RenderElementProps {
  element: T
}
