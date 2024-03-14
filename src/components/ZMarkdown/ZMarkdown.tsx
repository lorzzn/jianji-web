import { CustomElementStrings } from "@/components/ZMarkdown/custom-types"
import classNames from "classnames"
import { get, isObject, keys } from "lodash"
import { CSSProperties, FC, KeyboardEvent, KeyboardEventHandler, useCallback, useMemo, useRef, useState } from "react"
import { Descendant, createEditor } from "slate"
import { withHistory } from "slate-history"
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from "slate-react"
import { twMerge } from "tailwind-merge"
import Elements from "./Elements"
import { elementMap } from "./Elements/elementMap"
import { markdownExample } from "./markdown_example"
import { markdownParser } from "./parser"
import { toggleCurrentBlock } from "./utils"
import { withParser } from "./withParser"

console.log({
  test: markdownParser(markdownExample),
})

interface ZMarkdownProps {
  className?: string
  style?: CSSProperties
}

const ZMarkdown: FC<ZMarkdownProps> = ({ className, style }) => {
  const value = useRef<Descendant[]>()
  const [initialValue] = useState<Descendant[]>(markdownParser(markdownExample))
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
    }
  }

  const handleValueChange = (v: Descendant[]) => {
    value.current = v
    console.log("value: ", value)
    console.log(editor)
  }

  return (
    <div className={twMerge(classNames(["w-full h-full", className]))} style={style}>
      <Slate editor={editor} initialValue={initialValue} onValueChange={handleValueChange}>
        <Editable
          className="bg-white w-full h-full prose prose-slate"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
        />
      </Slate>
    </div>
  )
}

export default ZMarkdown
