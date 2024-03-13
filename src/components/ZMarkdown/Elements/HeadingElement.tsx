import { RenderElementProps } from 'slate-react'

const HeadingElement = (props: RenderElementProps) => {
  if (props.element.type !== 'heading') return
  
  const CustomTag = `h${props.element.depth}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  
  return <CustomTag>{props.children}</CustomTag>
}

export default HeadingElement
