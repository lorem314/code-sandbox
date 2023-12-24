export const upperFirstLetter = (word) => {
  const firstLetter = word.slice(0, 1)
  return firstLetter.toUpperCase() + word.slice(1)
}

export const clsx = (obj) =>
  Object.entries(obj)
    .map(([key, value]) => (value ? key : ""))
    .join(" ")
    .trim()

export const resolveComponentName = (name) =>
  name
    .split("-")
    .map((word) => upperFirstLetter(word))
    .join("")

export const resolveHookName = (name) =>
  name
    .split("-")
    .map((word, index) => (index === 0 ? word : upperFirstLetter(word)))
    .join("")
