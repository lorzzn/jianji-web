import dayjs from "dayjs"

export const dateFormat = (date: dayjs.ConfigType, template: string = "YYYY/MM/DD HH:mm:ss"): string => {
  return dayjs(date).format(template)
}
