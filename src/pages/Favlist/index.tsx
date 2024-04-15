import { FC } from "react"
import Base from "../Home/Base"

const Home: FC = () => {
  return <Base extraParams={{
    favoured: true,
    archived: undefined,
  }} />
}

export default Home
