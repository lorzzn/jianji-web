import { frontmatterToMarkdown } from "mdast-util-frontmatter"
import { gfmToMarkdown } from "mdast-util-gfm"
import { mathToMarkdown } from "mdast-util-math"
import { toMarkdown } from "mdast-util-to-markdown"
import { Root } from "node_modules/remark-parse/lib"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkParse from "remark-parse"
import { unified } from "unified"

export class Markdown {
  _content: string
  _mdast: Root

  constructor() {
    this._content = ""
    this._mdast = {
      type: "root",
      children: [],
    }
  }

  set content(value: string) {
    this._content = value
    this.mdast = this.toMdast(value)
  }

  get content(): string {
    return this._content
  }

  set mdast(root: Root) {
    this._mdast = root
    this.content = this.mdastToMarkdown(root)
  }

  get mdast(): Root {
    return this._mdast
  }

  toMdast(value: string): Root {
    return unified().use(remarkParse).use(remarkFrontmatter, ["yaml"]).use(remarkGfm).use(remarkMath).parse(value)
  }

  mdastToMarkdown(root: Root): string {
    return toMarkdown(root, {
      extensions: [frontmatterToMarkdown(["yaml"]), mathToMarkdown(), gfmToMarkdown()],
    })
  }
}

export default Markdown
