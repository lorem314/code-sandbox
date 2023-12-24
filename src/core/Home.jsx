import { MD } from "../routes"
import Page from "./Page"
import MDList from "./MDList"

export default function () {
  return (
    <Page>
      {Object.entries(MD).map(([type, list]) => {
        return <MDList key={type} list={list} type={type} />
      })}
    </Page>
  )
}
