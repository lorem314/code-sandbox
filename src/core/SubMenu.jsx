import React from "react"
import { Link, Outlet } from "react-router-dom"
import styled from "styled-components"

import Page from "./Page"
import { resolveComponentName, resolveHookName } from "../utils"

const Wrapper = styled(Page)`
  max-width: 48rem;

  > nav {
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    > .links {
      margin: 10px 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
    }
  }
`

const SubMenu = ({ type, name, hasCodePage, demos }) => {
  const displayName =
    type === "component" ? resolveComponentName(name) : resolveHookName(name)
  return (
    <Wrapper>
      <nav>
        <div className="links">
          <Link to={`/${type}/${name}`}>{displayName}</Link>
          {hasCodePage ? <Link to={"code"}>源码</Link> : null}
        </div>

        {demos ? (
          <div className="links">
            Demo(s):
            {demos.map(({ path }) => {
              return (
                <Link to={`demos/${path}`} key={path}>
                  {path}
                </Link>
              )
            })}
          </div>
        ) : null}
      </nav>
      <Outlet />
    </Wrapper>
  )
}

export default SubMenu
