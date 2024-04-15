import { FC } from "react"
import Base from "../Home/Base"

const Home: FC = () => {
  return <Base extraParams={{
    archived: true,
  }} />
}

export default Home
