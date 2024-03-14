interface HTMLJsonObject {
  tag: string
  text: string
  attrs: Record<string, string>
  children: HTMLJsonObject[]
}

function htmlToJson(htmlString: string): HTMLJsonObject {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, "text/html")

  function parseNode(elem: HTMLElement): HTMLJsonObject {
    const result: HTMLJsonObject = {
      tag: elem.tagName?.toLowerCase(),
      text: elem.textContent?.trim() ?? "",
      attrs: {},
      children: [],
    }

    if (elem.nodeType === Node.TEXT_NODE) {
      result.text = elem.textContent?.trim() ?? ""
      result.tag = "text"
    } else if (elem.nodeType === Node.ELEMENT_NODE) {
      result.tag = elem.tagName.toLowerCase()

      if (elem.childNodes.length > 0) {
        result.children = Array.from(elem.childNodes).map((child) => parseNode(child as HTMLElement))
      }

      if (elem.attributes.length > 0) {
        result.attrs = {}
        Array.from(elem.attributes).forEach((attr) => {
          if (result.attrs) {
            result.attrs[attr.name] = attr.value
          }
        })
      }
    } else if (elem.nodeType === Node.COMMENT_NODE) {
      result.text = elem.textContent?.trim() ?? ""
      result.tag = "comment"
    }

    return result
  }

  const jsonResult: HTMLJsonObject = parseNode(doc.body)
  return jsonResult
}
