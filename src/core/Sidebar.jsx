import React from "react"
import styled from "styled-components"

import { MD } from "../routes"
import MDList from "./MDList"

const Wrapper = styled.aside`
  position: absolute;
  top: 50px;
  left: 0;
  bottom: 0;
  width: 280px;
  background-color: lightgoldenrodyellow;

  padding-left: 10px;
`

const Sidebar = () => {
  return (
    <Wrapper>
      {Object.entries(MD).map(([type, list]) => {
        return <MDList key={type} list={list} type={type} />
      })}
    </Wrapper>
  )
}

export default Sidebar
