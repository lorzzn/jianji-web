import { twclx } from "@/utils/twclx"
import { FC, useState } from "react"
import ZButton from "../ZButton/ZButton"

interface JumperButtonProps {
  pageNumber: number
  current: number
  handlePageChange: (page: number) => void
}

const JumperButton: FC<JumperButtonProps> = ({ pageNumber, current, handlePageChange }) => {
  const onButtonClick = (): void => {
    if (pageNumber !== current) {
      handlePageChange(current)
    }
  }

  return (
    <ZButton
      key={current}
      onClick={onButtonClick}
      variant={"primary_plain"}
      className={twclx([
        "p-1 mx-1 rounded-none min-w-8 ",
        { "cursor-not-allowed font-semibold underline": pageNumber === current },
      ])}
    >
      {current}
    </ZButton>
  )
}

export interface ZPaginationProps {
  currentPage: number
  totalPage: number
  onPageChange: (page: number) => void
  jumpSize?: number
}

const ZPagination: FC<ZPaginationProps> = ({ currentPage, totalPage, onPageChange, jumpSize = 5 }) => {
  const [pageNumber, setPageNumber] = useState<number>(currentPage)
  const totalJumpPages = Math.ceil(totalPage / jumpSize)

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPage) {
      setPageNumber(page)
      onPageChange(page)
    }
  }

  const renderJumpButtons = (): JSX.Element[] => {
    const buttons: JSX.Element[] = []

    if (totalJumpPages <= 1) {
      for (let i = 1; i <= totalPage; i++) {
        buttons.push(<JumperButton key={i} current={i} pageNumber={pageNumber} handlePageChange={handlePageChange} />)
      }
    } else {
      let start = 1
      let end = totalPage

      if (totalPage > jumpSize) {
        start = Math.max(1, pageNumber - Math.floor(jumpSize / 2))
        end = Math.min(totalPage, start + jumpSize - 1)

        if (end - start + 1 < jumpSize) {
          start = end - jumpSize + 1
        }

        if (start > 1) {
          buttons.push(
            <JumperButton key={"first"} current={1} pageNumber={pageNumber} handlePageChange={handlePageChange} />,
          )

          if (start > 2) {
            buttons.push(
              <span key="start_ellipsis" className="mx-1 pointer-events-none">
                ...
              </span>,
            )
          }
        }
      }

      for (let i = start; i <= end; i++) {
        buttons.push(<JumperButton key={i} current={i} pageNumber={pageNumber} handlePageChange={handlePageChange} />)
      }

      if (end < totalPage) {
        if (end < totalPage - 1) {
          buttons.push(
            <span key="end_ellipsis" className="mx-1 pointer-events-none">
              ...
            </span>,
          )
        }

        buttons.push(
          <JumperButton
            key={totalPage}
            current={totalPage}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
          />,
        )
      }
    }

    return buttons
  }

  return (
    <div className="flex items-center justify-between mt-4">
      <ZButton
        onClick={() => handlePageChange(pageNumber - 1)}
        variant={"primary_plain"}
        className="shrink-0"
        disabled={pageNumber === 1}
      >
        上一页
      </ZButton>
      <div className="flex flex-wrap">{renderJumpButtons()}</div>
      <ZButton
        onClick={() => handlePageChange(pageNumber + 1)}
        variant={"primary_plain"}
        className="shrink-0"
        disabled={pageNumber === totalPage}
      >
        下一页
      </ZButton>
    </div>
  )
}

export default ZPagination
