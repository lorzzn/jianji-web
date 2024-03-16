import { cloneDeep } from "lodash"
import { Nodes, RootContent } from "mdast"
import { frontmatterToMarkdown } from "mdast-util-frontmatter"
import { gfmToMarkdown } from "mdast-util-gfm"
import { mathToMarkdown } from "mdast-util-math"
import { toMarkdown } from "mdast-util-to-markdown"
import { Root } from "node_modules/remark-parse/lib"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkParse from "remark-parse"
import { Descendant } from "slate"
import { unified } from "unified"

interface MdastNode extends Omit<Root, "type" | "children"> {
  type?: string
  text?: string
  children?: MdastNode[]
  _children?: MdastNode[]
  value?: string
}

const mdastToDescendants = (node: MdastNode) => {
  node._children = cloneDeep(node.children)
  if (!node.children) {
    node.children = [{ text: node.value ?? "" }]
  } else {
    node.children.forEach(mdastToDescendants)
  }
}

const descendantToMdastRoot = (node: Descendant[]): Nodes => {
  return {
    type: "root",
    children: node as RootContent[],
  }
}

export const descendantToMarkdown = (desc: Descendant[]): string => {
  const md = toMarkdown(descendantToMdastRoot(desc), {
    extensions: [frontmatterToMarkdown(["yaml"]), mathToMarkdown(), gfmToMarkdown()],
  })

  return md
}

export const markdownToDescendant = (s: string): Descendant[] => {
  const mdast = unified().use(remarkParse).use(remarkFrontmatter, ["yaml"]).use(remarkGfm).use(remarkMath).parse(s)

  mdastToDescendants(mdast)
  return mdast.children as Descendant[]
}

export default markdownToDescendant
