import { CSSProperties, forwardRef, useImperativeHandle, useState } from "react"
import { ClassNamesConfig } from "react-select"
import { ZFloatingMenu, ZFloatingMenuItem, ZFloatingMenuProps } from "../ZFloatingMenu/ZFloatingMenu"
import { twclx } from "@/utils/twclx"

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

const ZDropdown = forwardRef<ZDropdownRef, ZDropdownProps>(
  ({ target, options, onChange, onClick }, ref) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<DropdownOption | null>(null)
    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)
    const onButtonClick = () => {
      ;(open ? onClose : onOpen)()
      onClick?.("target")
    }

    const onOptionChange = (item: DropdownOption) => {
      if (item?.selectable) {
        setValue(item)
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
      <ZFloatingMenu label={target as string} placement="bottom" resetClassName onClick={onButtonClick}>
        {
          options.map((option) => {
            return <ZFloatingMenuItem className={twclx([
              { "bg-blue-600 text-white": value?.value === option.value}
            ])} label={option.label} onClick={() => onOptionChange(option)} />
          })
        }
      </ZFloatingMenu>
    )
  },
)

export default ZDropdown
