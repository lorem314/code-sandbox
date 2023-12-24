import styled from "styled-components"

const Page = styled.div`
  max-width: ${({ maxWidth }) => maxWidth || "32rem"};
  margin: 2rem auto 1.5rem;
  padding: 0 1rem 1rem;
  border: 1px solid transparent;
  background-color: white;
`

export default Page
