import { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"

const Timer = ({
  duration,
  start,
  end,
  step,
  isTiming,
  onTimeout,
  children,
}) => {
  const [hasTimeout, setHasTimeout] = useState(false)
  const [count, setCount] = useState(start)
  const delay = useMemo(
    () => Math.abs((duration * step) / (start - end)),
    [duration, step, start, end]
  )

  useEffect(() => {
    let tid
    if (isTiming) {
      tid = setInterval(() => {
        setCount((c) => {
          if (c > 0) return c + step
          if (!hasTimeout) {
            onTimeout()
            setHasTimeout(true)
          }
          clearInterval(tid)
          return c
        })
      }, delay)
    }
    return () => clearInterval(tid)
  }, [delay, isTiming, hasTimeout, step, onTimeout])

  return typeof children === "function" ? children(count) : count
}

Timer.defaultProps = {
  duration: 60000,
  start: 60,
  end: 0,
  step: -1,
  isTiming: true,
  onTimeout: () => {},
  children: null,
}

Timer.propTypes = {
  duration: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  step: (props, propName, componentName) => {
    const propValue = props[propName]
    if (typeof propValue !== "number") {
      return new Error(
        `Invalid prop ${propName} passed to ${componentName} : ` +
          `${propName} should be a Number.`
      )
    } else if (propValue === 0) {
      return new Error(
        `Invalid prop ${propName} passed to ${componentName} : ` +
          `${propName} can't be 0.`
      )
    } else if (propValue > 0 && props["start"] > props["end"]) {
      return new Error(
        `Invalid prop ${propName} passed to ${componentName} : ` +
          `${propName} should be smaller than 0 when prop start is` +
          ` greater than prop end.`
      )
    } else if (propValue < 0 && props["start"] < props["end"]) {
      return new Error(
        `Invalid prop ${propName} passed to ${componentName} : ` +
          `${propName} should be greater than 0 when prop start is` +
          ` smaller than prop end.`
      )
    }
  },
  isTiming: PropTypes.bool,
  onTimeout: PropTypes.func,
  children: PropTypes.func,
}

export default Timer
