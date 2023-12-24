import React, { useEffect, useState } from "react"
import styled from "styled-components"

import useDebounce from "../../../code/useDebounce"

const Wrapper = styled.div`
  > article {
    border: 1px solid grey;
    padding: 0 10px;

    > aside {
      margin: 0.5rem;
      padding: 0.5rem;
      text-align: right;
      position: sticky;
      top: 0;
    }

    > h5 {
      margin-bottom: 16rem;
    }
  }
`

const key = "code-sandbox_use-debounce_debounced-scroll_scroll-top"
const getLocalScrollTop = () =>
  window ? parseInt(localStorage.getItem(key)) : 0

const Demo = () => {
  const [scrollTop, setScrollTop] = useState(getLocalScrollTop)
  const debouncedScrollTop = useDebounce(scrollTop, 250)

  useEffect(() => {
    const scrollTop = localStorage.getItem(key)
    const mainNode = document.getElementById("main")
    mainNode.scrollTop = scrollTop

    const handleScroll = () => {
      console.log("scrollTop ", mainNode.scrollTop)
      setScrollTop(main.scrollTop)
    }

    mainNode.addEventListener("scroll", handleScroll)
    return () => {
      mainNode.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(key, debouncedScrollTop)
  }, [debouncedScrollTop])

  return (
    <Wrapper>
      <h4>防抖滚动条</h4>
      <article>
        <aside>
          <div>无防抖 scrollTop {scrollTop}</div>
          <div>有防抖 scrollTop {debouncedScrollTop}</div>
        </aside>
        <h5>标题-1</h5>
        <h5>标题-2</h5>
        <h5>标题-3</h5>
        <h5>标题-4</h5>
        <h5>标题-5</h5>
        <h5>标题-6</h5>
        <h5>标题-7</h5>
        <h5>标题-8</h5>
        <h5>标题-9</h5>
      </article>
    </Wrapper>
  )
}

export default Demo
