import { css } from "@emotion/css"
import { cva } from "class-variance-authority"
import classNames from "classnames"
import tw from "twin.macro"

export const inputVariant = cva(classNames("border border-[#ccc] outline-none ring-0 transition-shadow duration-100"), {
  variants: {
    variant: {
      primary: css`
        &:not(.is-disabled) {
          ${tw`hover:border-gray-400`}
          &.is-focus {
            ${tw`ring-1 ring-blue-500 border-blue-500`}
          }
        }
      `,
      success: css`
        &:not(.is-disabled) {
          ${tw`hover:border-gray-400`}
          &.is-focus {
            ${tw`ring-1 ring-green-500 border-green-500`}
          }
        }
      `,
      danger: css`
        &:not(.is-disabled) {
          ${tw`hover:border-gray-400`}
          &.is-focus {
            ${tw`ring-1 ring-red-500 border-red-500`}
          }
        }
      `,
    },
    scale: {
      small: css`
        & input {
          ${tw`h-6 px-2 text-xs`}
        }
        & .z-input-clear-icon {
          ${tw`mr-2`}
        }
      `,
      middle: css`
        & input {
          ${tw`h-8 px-2 text-sm`}
        }
        & .z-input-clear-icon {
          ${tw`mr-2`}
        }
      `,
      large: css`
        & input {
          ${tw`h-10 px-3 text-base`}
        }
        & .z-input-clear-icon {
          ${tw`mr-3`}
        }
      `,
    },
    shape: {
      round: css`
        ${tw`rounded-full px-4`}
      `,
      square: classNames("rounded-e rounded-s"),
    },
  },
  defaultVariants: {
    variant: "primary",
    scale: "middle",
    shape: "square",
  },
})
