import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"

import { DEMO, LAYOUT, MD, CODE } from "./routes"

import Menu from "./core/Menu"
import SubMenu from "./core/SubMenu"
import Sidebar from "./core/Sidebar"
import Home from "./core/Home"
import NotFound from "./core/404"

// console.log("DEMO", DEMO)
// console.log("LAYOUT", LAYOUT)
// console.log("MD", MD)
// console.log("CODE", CODE)

const Wrapper = styled.main`
  position: absolute;
  top: 50px;
  left: 280px;
  bottom: 0;
  right: 0;
  padding: 0 10px;

  background-color: #ddd;
  overflow: auto;
`

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Menu />
      <Sidebar />

      <Wrapper id="main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/code-sandbox" element={<Home />} />

          {Object.entries(LAYOUT).map(([type, { Element: List }]) => {
            return (
              <Route key={type} path={type}>
                <Route index element={<List />} />
                {Object.entries(MD[type]).map(([name, { Element }]) => {
                  const codePageElement = CODE[name]
                  const demos = DEMO[name]
                  // console.log("name ", name)
                  return (
                    <Route
                      key={name}
                      path={name}
                      element={
                        <SubMenu
                          type={type}
                          name={name}
                          hasCodePage={codePageElement !== undefined}
                          demos={demos}
                        />
                      }
                    >
                      <Route index element={Element} />
                      <Route path="code" element={codePageElement} />
                      {demos ? (
                        <Route path="demos">
                          {demos.map(({ path, Element }) => {
                            return (
                              <Route
                                key={path}
                                path={path}
                                element={<Element />}
                              />
                            )
                          })}
                        </Route>
                      ) : null}
                    </Route>
                  )
                })}
              </Route>
            )
          })}

          {/* <Route path="/component" element={<ComponentsLayout />}>
            <Route path="drawer" element={<SubMenu />}>
              <Route index element={<Markdown />} />
              <Route path="code" element={<Markdown />} />
              <Route path="demos">
                <Route path=":demoName" element={<Demo />} />
                <Route path=":demoName" element={<Demo />} />
              </Route>
            </Route>
          </Route> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  )
}

/*

{routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    children={route.rawMarkdown}
                  />
                }
              />
            )
          })}

*/
