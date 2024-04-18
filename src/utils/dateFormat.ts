import dayjs from "dayjs"

export const dateFormat = (date: dayjs.ConfigType, template: string = "YYYY/MM/DD HH:mm:ss"): string => {
  if (dayjs(date).isValid()) {
    return dayjs(date).format(template)
  }
  return ""
}
