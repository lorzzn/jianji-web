import classNames from "classnames"
import { FC, ReactNode } from "react"
import styles from "./index.module.scss"

interface ZFormProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  children: ReactNode
}

const ZForm: FC<ZFormProps> = ({ children, className, ...restProps }) => {
  return (
    <form className={classNames(styles.ZForm, className)} {...restProps}>
      {children}
    </form>
  )
}

export default ZForm
