import {
  BlockquoteElementType,
  BreakElementType,
  CodeElementType,
  CustomElementProps,
  DefinitionElementType,
  DeleteElementType,
  EmphasisElementType,
  FootnoteDefinitionElementType,
  FootnoteReferenceElementType,
  HeadingElementType,
  HtmlElementType,
  ImageElementType,
  ImageReferenceElementType,
  InlineCodeElementType,
  LinkElementType,
  LinkReferenceElementType,
  ListElementType,
  ListItemElementType,
  MathElementType,
  ParagraphElementType,
  RootElementType,
  StrongElementType,
  TableCellElementType,
  TableElementType,
  TableRowElementType,
  TextElementType,
  ThematicBreakElementType,
  YamlElementType,
} from "@/components/ZMarkdown/custom-types"
import { RenderElementProps } from "slate-react"
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

const Elements = (props: RenderElementProps) => {
  switch (props.element.type) {
    case "paragraph":
      return <ParagraphElement {...(props as CustomElementProps<ParagraphElementType>)} />

    case "heading":
      return <HeadingElement {...(props as CustomElementProps<HeadingElementType>)} />

    case "code":
      return <CodeElement {...(props as CustomElementProps<CodeElementType>)} />

    case "blockquote":
      return <BlockQuoteElement {...(props as CustomElementProps<BlockquoteElementType>)} />

    case "thematicBreak":
      return <ThematicBreakElement {...(props as CustomElementProps<ThematicBreakElementType>)} />

    case "listItem":
      return <ListItemElement {...(props as CustomElementProps<ListItemElementType>)} />

    case "image":
      return <ImageElement {...(props as CustomElementProps<ImageElementType>)} />

    case "break":
      return <BreakElement {...(props as CustomElementProps<BreakElementType>)} />

    case "definition":
      return <DefinitionElement {...(props as CustomElementProps<DefinitionElementType>)} />

    case "delete":
      return <DeleteElement {...(props as CustomElementProps<DeleteElementType>)} />

    case "emphasis":
      return <EmphasisElement {...(props as CustomElementProps<EmphasisElementType>)} />

    case "footnoteDefinition":
      return <FootnoteDefinitionElement {...(props as CustomElementProps<FootnoteDefinitionElementType>)} />

    case "footnoteReference":
      return <FootnoteReferenceElement {...(props as CustomElementProps<FootnoteReferenceElementType>)} />

    case "html":
      return <HtmlElement {...(props as CustomElementProps<HtmlElementType>)} />

    case "imageReference":
      return <ImageReferenceElement {...(props as CustomElementProps<ImageReferenceElementType>)} />

    case "inlineCode":
      return <InlineCodeElement {...(props as CustomElementProps<InlineCodeElementType>)} />

    case "link":
      return <LinkElement {...(props as CustomElementProps<LinkElementType>)} />

    case "linkReference":
      return <LinkReferenceElement {...(props as CustomElementProps<LinkReferenceElementType>)} />

    case "list":
      return <ListElement {...(props as CustomElementProps<ListElementType>)} />

    case "root":
      return <RootElement {...(props as CustomElementProps<RootElementType>)} />

    case "strong":
      return <StrongElement {...(props as CustomElementProps<StrongElementType>)} />

    case "table":
      return <TableElement {...(props as CustomElementProps<TableElementType>)} />

    case "tableRow":
      return <TableRowElement {...(props as CustomElementProps<TableRowElementType>)} />

    case "tableCell":
      return <TableCellElement {...(props as CustomElementProps<TableCellElementType>)} />

    case "text":
      return <TextElement {...(props as CustomElementProps<TextElementType>)} />

    case "yaml":
      return <YamlElement {...(props as CustomElementProps<YamlElementType>)} />

    case "math":
      return <MathElement {...(props as CustomElementProps<MathElementType>)} />

    default:
      return <></>
  }
}

export default Elements
