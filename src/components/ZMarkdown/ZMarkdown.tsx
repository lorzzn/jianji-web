import { CSSProperties, FC, KeyboardEvent, KeyboardEventHandler, useCallback, useMemo, useState } from "react"
import { Descendant, createEditor } from 'slate'
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react'
import Elements from "./Elements"
import { CustomElementStrings } from "@/components/ZMarkdown/custom-types"
import { twMerge } from "tailwind-merge"
import classNames from "classnames"
import { toggleCurrentBlock } from "./utils"
import { withHistory } from "slate-history"
import { withParser } from "./withParser"
import { markdownParser } from './parser'
import { markdownExample } from "./markdown_example"
import { get, isObject, keys } from "lodash"

console.log({
  test: markdownParser(markdownExample)
});


interface ZMarkdownProps {
  className?: string
  style?: CSSProperties
}

const ZMarkdown:FC<ZMarkdownProps> = ({ className, style }) => {
  const [ initialValue, setInitialValue ] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [
        {
          text: "Hello World!",
        },
      ],
    },
  ])

  const editor = useMemo(
    () => withParser(withReact(withHistory(createEditor()))), 
    []
  )

  const renderElement = useCallback((props: RenderElementProps) => {
    
    const Elem =
      Elements[props.element.type as CustomElementStrings]?.component ?? Elements["paragraph"].component
      
    return <Elem {...props} />
  }, [])

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => {

      return (
        <span
        >
          {props.children}
        </span>
      )
    },
    [editor]
  )

  const handleKeyDown:KeyboardEventHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      const match = Object.entries(Elements).find(
        ([, { key }]) => key && key[0] === 'ctrl' && (isObject(key[1]) ? keys(key[1]).includes(e.key):key[1] === e.key)
      )
      const props = get(match, `[1].key[1][${e.key}]`)
      console.log(props);
      
      
      if (match) {
        e.preventDefault();
        toggleCurrentBlock(editor, match[0] as CustomElementStrings, props);
        return
      }

    }
  }

  const handleValueChange = (value: Descendant[]) => {
    
    console.log("value: ", value);
    console.log(editor);
    
  }

  return <div className={twMerge(classNames(["w-full h-full", className]))} style={style}>
    <Slate 
      editor={editor} 
      initialValue={initialValue}
      onValueChange={handleValueChange}
    >
      <Editable 
        className="bg-white w-full h-full prose prose-slate"
        renderElement={renderElement}
        onKeyDown={handleKeyDown}
      />
    </Slate>
  </div>
}

export default ZMarkdown
