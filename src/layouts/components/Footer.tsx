import dayjs from "dayjs"
import { FC } from "react"

const Footer: FC = () => {
  const getAppRunningYears = (): string => {
    const startYear = 2024
    const nowYear = dayjs().year()

    if (startYear === nowYear) {
      return nowYear.toString()
    } else {
      return `${startYear} - ${nowYear}`
    }
  }

  return (
    <div className="w-full h-24 flex flex-col justify-center items-center">
      <div className="text-sm text-gray-800">Copyright © {getAppRunningYears()} 简记</div>
    </div>
  )
}

export default Footer
