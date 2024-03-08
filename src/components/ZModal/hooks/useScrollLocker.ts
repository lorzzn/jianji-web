import { updateCSS, removeCSS } from 'rc-util/lib/Dom/dynamicCSS';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import { getTargetScrollBarSize } from 'rc-util/lib/getScrollBarSize';
import { isBodyOverflowing } from '@/utils/body';
import { useMemo } from 'react';

const UNIQUE_ID = `rc-util-locker-${Date.now()}`
let uuid = 0

export default function useScrollLocker(lock?: boolean) {
  const mergedLock = lock
  const id = useMemo(() => `${UNIQUE_ID}_${uuid++}`, [])

  useLayoutEffect(() => {
    if (mergedLock) {
      const scrollbarSize = getTargetScrollBarSize(document.body).width
      const isOverflow = isBodyOverflowing()
      updateCSS(`
html body {
  overflow-y: hidden;
  ${isOverflow ? `width: calc(100% - ${scrollbarSize}px);` : ''}
}
html body .react-responsive-modal-root {
  ${isOverflow ? `left: -${scrollbarSize}px;` : ''}
}`, id)
    } else {
      removeCSS(id)
    }

    return () => {
      removeCSS(id)
    }
  }, [mergedLock, id])
}
