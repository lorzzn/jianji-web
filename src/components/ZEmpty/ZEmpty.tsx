import { RiBox3Line } from "@remixicon/react"
import { observer } from "mobx-react"
import { FC } from "react"

interface ZEmptyProps {
  text?: string
}

const ZEmpty: FC<ZEmptyProps> = observer(({ text = "这里空空如也~" }) => {
  // const { layoutStore } = useStore()
  // const { width } = layoutStore
  // const [rotateDeg, setRotateDeg] = useState(0)
  // const [fastRotating, setFastRotating] = useState(false)

  // const { onMouseMove } = useMouseEvents()

  // const resetRotatingTimer = useRef<ReturnType<typeof setTimeout>>()

  // useEffect(() => {
  //   if (resetRotatingTimer.current) {
  //     clearTimeout(resetRotatingTimer.current)
  //   }
  //   setFastRotating(true)

  //   resetRotatingTimer.current = setTimeout(() => {
  //     setFastRotating(false)
  //   }, 300)

  // }, [rotateDeg])

  // onMouseMove((e) => {
  //   if (width) {
  //     const percentage = Math.abs(e.screenX) / width
  //     setRotateDeg(3 * 360 * percentage | 0)
  //   }
  // })

  return (
    <div className="flex flex-col justify-center items-center space-y-4 text-gray-500 text-lg">
      {/* <motion.div
        className={`transform-gpu will-change-transform`}
        variants={{
          zoomOut: { transform: "scale(1.2)" },
          normal: { transform: "scale(1)" },
        }}
        initial="normal"
        animate={fastRotating ? "zoomOut" : "normal"}
      >
        <Cube
          borderWidth={"2rem"}
          className={twclx([
            "transform-gpu will-change-transform",
            css`
              transform: rotateX(-12deg) rotateY(${rotateDeg-12}deg);
              & .cube-face {
                ${tw`border bg-white border-gray-500 ring-inset `}
              }
              & .cube-face.face-top {
                display: none;
              }
            `,
          ])}
        />
      </motion.div> */}
      <RiBox3Line size={"3rem"} className="stroke-white" />
      <span>{text}</span>
    </div>
  )
})

export default ZEmpty
