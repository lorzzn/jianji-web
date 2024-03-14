import { CustomElement, CustomElementStrings } from "@/components/ZMarkdown/custom-types"
import { Editor, Transforms } from "slate"
import { DefaultElement, RenderElementProps } from "slate-react"
import BreakElement from "./BreakElement"
import CodeElement from "./CodeElement"
import DefinitionElement from "./DefinitionElement"
import DeleteElement from "./DeleteElement"
import DividerElement from "./DividerElement"
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
import MathElement from "./MathElement"
import QuoteElement from "./QuoteElement"
import RootElement from "./RootElement"
import StrongElement from "./StrongElement"
import TableCellElement from "./TableCellElement"
import TableElement from "./TableElement"
import TableRowElement from "./TableRowElement"
import TextElement from "./TextElement"
import TodoElement from "./TodoElement"
import YamlElement from "./YamlElement"

type ElementMetadata = {
  key?: [string, string | Record<string, Partial<CustomElement>>]
  symbol?: string | JSX.Element
  afterClick?: (editor: Editor) => void
  component: (x: RenderElementProps) => JSX.Element | undefined
}

type ElementMap = Record<CustomElementStrings, ElementMetadata>

const Elements: ElementMap = {
  paragraph: {
    component: DefaultElement,
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
    component: QuoteElement,
  },
  thematicBreak: {
    key: ["ctrl", "d"],
    afterClick: (editor: Editor) => {
      if (!editor.selection) return
      const currentSelection = Editor.unhangRange(editor, editor.selection)
      Transforms.select(editor, { path: [currentSelection.anchor.path[0] + 1, 0], offset: 0 })
    },
    component: DividerElement,
  },
  listItem: {
    component: TodoElement,
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

export default Elements
