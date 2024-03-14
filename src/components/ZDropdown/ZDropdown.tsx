import classNames from "classnames"
import { omit } from "lodash"
import { CSSProperties, ReactNode, forwardRef, useImperativeHandle, useRef, useState } from "react"
import Select, { ClassNamesConfig, SelectInstance, SingleValue, StylesConfig } from "react-select"
import { twMerge } from "tailwind-merge"

export interface DropdownOption {
  readonly value: string
  readonly label: string
  readonly style?: CSSProperties
  readonly selectable?: boolean
}

interface ZDropdownProps {
  target?: ReactNode
  options: DropdownOption[]
  onChange?: (option: DropdownOption) => void
  onClick?: (type: "target" | "option", option?: DropdownOption) => void
  classNames?: ClassNamesConfig<DropdownOption, false>
}

const selectStyles: StylesConfig<DropdownOption, false> = {
  control: () => ({ display: "none" }),
  menu: () => ({}),
  option: (base, props) => {
    return {
      ...base,
      ...props.data.style,
    }
  },
}

export interface ZDropdownRef {
  open: () => void
  close: () => void
}

const ZDropdown = forwardRef<ZDropdownRef, ZDropdownProps>(
  ({ target, options, onChange, onClick, classNames: propClassNames }, ref) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<DropdownOption | null>(null)
    const selectRef = useRef<SelectInstance<DropdownOption> | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)
    const onButtonClick = () => {
      ;(open ? onClose : onOpen)()
      onClick?.("target")
    }

    const onSelectChange = (item: SingleValue<DropdownOption>) => {
      if (item?.selectable) {
        setValue(item)
        onChange?.(item)
      }
      if (item) {
        onClick?.("option", item)
      }
      onClose()
    }

    const selectClassNames: ClassNamesConfig<DropdownOption, false> = {
      menu: (props) => twMerge(classNames(["bg-white rounded-md shadow-md", propClassNames?.menu?.(props)])),
      menuList: (props) => twMerge(classNames(["px-[4px]", propClassNames?.menuList?.(props)])),
      option: (props) =>
        twMerge(
          classNames([
            "text-center rounded-md hover:text-blue-600 !text-sm !cursor-pointer",
            propClassNames?.option?.(props),
          ]),
        ),
      ...omit(propClassNames, "menu", "menuList", "option"),
    }

    useImperativeHandle(ref, () => ({
      close: onClose,
      open: onOpen,
    }))

    return (
      <div className="relative">
        <button ref={buttonRef} onClick={onButtonClick}>
          {target}
        </button>
        {open && (
          <div className="absolute">
            <button className="fixed inset-0 cursor-default" onClick={onClose}></button>
            <Select
              ref={selectRef}
              styles={selectStyles}
              classNames={selectClassNames}
              menuIsOpen
              options={options}
              onChange={onSelectChange}
              value={value}
            />
          </div>
        )}
      </div>
    )
  },
)

export default ZDropdown
