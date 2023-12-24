import React, {
  useEffect,
  useRef,
  useId,
  useState,
  useLayoutEffect,
  useCallback,
} from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { clsx } from "../utils"

const Wrapper = styled.div`
  --border-radius: 0.25em;

  max-width: 100%;
  margin: 0.25rem 0;
  /* border: 1px solid rgba(255, 255, 255, 0.1); */

  display: flex;
  align-items: center;

  label {
    flex: 0 0 auto;
    padding: 0 0.5em;
  }

  > .controller {
    flex: 1 1 auto;

    display: flex;

    border-radius: 0.125em 0.125em 0.125em 0.125em;
    background-color: hsl(0deg 0% 33%);

    &:hover {
      background-color: hsl(0deg 0% 47%);
      > button {
        opacity: 1;
        background-color: hsl(0deg 0% 40%);
      }
    }
    &:active {
      background-color: hsl(0deg 0% 16%);
      > button {
        opacity: 1;
        background-color: hsl(0deg 0% 13%);
      }
    }

    > .chevron-left-btn {
      border-radius: var(--border-radius) 0 0 var(--border-radius);
    }
    > .chevron-right-btn {
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
    }
    > .number-input {
      flex: 1 1 auto;

      color: currentColor;
      padding: 0 0.25em;
      text-align: center;
      cursor: ew-resize;

      display: inline-flex;

      &.is-editing {
        text-align: left;
      }
    }
  }

  button {
    cursor: initial;
    flex: 0 0 auto;
    background: none;
    border: none;
    padding: 0;
    outline: none;
    opacity: 0;
    color: inherit;
    background-color: transparent;
  }
  input[type="number"] {
    background: none;
    border: none;
    padding: 0;
    outline: none;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
    }
  }
  svg {
    width: 1em;
    height: 1em;
    > path {
      fill: currentColor;
    }
  }
`

const clamp = (min, value, max) => {
  if (value < min) return min
  else if (max < value) return max
  else return value
}

const BlenderNumberInput = ({
  label = "",
  min = Number.NEGATIVE_INFINITY,
  value = 0,
  max = Number.POSITIVE_INFINITY,
  onChange = () => {},

  sensitivity = 100,
}) => {
  const id = useId()
  const refInput = useRef(null)
  const [isEditing, setIsEditing] = useState(false)
  const [hasLeftMouseDown, setHasLeftMouseDown] = useState(false)
  const [hasMovedAfterLeftMouseDown, setHasMovedAfterLeftMouseDown] =
    useState(false)
  const [valueAfterLeftMouseDown, setValueAfterLeftMouseDown] = useState(null)

  useLayoutEffect(() => {
    refInput.current.value = value
  }, [])

  const handleChagneValue = useCallback(
    (newValue) => {
      const result = clamp(min, newValue, max)
      refInput.current.value = result
      onChange(result)
    },
    [min, max]
  )

  const handleMouseMove = useCallback((event) => {
    console.log("mouse move :", event.movementX)
    // 添加灵敏程度 偶尔点击后会马上触发 mouse move 事件
    // 鼠标移动超过灵敏程度后 才会被视为鼠标移动 数值改变
    if (event.movementX === 0) {
      return
    }
    setHasMovedAfterLeftMouseDown(true)
    const nextValue = parseFloat(refInput.current.value) + event.movementX
    handleChagneValue(nextValue)
  }, [])

  useEffect(() => {
    const nodeInput = refInput.current

    const handleMouseDown = (event) => {
      if (event.button === 0) {
        event.preventDefault()
        console.log("value after left mouse down :", value)
        setValueAfterLeftMouseDown(value)
        setHasLeftMouseDown(true)
        nodeInput.requestPointerLock()
        nodeInput.addEventListener("mousemove", handleMouseMove)
      } else if (hasLeftMouseDown && event.button === 2) {
        event.preventDefault()
        event.stopPropagation()
        console.log("reset value")
        setIsEditing(false)
        handleChagneValue(valueAfterLeftMouseDown)
        document.exitPointerLock()
        nodeInput.blur()
        // setHasMovedAfterLeftMouseDown(false)
        nodeInput.removeEventListener("mousemove", handleMouseMove)
      }
    }
    const handleMouseUp = (event) => {
      event.stopPropagation()
      event.preventDefault()
      console.log("[mouse up] ", event.button)
      if (event.button === 0 && !hasMovedAfterLeftMouseDown) {
        setIsEditing(true)
        nodeInput.select()
      } else if (event.button == 2) {
        nodeInput.blur()
      }
      document.exitPointerLock()
      setHasMovedAfterLeftMouseDown(false)
      nodeInput.removeEventListener("mousemove", handleMouseMove)
    }

    nodeInput.addEventListener("mousedown", handleMouseDown)
    nodeInput.addEventListener("mouseup", handleMouseUp)
    return () => {
      nodeInput.removeEventListener("mousedown", handleMouseDown)
      nodeInput.removeEventListener("mouseup", handleMouseUp)
    }
  }, [
    isEditing,
    hasLeftMouseDown,
    hasMovedAfterLeftMouseDown,
    valueAfterLeftMouseDown,
  ])

  const handleKeyDown = (event) => {
    console.log("event.key :", event.code)
    if (event.code.includes("Enter")) {
      setIsEditing(false)
      handleChagneValue(event.target.value)
      refInput.current.blur()
      // onChange(refInput.current.value)
    }
  }

  // console.log("rendered")
  return (
    <Wrapper>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <div className="controller">
        <button className="chevron-left-btn">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z" />
          </svg>
        </button>
        <input
          id={id}
          ref={refInput}
          className={clsx({ "number-input": true, "is-editing": isEditing })}
          type="number"
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)}
          onContextMenu={(e) => e.preventDefault()}
        />
        <button className="chevron-right-btn">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.629 15.997l-7.083-7.081L13.462 7l8.997 8.997L13.457 25l-1.916-1.916z" />
          </svg>
        </button>
      </div>
    </Wrapper>
  )
}

export default BlenderNumberInput

BlenderNumberInput.propTypes = {
  label: PropTypes.string,
}
