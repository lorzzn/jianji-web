import { IListPostsRequest } from "@/api/types/request/posts"
import ZEmpty from "@/components/ZEmpty/ZEmpty"
import ZPagination from "@/components/ZPagination/ZPagination"
import ZPostCard from "@/components/ZPostCard/ZPostCard"
import usePostList from "@/hooks/usePostList"
import eventBus from "@/utils/eventBus"
import { updateQueryString } from "@/utils/queryString"
import { isEmpty } from "lodash"
import queryString from "query-string"
import { FC, useEffect } from "react"
import { useLocation } from "react-router-dom"

interface BaseProps {
  extraParams?: Partial<IListPostsRequest>
}

const Base: FC<BaseProps> = ({ extraParams }) => {
  const location = useLocation()
  const queryParams = queryString.parse(location.search)
  const pageNo = Number(queryParams.page || 1)

  const { list, getList, pageInfo, totalPage, updatePageNo, loading } = usePostList(
    {
      pageNo,
      pageSize: 10,
    },
    extraParams,
  )

  useEffect(() => {
    getList()
  }, [])

  const onPageChange = (e: number) => {
    updatePageNo(e)
    updateQueryString("page", e)
    eventBus.emit("scrolltotop")
  }

  return isEmpty(list) && !loading ? (
    <div className="flex-1 flex place-content-center">
      <ZEmpty />
    </div>
  ) : (
    <>
      <div className="flex flex-col justify-start items-center mt-12 flex-1">
        {list.map((item) => (
          <ZPostCard post={item} key={item.uuid} />
        ))}
      </div>

      {/* 分页 */}
      <div className="flex flex-col justify-center items-center my-6">
        <div className="w-9/12 max-w-7xl">
          <ZPagination currentPage={pageInfo.pageNo} totalPage={totalPage} jumpSize={5} onPageChange={onPageChange} />
        </div>
      </div>
    </>
  )
}

export default Base
