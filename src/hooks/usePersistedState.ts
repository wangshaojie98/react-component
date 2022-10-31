import { useState, useRef, useEffect } from "react";

/**
 * 
 * @param name 存储的key，可能变化
 * @param defaultValue 初始值
 */
const usePersistedState = (name: string, defaultValue: any) => {
  const [value, setValue] = useState(defaultValue) 
  const nameRef = useRef(name)
  // 初始化
  useEffect(() => {
    try {
      const val = JSON.parse(window.localStorage.getItem(nameRef.current) || value)
      if (val) {
        setValue(val)
      } else {

        window.localStorage.setItem(nameRef.current, JSON.stringify(value))
      }
    } catch (error) {
      setValue(value)
      window.localStorage.setItem(nameRef.current, JSON.stringify(value))
    }
  }, [])

  // 应对value变化
  useEffect(() => {
    window.localStorage.setItem(nameRef.current, JSON.stringify(value))
  }, [value])

  // 应对name变化
  useEffect(() => {
    const OriginalValStringify = window.localStorage.getItem(nameRef.current)
    // delete last
    window.localStorage.removeItem(nameRef.current)

    // save new
    nameRef.current = name
    window.localStorage.setItem(name, OriginalValStringify || JSON.stringify(value))
  }, [name])

  return [value, setValue]
}

export default usePersistedState