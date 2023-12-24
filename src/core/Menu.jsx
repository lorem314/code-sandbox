import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.header`
  height: 50px;
  padding: 0 10px;
  background-color: rebeccapurple;

  display: flex;
  align-items: center;

  > .site-title {
    margin: 0;
    font-size: 1.125rem;

    > .home-link {
      color: whitesmoke;
      text-decoration: none;

      &:hover {
        color: white;
      }
    }
  }
`

const Menu = () => {
  return (
    <Wrapper>
      <h1 className="site-title">
        <Link className="home-link" to="/">
          Code Sandbox
        </Link>
      </h1>
    </Wrapper>
  )
}

export default Menu
