import { Editor, Transforms } from "slate"
import { CustomElement, CustomElementProps, CustomElementStrings, FilterElementType } from "../custom-types"
import BlockQuoteElement from "./BlockQuoteElement"
import BreakElement from "./BreakElement"
import CodeElement from "./CodeElement"
import DefinitionElement from "./DefinitionElement"
import DeleteElement from "./DeleteElement"
import EmphasisElement from "./EmphasisElement"
import FootnoteDefinitionElement from "./FootnoteDefinitionElement"
import FootnoteReferenceElement from "./FootnoteReferenceElement"
import HeadingElement from "./HeadingElement"
import HtmlElement from "./HtmlElement"
import ImageElement from "./ImageElement"
import ImageReferenceElement from "./ImageReferenceElement"
import InlineCodeElement from "./InlineCodeElement"
import LinkElement from "./LinkElement"
import LinkReferenceElement from "./LinkReferenceElement"
import ListElement from "./ListElement"
import ListItemElement from "./ListItemElement"
import MathElement from "./MathElement"
import ParagraphElement from "./ParagraphElement"
import RootElement from "./RootElement"
import StrongElement from "./StrongElement"
import TableCellElement from "./TableCellElement"
import TableElement from "./TableElement"
import TableRowElement from "./TableRowElement"
import TextElement from "./TextElement"
import ThematicBreakElement from "./ThematicBreakElement"
import YamlElement from "./YamlElement"

interface ElementMetadata<type> {
  key?: [string, string | Record<string, Partial<CustomElement>>]
  symbol?: string | JSX.Element
  afterClick?: (editor: Editor) => void
  component: (props: CustomElementProps<FilterElementType<CustomElement, type>>) => JSX.Element
}

type ElementMap = {
  [key in CustomElementStrings]: ElementMetadata<key>
}

export const elementMap: ElementMap = {
  paragraph: {
    component: ParagraphElement,
  },
  heading: {
    key: [
      "ctrl",
      {
        "1": { depth: 1 },
        "2": { depth: 2 },
        "3": { depth: 3 },
        "4": { depth: 4 },
        "5": { depth: 5 },
        "6": { depth: 6 },
      },
    ],
    symbol: "H",
    component: HeadingElement,
  },
  code: {
    key: ["ctrl", "/"],
    component: CodeElement,
  },
  blockquote: {
    key: ["ctrl", "q"],
    component: BlockQuoteElement,
  },
  thematicBreak: {
    key: ["ctrl", "d"],
    afterClick: (editor: Editor) => {
      if (!editor.selection) return
      const currentSelection = Editor.unhangRange(editor, editor.selection)
      Transforms.select(editor, { path: [currentSelection.anchor.path[0] + 1, 0], offset: 0 })
    },
    component: ThematicBreakElement,
  },
  listItem: {
    component: ListItemElement,
  },
  image: {
    component: ImageElement,
  },
  break: {
    component: BreakElement,
  },
  definition: {
    component: DefinitionElement,
  },
  delete: {
    component: DeleteElement,
  },
  emphasis: {
    component: EmphasisElement,
  },
  footnoteDefinition: {
    component: FootnoteDefinitionElement,
  },
  footnoteReference: {
    component: FootnoteReferenceElement,
  },
  html: {
    component: HtmlElement,
  },
  imageReference: {
    component: ImageReferenceElement,
  },
  inlineCode: {
    component: InlineCodeElement,
  },
  link: {
    component: LinkElement,
  },
  linkReference: {
    component: LinkReferenceElement,
  },
  list: {
    component: ListElement,
  },
  root: {
    component: RootElement,
  },
  strong: {
    component: StrongElement,
  },
  table: {
    component: TableElement,
  },
  tableRow: {
    component: TableRowElement,
  },
  tableCell: {
    component: TableCellElement,
  },
  text: {
    component: TextElement,
  },
  yaml: {
    component: YamlElement,
  },
  math: {
    component: MathElement,
  },
}
