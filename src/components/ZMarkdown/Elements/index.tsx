import CodeElement from './CodeElement';
import HeadingElement from './HeadingElement';
import QuoteElement from './QuoteElement';
import { DefaultElement, RenderElementProps } from 'slate-react';
import DividerElement from './DividerElement';
import TodoElement from './TodoElement';
import ImageElement from './ImageElement';
import { Editor, Transforms } from 'slate';
import { CustomElement, CustomElementProps, CustomElementStrings, HeadingElementType } from '@/components/ZMarkdown/custom-types';
import BreakElement from './BreakElement';
import DefinitionElement from './DefinitionElement';
import DeleteElement from './DeleteElement';
import EmphasisElement from './EmphasisElement';
import FootnoteDefinitionElement from './FootnoteDefinitionElement';
import FootnoteReferenceElement from './FootnoteReferenceElement';
import HtmlElement from './HtmlElement';
import ImageReferenceElement from './ImageReferenceElement';
import InlineCodeElement from './InlineCodeElement';
import LinkElement from './LinkElement';
import LinkReferenceElement from './LinkReferenceElement';
import ListElement from './ListElement';
import RootElement from './RootElement';
import StrongElement from './StrongElement';
import TableElement from './TableElement';
import TableRowElement from './TableRowElement';
import TableCellElement from './TableCellElement';
import TextElement from './TextElement';
import YamlElement from './YamlElement';
import MathElement from './MathElement';

type ElementMetadata = {
  key?: [string, string|Record<string, Partial<CustomElement>>]
  symbol?: string | JSX.Element
  afterClick?: (editor: Editor) => void
  component: (x: RenderElementProps) => JSX.Element|undefined
}

type ElementMap = Record<CustomElementStrings, ElementMetadata>

const Elements: ElementMap = {
  paragraph: {
    component: DefaultElement,
  },
  heading: {
    key: ['ctrl', {
      '1': { depth: 1 },
      '2': { depth: 2 },
      '3': { depth: 3 },
      '4': { depth: 4 },
      '5': { depth: 5 },
      '6': { depth: 6 },
    }],
    symbol: 'H',
    component: HeadingElement,
  },
  code: {
    key: ['ctrl', '/'],
    component: CodeElement,
  },
  blockquote: {
    key: ['ctrl', 'q'],
    component: QuoteElement,
  },
  thematicBreak: {
    key: ['ctrl', 'd'],
    afterClick: (editor: Editor) => {
      if (!editor.selection) return;
      const currentSelection = Editor.unhangRange(editor, editor.selection);
      Transforms.select(editor, { path: [currentSelection.anchor.path[0] + 1, 0], offset: 0 });
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
    component: DeleteElement
  },
  emphasis: {
    component: EmphasisElement
  },
  footnoteDefinition: {
    component: FootnoteDefinitionElement
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
  }
};

export default Elements;
