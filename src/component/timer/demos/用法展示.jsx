import React, { useRef, useState } from "react"
import styled from "styled-components"

import Timer from "../../../code/Timer"

const Wrapper = styled.div`
  max-width: 28rem;

  > .label-input {
    margin: 0.5rem 0;
    padding: 0 2rem;
    display: flex;

    > label {
      flex: 0 0 6rem;
      font-family: monospace;
    }
  }

  > .buttons {
    margin: 1rem 4rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
`

const Demo = () => {
  const [isTiming, setIsTiming] = useState(true)
  const [props, setProps] = useState({
    key: Date.now(),
    duration: 60000,
    start: 60,
    end: 1,
    step: -1,
  })
  const refDuration = useRef(null)
  const refStart = useRef(null)
  const refEnd = useRef(null)
  const refStep = useRef(null)

  const handleRestartTiming = () => {
    const newPorps = {
      key: Date.now(),
      duration: parseInt(refDuration.current.value),
      start: parseInt(refStart.current.value),
      end: parseInt(refEnd.current.value),
      step: parseInt(refStep.current.value),
    }
    console.log("new props :", newPorps)
    setProps(newPorps)
  }

  return (
    <Wrapper>
      <h2>Timer Demo</h2>

      <div className="label-input">
        <label htmlFor="timer-duration">Duration</label>
        <input
          id="timer-duration"
          type="number"
          defaultValue={60000}
          ref={refDuration}
        />
      </div>

      <div className="label-input">
        <label htmlFor="timer-start">Start</label>
        <input
          id="timer-start"
          type="number"
          defaultValue={60}
          ref={refStart}
        />
      </div>

      <div className="label-input">
        <label htmlFor="timer-end">End</label>
        <input id="timer-end" type="number" defaultValue={0} ref={refEnd} />
      </div>

      <div className="label-input">
        <label htmlFor="timer-step">Step</label>
        <input id="timer-step" type="number" defaultValue={-1} ref={refStep} />
      </div>

      <div className="buttons">
        <button onClick={() => setIsTiming((_) => !_)}>
          {isTiming ? "暂停计时" : "开始计时"}
        </button>
        <button onClick={handleRestartTiming}>重新计时</button>
      </div>

      <Timer isTiming={isTiming} {...props}>
        {(s) => {
          return <p>{`时间还剩 ${s} 秒`}</p>
        }}
      </Timer>
    </Wrapper>
  )
}

export default Demo
