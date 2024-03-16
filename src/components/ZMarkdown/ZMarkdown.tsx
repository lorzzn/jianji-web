import { CustomElementStrings } from "@/components/ZMarkdown/customTypes"
import classNames from "classnames"
import { get, isObject, keys } from "lodash"
import { RootContent } from "mdast"
import { CSSProperties, FC, KeyboardEvent, KeyboardEventHandler, useCallback, useMemo, useRef, useState } from "react"
import { Descendant, NodeEntry, Range, Transforms, createEditor } from "slate"
import { withHistory } from "slate-history"
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from "slate-react"
import { twMerge } from "tailwind-merge"
import Elements from "./Elements"
import { elementMap } from "./Elements/elementMap"
import { markdownExample } from "./markdownExample"
import markdownToDescendant from "./parser"
import { toggleCurrentBlock } from "./utils"
import { withParser } from "./withParser"

console.log({
  xx: markdownToDescendant(markdownExample),
})

interface ZMarkdownProps {
  className?: string
  style?: CSSProperties
}

const ZMarkdown: FC<ZMarkdownProps> = ({ className, style }) => {
  const value = useRef<Descendant[]>()
  const mdastRootContent = useRef<RootContent[]>()
  const [initialValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [
        {
          text: "",
        },
      ],
    },
  ])
  const editor = useMemo(() => withParser(withReact(withHistory(createEditor()))), [])
  const renderElement = useCallback((props: RenderElementProps) => <Elements {...props} />, [])
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => {
      return <span {...props.attributes}>{props.children}</span>
    },
    [editor],
  )

  const handleKeyDown: KeyboardEventHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      const match = Object.entries(elementMap).find(
        ([, { key }]) =>
          key && key[0] === "ctrl" && (isObject(key[1]) ? keys(key[1]).includes(e.key) : key[1] === e.key),
      )
      const props = get(match, `[1].key[1][${e.key}]`)

      if (match) {
        e.preventDefault()
        toggleCurrentBlock(editor, match[0] as CustomElementStrings, props)
        return
      }
    } else if (e.key.toLowerCase() === "enter") {
      Transforms.insertNodes(editor, {
        type: "paragraph",
        children: [{ text: "" }],
      })
      e.preventDefault()
    }
  }

  const handleValueChange = (v: Descendant[]) => {
    value.current = v
    console.log("value: ", value)
    console.log(editor)
  }

  const decorate = (entry: NodeEntry): Range[] => {
    console.log({ entry })

    const range: Range[] = []

    return range
  }

  return (
    <div className={twMerge(classNames(["w-full h-full", className]))} style={style}>
      <Slate editor={editor} initialValue={initialValue} onValueChange={handleValueChange}>
        <Editable
          className="bg-white w-full h-full prose prose-slate"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
          decorate={decorate}
        />
      </Slate>
    </div>
  )
}

export default ZMarkdown
