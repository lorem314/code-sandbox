import React, { useState } from "react"
import styled from "styled-components"

import BlenderNumberInput from "../../../code/BlenderNumberInput"

const Wrapper = styled.div`
  color: hsl(0deg 0% 85%);
  background-color: hsl(0deg 0% 24%);
  padding: 1rem 2rem 2rem;

  > .demo-wrapper {
    max-width: 60%;
    margin: 0 auto;
  }
`

const Demo = () => {
  const [color, setColor] = useState({ red: 0, green: 0, blue: 0 })

  const handleChangeColor = (key) => (value) => {
    setColor((prevColor) => ({ ...prevColor, [key]: value }))
  }

  return (
    <Wrapper>
      <h2>Blender Number Input Demo</h2>

      <h3>通过调整三原色的值来改变矩形的背景颜色。</h3>

      <div className="demo-wrapper">
        <BlenderNumberInput
          label="红"
          min={0}
          max={255}
          value={color.red}
          onChange={handleChangeColor("red")}
        />
        <BlenderNumberInput
          label="绿"
          min={0}
          max={255}
          value={color.green}
          onChange={handleChangeColor("green")}
        />
        <BlenderNumberInput
          label="蓝"
          min={0}
          max={255}
          value={color.blue}
          onChange={handleChangeColor("blue")}
        />
      </div>

      <div
        style={{
          marginTop: "1rem",
          height: "100px",
          backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
        }}
      ></div>
    </Wrapper>
  )
}

export default Demo
