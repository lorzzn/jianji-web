import { css } from "@emotion/css"
import { RiArrowDownSLine, RiCloseLine } from "@remixicon/react"
import classNames from "classnames"
import { assign } from "lodash"
import { FC } from "react"
import Select, { Props } from "react-select"
import colors from "tailwindcss/colors"
import tw from "twin.macro"

export interface ZSelectProps extends Props {}

const ZSelect: FC<ZSelectProps> = ({
  placeholder = "请选择...",
  classNames: classes,
  theme: propTheme,
  components,
  ...restProps
}) => {
  return (
    <Select
      placeholder={placeholder}
      classNames={{
        ...classes,
        control: () => {
          return classNames([
            css`
              ${tw`text-sm !min-h-8`}
            `,
            classes?.control,
          ])
        },
        menu: () => {
          return classNames([
            css`
              ${tw`text-sm`}
            `,
            classes?.menu,
          ])
        },
        dropdownIndicator: () => {
          return classNames([
            css`
              padding-top: 0 !important;
              padding-bottom: 0 !important;
            `,
            classes?.dropdownIndicator,
          ])
        },
        multiValue: () => {
          return classNames([
            css`
              ${tw`h-5 leading-none flex items-center !bg-gray-100 border border-gray-200`}
            `,
            classes?.multiValue,
          ])
        },
        clearIndicator: () => {
          return classNames([
            css`
              padding-top: 0 !important;
              padding-bottom: 0 !important;
            `,
            classes?.dropdownIndicator,
          ])
        },
        multiValueRemove: () => {
          return classNames([
            css`
              height: 100%;
            `,
            classes?.dropdownIndicator,
          ])
        },
      }}
      components={{
        ...components,
        DropdownIndicator: (props) => {
          if (components?.DropdownIndicator) {
            return <components.DropdownIndicator {...props} />
          }
          return (
            <RiArrowDownSLine
              size={"1.2rem"}
              className={classNames([
                "mx-2",
                { "text-gray-400": !props.selectProps.menuIsOpen },
                { "text-gray-600": props.selectProps.menuIsOpen },
              ])}
            />
          )
        },
        ClearIndicator: (props) => {
          if (components?.ClearIndicator) {
            return <components.ClearIndicator {...props} />
          }
          return (
            <RiCloseLine
              size={"1.1rem"}
              onClick={props.clearValue}
              className={classNames([
                "mx-2 cursor-pointer hover:text-gray-500",
                { "text-gray-400": !props.selectProps.menuIsOpen },
                { "text-gray-600": props.selectProps.menuIsOpen },
              ])}
            />
          )
        },
      }}
      theme={(theme) => {
        theme.colors.primary = colors.blue[500]
        const propthemeRes = typeof propTheme === "function" ? propTheme(theme) : propTheme
        assign(theme, propthemeRes)
        return theme
      }}
      {...restProps}
    />
  )
}

export default ZSelect
