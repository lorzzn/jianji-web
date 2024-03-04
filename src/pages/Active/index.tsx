import { isNull, some, values } from "lodash";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Active:FC = () => {

  const query = new URLSearchParams(window.location.search)
  const navigate = useNavigate()

  const params = {
    email: query.get("email"),
    state: query.get("state")
  }

  useEffect(() => {
    if (some(values(params), isNull)) {
      navigate("/")
    }
  }, [])

  return <div>
    active
  </div>
}

export default Active
