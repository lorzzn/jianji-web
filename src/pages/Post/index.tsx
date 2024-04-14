import { useStore } from "@/store"
import { uuidjs } from "@/utils/uuid"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const Post = () => {
  const { postStore } = useStore()
  const {
    getFromRemote
  } = postStore

  const { uuid: uuidparam } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (uuidparam && uuidjs.validate(uuidparam)) {
      getFromRemote(uuidparam)
    } else { 
      // 404
      navigate("/404")
    }
  }, [ uuidparam ])

  return <div>

  </div>
}

export default Post
