import { createGlobalStyle } from "styled-components"

const styled = { createGlobalStyle }

const GlobalStyle = styled.createGlobalStyle`
  body {
    margin: 0;
  }

  a {
    text-decoration: none;
    text-underline-offset: 4px;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    cursor: pointer;
    font-size: 1em;
    padding: 0.15em 0.35em;
    line-height: 1.5;
  }

  code {
    &:not([class]) {
      font-size: 1.125em;
      margin: 0 0.125rem;
      padding: 0.125rem 0.25rem;
      border-radius: 0.125em;
      background-color: hsl(210, 8%, 90%);
    }
  }

  ol,
  ul {
    > li {
      line-height: 1.65;
    }
  }

  p {
    line-height: 1.65;
    margin: 0.5rem 0;
  }
`

export default GlobalStyle
