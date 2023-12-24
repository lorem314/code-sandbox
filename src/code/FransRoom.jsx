import React, { useEffect, useLayoutEffect, useRef } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;

  > .divider {
    flex: 0 0 4px;
    background-color: rgba(0, 0, 0, 0.15);
    user-select: none;
    &:hover {
      background-color: #2c5c97;
      cursor: ew-resize;
    }
  }

  > .room {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const FransRoom = ({ children }) => {
  const rootRef = useRef(null)
  const leftRef = useRef(null)
  const dividerRef = useRef(null)
  const rightRef = useRef(null)

  useLayoutEffect(() => {
    const rootNode = rootRef.current
    console.log("root width ", rootNode.getBoundingClientRect().width)
  }, [])

  useEffect(() => {
    const rootNode = rootRef.current
    const leftNode = leftRef.current
    const dividerNode = dividerRef.current
    const rightNode = rightRef.current
    const rootRect = rootNode.getBoundingClientRect()

    const handleMouseMove = (event) => {
      const leftWidth = event.clientX - rootRect.left
      const rightWidth = rootRect.width - leftWidth
      console.log(`${leftWidth}, ${rightWidth}`)
      leftNode.style.flexBasis = leftWidth + "px"
      rightNode.style.flexBasis = rightWidth + "px"
    }
    const handleLeftMouseButtonUp = () => {
      rootNode.removeEventListener("mousemove", handleMouseMove)
      rootNode.addEventListener("mouseup", handleLeftMouseButtonUp)
    }
    const handleLeftMouseButtonDown = (event) => {
      if (event.button === 0) {
        console.log("left mouse button clicked")
        rootNode.addEventListener("mousemove", handleMouseMove)
        rootNode.addEventListener("mouseup", handleLeftMouseButtonUp)
      }
    }

    dividerNode.addEventListener("mousedown", handleLeftMouseButtonDown)
    return () => {
      dividerNode.removeEventListener("mousedown", handleLeftMouseButtonDown)
    }
  }, [])

  return (
    <Wrapper ref={rootRef}>
      <div className="room" ref={leftRef}>
        {children[0]}
      </div>
      <div className="divider" ref={dividerRef} />
      <div className="room" ref={rightRef}>
        {children[1]}
      </div>
    </Wrapper>
  )
}

export default FransRoom
