import { apiPosts } from "@/api/posts"
import { IListPostsRequest } from "@/api/types/request/posts"
import { IPageInfo } from "@/api/types/response/pageInfo"
import { IPost } from "@/api/types/response/posts"
import errorHandler from "@/utils/errorHandler"
import { assign } from "lodash"
import { useMemo, useState } from "react"

const usePostList = (initPageInfo: Partial<IPageInfo>, extraParams: Partial<IListPostsRequest> = {}) => {
  const [list, setList] = useState<IPost[]>([])
  const [loading, setLoading] = useState(false)
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    pageNo: initPageInfo.pageNo || 1,
    pageSize: initPageInfo.pageSize || 10,
    totalCount: 0,
  })

  const totalPage = useMemo(
    () => (pageInfo.totalCount && pageInfo.pageSize && Math.ceil(pageInfo.totalCount / pageInfo.pageSize)) || 0,
    [pageInfo],
  )

  // 获取列表
  const getList = async (data?: IListPostsRequest) => {
    setLoading(true)
    try {
      setList([])
      const payload = data || {
        pageNo: pageInfo.pageNo,
        pageSize: pageInfo.pageSize,
      }
      assign(payload, extraParams)
      const res = await apiPosts.list(payload)
      setList(res.data.data.data)
      setPageInfo(res.data.data.pageInfo)
      return Promise.resolve(res)
    } catch (error) {
      errorHandler.handle(error)
      return Promise.reject(error)
    } finally {
      setLoading(false)
    }
  }

  const nextPage = async () => {
    if (pageInfo.pageNo && pageInfo.pageNo < totalPage) {
      getList({
        pageNo: pageInfo.pageNo + 1,
        pageSize: pageInfo.pageSize,
      })
    }
  }

  const prevPage = async () => {
    if (pageInfo.pageNo && pageInfo.pageNo > 1) {
      getList({
        pageNo: pageInfo.pageNo - 1,
        pageSize: pageInfo.pageSize,
      })
    }
  }

  const updatePageNo = async (pageNo: number) => {
    if (pageNo > 0 && pageNo <= totalPage) {
      getList({
        pageNo,
        pageSize: pageInfo.pageSize,
      })
    }
  }

  const updatePageSize = async (pageSize: number) => {
    if (pageSize > 0) {
      getList({
        pageSize,
        pageNo: 1,
      })
    }
  }

  return {
    list,
    loading,
    pageInfo,
    totalPage,
    getList,
    nextPage,
    prevPage,
    updatePageNo,
    updatePageSize,
  }
}

export default usePostList
