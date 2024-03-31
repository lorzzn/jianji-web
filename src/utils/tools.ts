import { NumericDictionary, PropertyPath, get, set } from "lodash"
export { css } from "@emotion/css"

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
