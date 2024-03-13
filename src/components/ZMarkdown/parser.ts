// import remarkStringify from 'remark-stringify'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMath from 'remark-math'
import { unified } from 'unified'
import { Descendant } from 'slate'
import { Root } from 'node_modules/remark-parse/lib'

interface MdastNode extends Omit<Root, "type" | "children"> {
  type?: string
  text?: string
  children?: MdastNode[]
  value?: string
}

const mdastToDescendants = (node: MdastNode) => {
  if (!node.children) {
    node.children = [{ text: node.value ?? "" }]
  } else {
    node.children.forEach(mdastToDescendants)
  }
}

export const markdownParser = (s: string): Descendant[] => {
  const mdast = unified()
    .use(remarkParse)
    // .use(remarkStringify) // ? remark-frontmatter 将 markdown 格式化，例如 _*markdown*_ ---> **markdown**，在typora中似乎没有这样的表现，并且保持原本的输入可能会更好
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkGfm)
    .use(remarkMath)
    .parse(s)

  mdastToDescendants(mdast)
  return mdast.children as Descendant[]
}

export default markdownParser


