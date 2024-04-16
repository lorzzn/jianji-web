import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import { VariantProps, cva } from "class-variance-authority"
import { FC, HTMLAttributes } from "react"

const faceVariants = cva(twclx(["inset-0 border absolute"]), {
  variants: {
    faceTo: {
      front: css`
        width: var(--var-cube-border-width);
        height: var(--var-cube-height);
        transform: rotateY(180deg) translateZ(calc(var(--var-cube-border-width) / 2));
      `,
      back: css`
        width: var(--var-cube-border-width);
        height: var(--var-cube-height);
        transform: rotateY(0deg) translateZ(calc(var(--var-cube-border-width) / 2));
      `,
      right: css`
        width: var(--var-cube-border-width);
        height: var(--var-cube-height);
        transform: rotateY(90deg) translateZ(calc(var(--var-cube-border-width) / 2));
      `,
      left: css`
        width: var(--var-cube-border-width);
        height: var(--var-cube-height);
        transform: rotateY(-90deg) translateZ(calc(var(--var-cube-border-width) / 2));
      `,
      top: css`
        width: var(--var-cube-border-width);
        height: var(--var-cube-border-width);
        transform: rotateX(90deg) translateZ(calc(var(--var-cube-border-width) / 2));
      `,
      bottom: css`
        width: var(--var-cube-border-width);
        height: var(--var-cube-border-width);
        transform: rotateX(-90deg) translateZ(calc(var(--var-cube-border-width) / 2));
      `,
    },
  },
  defaultVariants: {
    faceTo: "front",
  },
})

interface FaceProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof faceVariants> {}

const Face: FC<FaceProps> = ({ faceTo }) => {
  return <div className={twclx([`cube-face face-${faceTo}`, faceVariants({ faceTo })])}></div>
}

interface CubeProps extends HTMLAttributes<HTMLDivElement> {
  borderWidth?: string
}

const Cube: FC<CubeProps> = ({ className, borderWidth = "20px", ...restProps }) => {
  return (
    <div
      className={twclx([
        "transform-style-3d relative flex justify-center items-center",
        className,
        css`
          --var-cube-border-width: ${borderWidth};
          width: var(--var-cube-border-width);
          height: var(--var-cube-border-width);
        `,
      ])}
      {...restProps}
    >
      <Face faceTo={"front"} />
      <Face faceTo={"back"} />
      <Face faceTo={"right"} />
      <Face faceTo={"left"} />
      <Face faceTo={"top"} />
      <Face faceTo={"bottom"} />
    </div>
  )
}

export default Cube
