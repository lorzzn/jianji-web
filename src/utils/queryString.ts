export function updateQueryString(key: string, value: string | number) {
  const searchParams = new URLSearchParams(window.location.search)

  if (searchParams.has(key)) {
    searchParams.set(key, value+"")
  } else {
    searchParams.append(key, value+"")
  }

  const newUrl = window.location.pathname + "?" + searchParams.toString()

  window.history.pushState({ path: newUrl }, "", newUrl)
}
