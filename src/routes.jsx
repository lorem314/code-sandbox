import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx"
import css from "react-syntax-highlighter/dist/esm/languages/prism/css"
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism"

SyntaxHighlighter.registerLanguage("jsx", jsx)
SyntaxHighlighter.registerLanguage("css", css)

const DEMO = Object.entries(
  import.meta.glob("/src/(component|hook)/**/demos/*.jsx", {
    eager: true,
  })
)
  .map(([path, content]) => {
    const splittedPath = path.split("/")
    const filename = splittedPath[splittedPath.length - 1].split(".")[0]
    return {
      name: splittedPath[3],
      Element: content.default,
      path: filename,
    }
  })
  .reduce((mapper, demo) => {
    if (!mapper[demo.name]) {
      mapper[demo.name] = []
    }
    mapper[demo.name].push({
      path: demo.path,
      Element: demo.Element,
    })
    return mapper
  }, {})

const MD = Object.entries(
  import.meta.glob("/src/(component|hook)/**/[a-z]*.md", {
    as: "raw",
    eager: true,
  })
)
  .map(([path, content]) => {
    const splittedPath = path.split("/")
    return {
      name: splittedPath[3],
      type: splittedPath[2],
      Element: (
        <ReactMarkdown
          components={{
            pre: ({ children, node }) => {
              return (
                <SyntaxHighlighter
                  language="jsx"
                  style={materialDark}
                  children={children.props.children}
                />
              )
            },
          }}
          rehypePlugins={[rehypeRaw]}
          children={content}
        />
      ),
    }
  })
  .reduce(
    (mapper, { name, Element, type }) => {
      if (!mapper[type][name]) {
        mapper[type][name] = {}
      }
      mapper[type][name].Element = Element
      mapper[type][name].type = type
      return mapper
    },
    { component: {}, hook: {} }
  )

const LAYOUT = Object.entries(
  import.meta.glob("/src/(component|hook)/index.jsx", { eager: true })
)
  .map(([path, exported]) => {
    const splittedPath = path.split("/")
    return { type: splittedPath[2], Element: exported.default }
  })
  .reduce((mapper, { Element, type }) => {
    mapper[type] = { Element }
    return mapper
  }, {})

const CODE = Object.entries(
  import.meta.glob("/src/code/[a-zA-Z]*.jsx", { eager: true, as: "raw" })
)
  .map(([path, rawCodeString]) => {
    const splittedPath = path.split("/")
    const [fileName, _] = splittedPath[splittedPath.length - 1].split(".")
    const camel = fileName.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`)
    const name = camel.startsWith("-") ? camel.slice(1) : camel
    return {
      name,
      Element: (
        <SyntaxHighlighter language="jsx" style={materialDark}>
          {rawCodeString.trim()}
        </SyntaxHighlighter>
      ),
    }
  })
  .reduce((mapper, { name, Element }) => {
    mapper[name] = Element
    return mapper
  }, {})

export { DEMO, MD, LAYOUT, CODE }
