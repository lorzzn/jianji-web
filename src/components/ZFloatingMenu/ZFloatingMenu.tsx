// https://codesandbox.io/p/sandbox/admiring-lamport-5wt3yg

import { css } from "@emotion/css"
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from "@floating-ui/react"
import { RiArrowRightSLine } from "@remixicon/react"
import {
  ButtonHTMLAttributes,
  createContext,
  Dispatch,
  forwardRef,
  HTMLProps,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import tw from "twin.macro"

const RootMenuCSS = css`
  ${tw`p-1 rounded-md border border-blue-100`}

  &[data-open],
  &:hover {
    ${tw`bg-blue-500 text-white`}
  }
`

const MenuCSS = css`
  ${tw`bg-white p-1 border rounded-md shadow-md z-[1000]`}
`

const MenuItemCSS = css`
  ${tw`flex justify-between items-center w-full rounded min-w-28 p-1`}

  &[disabled] {
    ${tw`cursor-not-allowed text-gray-400`}
  }

  &:focus,
  &[data-nested][data-open]:not([data-focus-inside]),
  &[data-focus-inside][data-open] {
    ${tw`bg-blue-500 text-white`}
  }
`

const ZFloatingMenuContext = createContext<{
  getItemProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>
  activeIndex: number | null
  setActiveIndex: Dispatch<SetStateAction<number | null>>
  setHasFocusInside: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}>({
  getItemProps: () => ({}),
  activeIndex: null,
  setActiveIndex: () => {},
  setHasFocusInside: () => {},
  isOpen: false,
})

interface ZFloatingMenuProps {
  label?: string
  nested?: boolean
  children?: ReactNode
  contextMenuTrigger?: MutableRefObject<HTMLElement | null>
}

interface ZFloatingMenuRef {
  show: () => void
  hide: () => void
  current: HTMLButtonElement | null
}

export const ZFloatingMenuComponent = forwardRef<ZFloatingMenuRef, ZFloatingMenuProps & HTMLProps<HTMLButtonElement>>(
  ({ children, label, contextMenuTrigger, ...props }, forwardedRef) => {
    const nodeRef = useRef<HTMLButtonElement | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [hasFocusInside, setHasFocusInside] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const elementsRef = useRef<Array<HTMLButtonElement | null>>([])
    const labelsRef = useRef<Array<string | null>>([])
    const parent = useContext(ZFloatingMenuContext)

    const tree = useFloatingTree()
    const nodeId = useFloatingNodeId()
    const parentId = useFloatingParentNodeId()
    const item = useListItem()

    const isNested = parentId != null

    const { floatingStyles, refs, context } = useFloating<HTMLButtonElement>({
      nodeId,
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: isNested ? "right-start" : "bottom-start",
      middleware: [offset({ mainAxis: isNested ? 0 : 4, alignmentAxis: isNested ? -4 : 0 }), flip(), shift()],
      whileElementsMounted: autoUpdate,
    })

    const hover = useHover(context, {
      enabled: isNested,
      delay: { open: 75 },
      handleClose: safePolygon({ blockPointerEvents: true }),
    })
    const click = useClick(context, {
      event: "mousedown",
      toggle: !isNested,
      ignoreMouse: isNested,
    })
    const role = useRole(context, { role: "menu" })
    const dismiss = useDismiss(context, { bubbles: true })
    const listNavigation = useListNavigation(context, {
      listRef: elementsRef,
      activeIndex,
      nested: isNested,
      onNavigate: setActiveIndex,
    })
    const typeahead = useTypeahead(context, {
      listRef: labelsRef,
      onMatch: isOpen ? setActiveIndex : undefined,
      activeIndex,
    })

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
      hover,
      click,
      role,
      dismiss,
      listNavigation,
      typeahead,
    ])

    // Event emitter allows you to communicate across tree components.
    // This effect closes all menus when an item gets clicked anywhere
    // in the tree.
    useEffect(() => {
      if (!tree) return

      function handleTreeClick() {
        setIsOpen(false)
      }

      function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
        if (event.nodeId !== nodeId && event.parentId === parentId) {
          setIsOpen(false)
        }
      }

      tree.events.on("click", handleTreeClick)
      tree.events.on("menuopen", onSubMenuOpen)

      return () => {
        tree.events.off("click", handleTreeClick)
        tree.events.off("menuopen", onSubMenuOpen)
      }
    }, [tree, nodeId, parentId])

    useEffect(() => {
      if (isOpen && tree) {
        tree.events.emit("menuopen", { parentId, nodeId })
      }
    }, [tree, isOpen, nodeId, parentId])

    const allowMouseUpCloseRef = useRef<boolean>()

    useEffect(() => {
      if (!contextMenuTrigger?.current) return
      const triggerElement = contextMenuTrigger.current
      let timeout: number

      const onContextMenu = (e: MouseEvent) => {
        e.preventDefault()

        refs.setPositionReference({
          getBoundingClientRect() {
            return {
              width: 0,
              height: 0,
              x: e.clientX,
              y: e.clientY,
              top: e.clientY,
              right: e.clientX,
              bottom: e.clientY,
              left: e.clientX,
            }
          },
        })

        setIsOpen(true)
        clearTimeout(timeout)

        allowMouseUpCloseRef.current = false
        timeout = window.setTimeout(() => {
          allowMouseUpCloseRef.current = true
        }, 300)
      }

      function onMouseUp() {
        if (allowMouseUpCloseRef.current) {
          setIsOpen(false)
        }
      }

      triggerElement.addEventListener("contextmenu", onContextMenu)
      triggerElement.addEventListener("mouseup", onMouseUp)
      return () => {
        triggerElement.removeEventListener("contextmenu", onContextMenu)
        triggerElement.removeEventListener("mouseup", onMouseUp)
        clearTimeout(timeout)
      }
    }, [refs])

    const show = () => setIsOpen(true)
    const hide = () => setIsOpen(false)
    useImperativeHandle(forwardedRef, () => ({ show, hide, current: nodeRef.current }))

    return (
      <FloatingNode id={nodeId}>
        <button
          ref={useMergeRefs([refs.setReference, item.ref, nodeRef])}
          tabIndex={!isNested ? undefined : parent.activeIndex === item.index ? 0 : -1}
          role={isNested ? "menuitem" : undefined}
          data-open={isOpen ? "" : undefined}
          data-nested={isNested ? "" : undefined}
          data-focus-inside={hasFocusInside ? "" : undefined}
          className={label && (isNested ? MenuItemCSS : RootMenuCSS)}
          {...getReferenceProps(
            parent.getItemProps({
              ...props,
              onFocus(event: React.FocusEvent<HTMLButtonElement>) {
                props.onFocus?.(event)
                setHasFocusInside(false)
                parent.setHasFocusInside(true)
              },
            }),
          )}
        >
          {label}
          {isNested && <RiArrowRightSLine size={"1.2rem"} />}
        </button>
        <ZFloatingMenuContext.Provider
          value={{
            activeIndex,
            setActiveIndex,
            getItemProps,
            setHasFocusInside,
            isOpen,
          }}
        >
          <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
            {isOpen && (
              <FloatingPortal>
                <FloatingFocusManager
                  context={context}
                  modal={false}
                  initialFocus={isNested ? -1 : 0}
                  returnFocus={!isNested}
                >
                  <div ref={refs.setFloating} className={MenuCSS} style={floatingStyles} {...getFloatingProps()}>
                    {children}
                  </div>
                </FloatingFocusManager>
              </FloatingPortal>
            )}
          </FloatingList>
        </ZFloatingMenuContext.Provider>
      </FloatingNode>
    )
  },
)

interface ZFloatingMenuItemProps {
  label: string
  disabled?: boolean
}

export const ZFloatingMenuItem = forwardRef<
  HTMLButtonElement,
  ZFloatingMenuItemProps & ButtonHTMLAttributes<HTMLButtonElement>
>(({ label, disabled, ...props }, forwardedRef) => {
  const menu = useContext(ZFloatingMenuContext)
  const item = useListItem({ label: disabled ? null : label })
  const tree = useFloatingTree()
  const isActive = item.index === menu.activeIndex

  return (
    <button
      {...props}
      ref={useMergeRefs([item.ref, forwardedRef])}
      type="button"
      role="menuitem"
      className={MenuItemCSS}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      {...menu.getItemProps({
        onClick(event: React.MouseEvent<HTMLButtonElement>) {
          props.onClick?.(event)
          tree?.events.emit("click")
        },
        onFocus(event: React.FocusEvent<HTMLButtonElement>) {
          props.onFocus?.(event)
          menu.setHasFocusInside(true)
        },
      })}
    >
      {label}
    </button>
  )
})

export const ZFloatingMenu = forwardRef<ZFloatingMenuRef, ZFloatingMenuProps & HTMLProps<HTMLButtonElement>>(
  (props, ref) => {
    const parentId = useFloatingParentNodeId()

    if (parentId === null) {
      return (
        <FloatingTree>
          <ZFloatingMenuComponent {...props} ref={ref} />
        </FloatingTree>
      )
    }

    return <ZFloatingMenuComponent {...props} ref={ref} />
  },
)
