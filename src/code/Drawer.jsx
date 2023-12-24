import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { createPortal } from "react-dom"
import styled from "styled-components"

const Drawer = ({ isOpen, position, size, onClose, children }) => {
  return isOpen ? (
    <Portal position={position} size={size} onClose={onClose}>
      {children}
    </Portal>
  ) : null
}

export default Drawer

Drawer.defaultProps = {
  position: "left",
  size: 320,
  onClose: () => {},
  children: null,
}
Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  size: PropTypes.number,
  onClose: PropTypes.func,
  children: PropTypes.node,
}

const Backdrop = styled.div`
  position: absolute;
  inset: 0 0 0 0;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  transition: opacity 250ms ease-in-out;

  > .drawer-content-container {
    position: absolute;
    background-color: white;
    transition: transform 250ms ease-in-out;
  }
`
const Portal = ({ position, size, onClose, children }) => {
  const [styles, setStyles] = useState({
    opacity: 0,
    transform: getTransformStartProp(position),
  })

  useEffect(() => {
    setStyles({ ...styles, opacity: 1, transform: "translate(0,0)" })
  }, [])

  const handleCloseDrawer = () => {
    Promise.resolve()
      .then(() => {
        return new Promise((resolve) => {
          setStyles({ opacity: 0, transform: getTransformStartProp(position) })
          setTimeout(() => resolve(), 250)
        })
      })
      .then(() => onClose())
  }

  return createPortal(
    <Backdrop style={{ opacity: styles.opacity }} onClick={handleCloseDrawer}>
      <div
        className="drawer-content-container"
        style={{
          ...getPositionProps(position, size),
          transform: styles.transform,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {React.cloneElement(children, { onCloseDrawer: handleCloseDrawer })}
      </div>
    </Backdrop>,
    document.body
  )
}

function getPositionProps(position, size) {
  switch (position) {
    case "left":
    case "right":
      return {
        top: 0,
        bottom: 0,
        [position]: 0,
        width: size,
      }
    case "top":
    case "bottom":
      return {
        left: 0,
        right: 0,
        [position]: 0,
        height: size,
      }
    default:
      return {
        top: 0,
        bottom: 0,
        [position]: 0,
        width: size,
      }
  }
}
function getTransformStartProp(position) {
  switch (position) {
    case "left":
      return "translate(-100%, 0)"
    case "right":
      return "translate(100%, 0)"
    case "top":
      return "translate(0, -100%)"
    case "bottom":
      return "translate(0, 100%)"
    default:
      return "translate(-100%, 0)"
  }
}
