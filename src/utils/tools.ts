import { NumericDictionary, PropertyPath, get, set } from "lodash"
export { css } from "@emotion/css"
export { default as styled } from "@emotion/styled"

export const preget: typeof get = (
  object: NumericDictionary<any> | undefined | null,
  path: PropertyPath,
  defaultValue?: any,
) => {
  const target = get(object, path)
  if (object && target === undefined) {
    set(object, path, defaultValue)
    return defaultValue
  }

  return target
}

export const arrayMoveItem = (arr: any[], sourceIndex: number, targetIndex: number) => {
  const sourceItem = arr.splice(sourceIndex, 1)[0]
  arr.splice(targetIndex, 0, sourceItem)
  return arr
}
