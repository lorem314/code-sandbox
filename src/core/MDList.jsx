import React from "react"
import { Link } from "react-router-dom"

import {
  upperFirstLetter,
  resolveComponentName,
  resolveHookName,
} from "../utils"

const MDList = ({ list, type }) => {
  return (
    <div>
      <h2>
        <Link to={`/${type}`}>{upperFirstLetter(type)}</Link>
      </h2>
      <ul>
        {Object.entries(list).map(([name, _]) => {
          const displayName =
            type === "component"
              ? resolveComponentName(name)
              : resolveHookName(name)
          return (
            <li key={name}>
              <Link to={`/${type}/${name}`}>{displayName}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MDList
