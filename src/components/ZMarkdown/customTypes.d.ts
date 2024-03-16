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
  TableCell,
  TableRow,
  Text,
  ThematicBreak,
  Yaml,
} from "mdast"
import { BaseEditor, Descendant } from "slate"
import { HistoryEditor } from "slate-history"
import { ReactEditor, RenderElementProps } from "slate-react"

export type BaseCustomElementType = {
  raw?: string
  children: Descendant[]
}

export type BlockquoteElementType = BaseCustomElementType & Omit<Blockquote, "children">
export type BreakElementType = BaseCustomElementType & Omit<Break, "children">
export type CodeElementType = BaseCustomElementType & Omit<Code, "children">
export type DefinitionElementType = BaseCustomElementType & Omit<Definition, "children">
export type DeleteElementType = BaseCustomElementType & Omit<Delete, "children">
export type EmphasisElementType = BaseCustomElementType & Omit<Emphasis, "children">
export type FootnoteDefinitionElementType = BaseCustomElementType & Omit<FootnoteDefinition, "children">
export type FootnoteReferenceElementType = BaseCustomElementType & Omit<FootnoteReference, "children">
export type HeadingElementType = BaseCustomElementType & Omit<Heading, "children">
export type HtmlElementType = BaseCustomElementType & Omit<Html, "children">
export type ImageElementType = BaseCustomElementType & Omit<Image, "children">
export type ImageReferenceElementType = BaseCustomElementType & Omit<ImageReference, "children">
export type InlineCodeElementType = BaseCustomElementType & Omit<InlineCode, "children">
export type LinkElementType = BaseCustomElementType & Omit<Link, "children">
export type LinkReferenceElementType = BaseCustomElementType & Omit<LinkReference, "children">
export type ListElementType = BaseCustomElementType & Omit<List, "children">
export type ListItemElementType = BaseCustomElementType & Omit<ListItem, "children">
export type ParagraphElementType = BaseCustomElementType & Omit<Paragraph, "children">
export type RootElementType = BaseCustomElementType & Omit<Root, "children">
export type StrongElementType = BaseCustomElementType & Omit<Strong, "children">
export type TableElementType = BaseCustomElementType & Omit<Table, "children">
export type TableRowElementType = BaseCustomElementType & Omit<TableRow, "children">
export type TableCellElementType = BaseCustomElementType & Omit<TableCell, "children">
export type TextElementType = BaseCustomElementType & Omit<Text, "children">
export type ThematicBreakElementType = BaseCustomElementType & Omit<ThematicBreak, "children">
export type YamlElementType = BaseCustomElementType & Omit<Yaml, "children">
export type MathElementType = BaseCustomElementType & {
  type: "math"
  value?: string
}

export type CustomElement =
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

export type CustomElementStrings = CustomElement["type"]

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type CustomLeaf =
  | StrongElementType
  | TextElementType
  | ThematicBreakElementType
  | DeleteElementType
  | EmphasisElementType
;["type"]

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement | BaseElement
  }
  export interface BaseElement {
    type: CustomElementStrings
  }
}

export interface CustomElementProps<T = CustomElement> extends RenderElementProps {
  element: T
}

export type FilterElementType<T, U> = T extends { type: U } ? T : never
