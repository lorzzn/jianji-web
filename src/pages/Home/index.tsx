import ZPagination from "@/components/ZPagination/ZPagination"
import ZPostCard from "@/components/ZPostCard/ZPostCard"
import usePostList from "@/hooks/usePostList"
import { FC, useEffect } from "react"

const Home: FC = () => {

  const { list, getList, pageInfo, totalPage, updatePageNo } = usePostList({
    pageNo: 1,
    pageSize: 10,
  })

  useEffect(() => {
    getList()
  }, [])

  const onPageChange = (e: number) => {
    updatePageNo(e)
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-12 flex-1">
        {
          list.map(item => <ZPostCard post={item} key={item.uuid} />)
        }
      </div>

      {/* 分页 */}
      <div className="flex flex-col justify-center items-center my-6">
        <div className="w-9/12 max-w-7xl">
          <ZPagination currentPage={pageInfo.pageNo} totalPage={totalPage} jumpSize={5} onPageChange={onPageChange}/>
        </div>
      </div>
    </>
  )
}

export default Home
