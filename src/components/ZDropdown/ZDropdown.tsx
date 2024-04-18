import { CSSProperties, forwardRef, useImperativeHandle, useState } from "react"
import { ClassNamesConfig } from "react-select"
import { ZFloatingMenu, ZFloatingMenuItem, ZFloatingMenuProps } from "../ZFloatingMenu/ZFloatingMenu"

export interface DropdownOption {
  readonly value: string
  readonly label: string
  readonly style?: CSSProperties
  readonly selectable?: boolean
}

interface ZDropdownProps {
  target?: ZFloatingMenuProps["label"]
  options: DropdownOption[]
  onChange?: (option: DropdownOption) => void
  onClick?: (type: "target" | "option", option?: DropdownOption) => void
  classNames?: ClassNamesConfig<DropdownOption, false>
}

export interface ZDropdownRef {
  open: () => void
  close: () => void
}

const ZDropdown = forwardRef<ZDropdownRef, ZDropdownProps>(({ target, options, onChange, onClick }, ref) => {
  const [open, setOpen] = useState(false)
  // const [value, setValue] = useState<DropdownOption | null>(null)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  const onOptionChange = (item: DropdownOption) => {
    if (item?.selectable) {
      // setValue(item)
      onChange?.(item)
    }
    if (item) {
      onClick?.("option", item)
    }
    onClose()
  }

  useImperativeHandle(ref, () => ({
    close: onClose,
    open: onOpen,
  }))

  return (
    <ZFloatingMenu label={target} placement="bottom" resetClassName onOpenChange={(open) => setOpen(open)} open={open}>
      {options.map((option) => (
        <ZFloatingMenuItem label={option.label} onClick={() => onOptionChange(option)} key={option.value} />
      ))}
    </ZFloatingMenu>
  )
})

export default ZDropdown
