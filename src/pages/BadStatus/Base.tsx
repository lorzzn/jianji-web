import ZButton from "@/components/ZButton/ZButton"
import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import { useNavigate } from "react-router-dom"
import tw from "twin.macro"
import { randomString } from "@/utils/stringGenerator"
import useMouseEvents from 'beautiful-react-hooks/useMouseEvents';
import { observer } from "mobx-react"
import { useStore } from "@/store"
import { FC, useState } from "react"

const errorStyleTextLen = 60
const errorStyleText = randomString(errorStyleTextLen, "~!@#$%^&*")

interface BaseProps {
  title: string
  description: string
}

const Base:FC<BaseProps> = observer(({ title, description}) => {
  const { layoutStore } = useStore()
  const { width } = layoutStore
  const [dynamicText, setDynamicText] = useState(errorStyleText.slice(0, 10))

  const { onMouseMove } = useMouseEvents()

  onMouseMove((e) => {
    if (width) {
      const percentage = Math.abs(e.screenX) / width
      setDynamicText(
        errorStyleText.slice(errorStyleTextLen*percentage, errorStyleTextLen*(percentage)+10)
      )
    }
  })

  const navigate = useNavigate()
  const goHome = () => {
    navigate("/")
  }

  return <div className="flex-1 flex justify-center items-center">
    <div className={twclx([
      css`
        font-family: RobotoCondensed Bold, Trebuchet MS, Helvetica, Arial, sans-serif;
        ${tw`text-4xl font-bold relative break-words w-fit`}
      `
    ])}>
      <div>{title} </div>
      <div className="absolute -right-20 -top-2 text-6xl">
        {":-("}
      </div>
      <div className="ml-20 text-2xl">
        <div>{description}</div>
        <div className="opacity-10 py-3">
          <span>{dynamicText}</span>
        </div>
        <ZButton variant={"primary_plain"} className="p-0 text-xl" onClick={goHome}>回到首页</ZButton>
      </div>
    </div>
  </div>
})

export default Base
