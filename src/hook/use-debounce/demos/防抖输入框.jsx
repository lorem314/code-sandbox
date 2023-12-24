import React, { useState } from "react"

import useDebounce from "../../../code/useDebounce"

const Demo = () => {
  const [text, setText] = useState("")
  const debouncedText = useDebounce(text, 1000)

  const handleChangeText = (event) => {
    const value = event.target.value
    setText(value)
  }

  return (
    <div>
      <h4>防抖输入框</h4>
      <p>在下方的输入框中输入内容，确保键入间隔在 1000 毫秒之内。</p>
      <p>输入框中的内容会实时更新。</p>
      <input type="text" value={text} onChange={handleChangeText} />
      <p>下方的防抖内容会在普通输入框停止接受新内容的 500 毫秒后更新。</p>
      <div>
        无防抖：
        {text === "" ? "请在上方的输入框中输入一些内容" : text}
      </div>
      <br />
      <div>
        有防抖：
        {debouncedText === ""
          ? "请在上方的输入框中输入一些内容"
          : debouncedText}
      </div>
    </div>
  )
}

export default Demo
