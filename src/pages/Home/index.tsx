import { FC } from "react"
import Base from "./Base"

const Home: FC = () => {
  return <Base extraParams={{ archived: false }} />
}

export default Home
