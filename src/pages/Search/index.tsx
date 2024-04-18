import ZButton from "@/components/ZButton/ZButton"
import ZInput, { ZInputProps } from "@/components/ZInput/ZInput"
import { updateQueryString } from "@/utils/queryString"
import queryString from "query-string"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Base from "../Home/Base"

const Search = () => {
  const [keyword, setkeyword] = useState("")
  const [queryKeyword, setQueryKeyword] = useState("")

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = queryString.parse(location.search)
    const kw = String(queryParams.keyword || "")

    setkeyword(kw)
    setQueryKeyword(kw)
  }, [location])

  const onKeywordInputChange: ZInputProps["onChange"] = (e) => {
    setkeyword(e.target.value)
  }

  const goSearchResult = () => {
    if (!keyword) {
      toast.error("请输入搜索关键词")
      return
    }
    updateQueryString("keyword", keyword)
    navigate(`/search?keyword=${keyword}`, { replace: true })
  }

  return (
    <>
      <div className="flex justify-center m-12">
        <div className="w-9/12 max-w-7xl">
          <div className="flex items-center space-x-2 w-full justify-center">
            <ZInput
              showClearIcon="not-empty"
              scale={"large"}
              className={"w-6/12"}
              value={keyword}
              onChange={onKeywordInputChange}
              onClear={() => setkeyword("")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  goSearchResult()
                }
              }}
            />
            <ZButton scale={"large"} className="px-8 ring-1 ring-blue-500" onClick={goSearchResult}>
              搜索
            </ZButton>
          </div>
        </div>
      </div>

      {!!queryKeyword && (
        <Base
          key={queryKeyword}
          extraParams={{
            keyword: queryKeyword,
          }}
        />
      )}
    </>
  )
}

export default Search
