import { onCtrl, onShift } from "@/utils/key"
import classNames from "classnames"
import { repeat, reverse, slice } from "lodash"
import { FC, useEffect, useMemo, useRef, useState } from "react"
import { HotkeyCallback, Keys, useHotkeys } from "react-hotkeys-hook"
import { OptionsOrDependencyArray } from "react-hotkeys-hook/dist/types"
import { ImperativePanelHandle, Panel, PanelGroup, PanelGroupProps , PanelResizeHandle } from "react-resizable-panels"
import { toast } from "react-toastify"
import { Key } from "ts-key-enum"
import { ZModalRef } from "../ZModal/ZModal"
import Preview from "./Preview"
import Textarea, { TextareaRef } from "./Textarea"
import Toolbar, { ToolbarButton } from "./Toolbar"
import ZPostEditorHelpDialog from "./ZPostEditorHelpDialog"
import { twclx } from "@/utils/twclx"

export type hotkeysRecord = Record<
  string,
  { keys: Keys; description: string | string[]; callback: HotkeyCallback; options: OptionsOrDependencyArray }
>

const headRegex = /^(#{1,6}\s+)(.*)/

const ZPostEditor: FC = () => {
  const [value, setValue] = useState<string>("")
  const [focused, setFocused] = useState<boolean>(false)
  const [layout, setLayout] = useState<ToolbarButton["layout"]>("normal")
  const [layoutReversed, setLayoutReversed] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)

  const helpDialogRef = useRef<ZModalRef>(null)
  const textareaRef = useRef<TextareaRef>(null)
  const editorPanelRef = useRef<ImperativePanelHandle>(null)
  const previewPanelRef = useRef<ImperativePanelHandle>(null)

  const hotkeysCommonOptions = useMemo<OptionsOrDependencyArray>(() => {
    return {
      enableOnFormTags: true,
      preventDefault: true,
      enabled: focused,
    }
  }, [focused])

  const togglePair = (left: string, right: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    // 获取当前选中的内容
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    // 查找当前左右匹配符的索引
    const leftMarkIndex = textarea.value.lastIndexOf(left, start - left.length)
    const rightMarkIndex = textarea.value.indexOf(right, end)
    // 判断当前光标是否处在匹配符之间
    const on = leftMarkIndex !== -1 && rightMarkIndex !== -1 && rightMarkIndex > leftMarkIndex

    // 如果光标处在匹配符之间，执行取消样式，获取内容时将左匹配符算在内，然后通过拼接生成去除匹配符后的内容
    // 否则执行添加样式，重新定位光标时将左匹配符算在
    if (on) {
      const content = textarea.value.slice(leftMarkIndex + left.length, rightMarkIndex)
      textarea.value =
        textarea.value.slice(0, leftMarkIndex) + content + textarea.value.slice(rightMarkIndex + right.length)
      textarea.selectionEnd = leftMarkIndex + content.length
    } else {
      // 如果内容有换行，将不是空行的每一行都加上匹配符
      const content = textarea.value.slice(start, end).replace(/\n\s+/, right + "\n\n" + left)
      textarea.value = textarea.value.slice(0, start) + left + content + right + textarea.value.slice(end)
      textarea.selectionEnd = start + left.length + content.length
    }

    // 更新值
    setValue(textarea.value)
  }

  const hotkeys: hotkeysRecord = {
    fullscreen: {
      keys: onCtrl(Key.F11),
      description: "全屏",
      callback: () => setFullscreen(!fullscreen),
      options: hotkeysCommonOptions,
    },
    save: {
      keys: onCtrl(onShift("s")),
      description: "保存",
      callback: () => {
        const textarea = textareaRef.current
        if (!textarea) return
        setValue(textarea.value)

        // todo
        toast.info("保存【todo】")
      },
      options: hotkeysCommonOptions,
    },
    markdown_headings: {
      keys: [onCtrl(1), onCtrl(2), onCtrl(3), onCtrl(4), onCtrl(5), onCtrl(6)],
      description: ["H1", "H2", "H3", "H4", "H5", "H6"],
      callback: (_, he) => {
        const textarea = textareaRef.current
        if (!textarea) return

        const lines = textarea.getLines()
        const cursorPos = textarea.getCursorPostion()
        const hl = repeat("#", Number(he.keys?.[1]) || 1) + " "

        let line = lines[cursorPos.line]
        let match
        if ((match = headRegex.exec(line)) !== null && match[1].trim() === hl.trim()) {
          line = match[2]
        } else {
          line = hl + line
        }
        lines.splice(cursorPos.line, 1, line)
        textarea.value = lines.join("\n")
        textarea.selectionEnd = lines.slice(0, cursorPos.line + 1).join("\n").length

        setValue(textarea.value)
      },
      options: hotkeysCommonOptions,
    },
    markdown_bold: {
      keys: onCtrl("b"),
      description: "加粗",
      callback: () => togglePair("**", "**"),
      options: hotkeysCommonOptions,
    },
    markdown_italic: {
      keys: onCtrl("i"),
      description: "斜体",
      callback: () => togglePair("*", "*"),
      options: hotkeysCommonOptions,
    },
    markdown_strikethrough: {
      keys: onCtrl("d"),
      description: "删除线",
      callback: () => togglePair("~~", "~~"),
      options: hotkeysCommonOptions,
    },
    markdown_link: {
      keys: onCtrl("l"),
      description: "链接",
      callback: () => togglePair("[](", ")"),
      options: hotkeysCommonOptions,
    },
    markdown_image: {
      keys: onCtrl(onShift("i")),
      description: "图片",
      callback: () => togglePair("![](", ")"),
      options: hotkeysCommonOptions,
    },
    markdown_inlinecode: {
      keys: onCtrl(onShift("`")),
      description: "行内代码块",
      callback: () => togglePair("`", "`"),
      options: hotkeysCommonOptions,
    },
    markdown_codeblock: {
      keys: onCtrl("`"),
      description: "代码块",
      callback: () => togglePair("```", "\n```"),
      options: hotkeysCommonOptions,
    },
    markdown_newline: {
      keys: [onCtrl(Key.Enter), onShift(Key.Enter)],
      description: "换行",
      callback: () => {
        const textarea = textareaRef.current
        if (!textarea) return

        const lines = textarea.getLines()
        const cursorPos = textarea.getCursorPostion()
        lines.splice(cursorPos.line + 1, 0, "")
        textarea.value = lines.join("\n")
        textarea.selectionEnd = lines.slice(0, cursorPos.line + 2).join("\n").length

        setValue(textarea.value)
      },
      options: hotkeysCommonOptions,
    },
  }

  // 绑定快捷键
  useHotkeys(hotkeys.fullscreen.keys, hotkeys.fullscreen.callback, hotkeys.fullscreen.options)
  useHotkeys(hotkeys.save.keys, hotkeys.save.callback, hotkeys.save.options)
  useHotkeys(hotkeys.markdown_headings.keys, hotkeys.markdown_headings.callback, hotkeys.markdown_headings.options)
  useHotkeys(hotkeys.markdown_bold.keys, hotkeys.markdown_bold.callback, hotkeys.markdown_bold.options)
  useHotkeys(hotkeys.markdown_italic.keys, hotkeys.markdown_italic.callback, hotkeys.markdown_italic.options)
  useHotkeys(
    hotkeys.markdown_strikethrough.keys,
    hotkeys.markdown_strikethrough.callback,
    hotkeys.markdown_strikethrough.options,
  )
  useHotkeys(hotkeys.markdown_link.keys, hotkeys.markdown_link.callback, hotkeys.markdown_link.options)
  useHotkeys(hotkeys.markdown_image.keys, hotkeys.markdown_image.callback, hotkeys.markdown_image.options)
  useHotkeys(hotkeys.markdown_newline.keys, hotkeys.markdown_newline.callback, hotkeys.markdown_newline.options)
  useHotkeys(
    hotkeys.markdown_inlinecode.keys,
    hotkeys.markdown_inlinecode.callback,
    hotkeys.markdown_inlinecode.options,
  )
  useHotkeys(hotkeys.markdown_codeblock.keys, hotkeys.markdown_codeblock.callback, hotkeys.markdown_codeblock.options)

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const onToolbarClick = (info: ToolbarButton) => {
    if (info.layout) {
      setLayout(info.layout)
    }

    if (info.action === "fullscreen") {
      setFullscreen(!fullscreen)
    }

    if (info.action === "help") {
      helpDialogRef.current?.show()
    }

    if (info.action === "reverse" && layout === "normal") {
      setLayoutReversed(!layoutReversed)
    }
  }

  useEffect(() => {
    previewPanelRef.current?.expand()
    editorPanelRef.current?.expand()
    if (layout === "editor") {
      previewPanelRef.current?.collapse()
    }

    if (layout === "preview") {
      editorPanelRef.current?.collapse()
    }

  }, [ layout ])

  const onPanelLayoutChange: PanelGroupProps["onLayout"] = (layout) => {
    const [ ew, pw ] = layoutReversed ? reverse(slice(layout)):layout
    if (ew === 0) {
      setLayout("preview")
    } else if (pw === 0) {
      setLayout("editor")
    } else {
      setLayout("normal")
    }
  }

  return (
    <div className={classNames(["flex-1 flex flex-col border bg-gray-100", { "fixed inset-0 z-[500]": fullscreen }])}>
      <Toolbar layout={layout} fullscreen={fullscreen} reverse={layoutReversed} onClick={onToolbarClick} />
      <div className={"flex-1 flex flex-col"}>
        <PanelGroup
          direction="horizontal"
          onLayout={onPanelLayoutChange}
          className={classNames(["flex-1", { "!flex-row-reverse": layoutReversed }])}
        >
          <Panel collapsible minSize={25} ref={editorPanelRef} id="editor-panel" order={layoutReversed ? 2 : 1}>
            <Textarea
              ref={textareaRef}
              placeholder="请输入markdown内容..."
              value={value}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={handleValueChange}
              className="w-full h-full p-3 break-all"
            />
          </Panel>
          <PanelResizeHandle className="w-0 border" />
          <Panel collapsible minSize={25} ref={previewPanelRef} id="preview-panel" order={layoutReversed ? 1 : 2} className={twclx([ "relative" ])}>
            <Preview className={twclx([ "absolute inset-0 p-3 break-all bg-white" ])}>{value}</Preview>
          </Panel>
        </PanelGroup>
      </div>
      <ZPostEditorHelpDialog ref={helpDialogRef} hotkeys={hotkeys} />
    </div>
  )
}

export default ZPostEditor
