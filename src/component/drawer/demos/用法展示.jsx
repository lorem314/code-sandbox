import React, { useCallback, useState } from "react"
import styled from "styled-components"

import Drawer from "../../../code/Drawer"

const positions = ["top", "right", "bottom", "left"]

const Wrapper = styled.div`
  .buttons {
    .button-container {
      margin: 10px 0;
    }
  }
`

const Demo = () => {
  const [isOpen, setIsOpen] = useState(
    positions.reduce((state, position) => ({ ...state, [position]: false }), {})
  )

  const handleOpen = useCallback(
    (position) => () => {
      setIsOpen((prevIsOpen) => ({ ...prevIsOpen, [position]: true }))
    },
    []
  )
  const handleClose = useCallback(
    (position) => () => {
      setIsOpen((prevIsOpen) => ({ ...prevIsOpen, [position]: false }))
    },
    []
  )

  return (
    <Wrapper>
      <p>点击按钮打开对应抽屉</p>
      <div className="buttons">
        {positions.map((position) => {
          return (
            <div className="button-container" key={position}>
              <button onClick={handleOpen(position)}>{position}-drawer</button>
              <Drawer
                key={position}
                isOpen={isOpen[position]}
                position={position}
                onClose={handleClose(position)}
              >
                <DrawerContent position={position} />
              </Drawer>
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}

export default Demo

const DrawerContentWrapper = styled.div`
  padding: 0 10px;
`
const DrawerContent = ({ onCloseDrawer, position }) => {
  return (
    <DrawerContentWrapper>
      <header>
        <h4>Drawer {position}</h4>
      </header>
      <button onClick={onCloseDrawer}>Close</button>
      <p>点击 关闭按钮 或 抽屉外部 关闭抽屉</p>
    </DrawerContentWrapper>
  )
}
