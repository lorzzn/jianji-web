import { Key } from "ts-key-enum"

export const onCtrl = (key: string | number) => {
  return `${Key.Control}+${key}`
}

export const onShift = (key: string | number) => {
  return `${Key.Shift}+${key}`
}
