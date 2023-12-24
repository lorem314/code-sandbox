import { useState, useEffect } from "react"

const useDebounce = (value, delay = 250) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const tid = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(tid)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
