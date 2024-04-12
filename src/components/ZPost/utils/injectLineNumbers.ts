// https://github.com/markdown-it/markdown-it/blob/master/support/demo_template/index.mjs#L129

export const injectLineNumbers = (md: MarkdownIt) => {
  function func(tokens: any, idx: number, options: MarkdownIt.Options, env: any, slf: any) {
    let line
    if (tokens[idx].map && tokens[idx].level === 0) {
      line = tokens[idx].map[0]
      tokens[idx].attrJoin("class", "line")
      tokens[idx].attrSet("data-line", String(line))
    }
    return slf.renderToken(tokens, idx, options, env, slf)
  }

  md.renderer.rules.paragraph_open = func
  md.renderer.rules.heading_open = func
  md.renderer.rules.list_item_open = func
  md.renderer.rules.table_open = func
}
