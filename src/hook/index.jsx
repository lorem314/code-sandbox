import Page from "../core/Page"
import { MD } from "../routes"
import MDList from "../core/MDList"

export default function () {
  return (
    <Page>
      <MDList type="hook" list={MD["hook"]} />
    </Page>
  )
}
