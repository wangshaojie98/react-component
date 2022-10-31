import { useState } from "react"

const useLocalStorage = (name: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    try {
      const originalVal = window.localStorage.getItem(name)
      if (originalVal) {
        return JSON.parse(originalVal)
      } else {
        window.localStorage.setItem(name, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (error) {
      return defaultValue
    }
  })

  const handleValue = (newVal: any) => {
    try {
      window.localStorage.setItem(name, JSON.stringify(newVal))
      setValue(newVal)
    } catch (error) {
      setValue(newVal)
    }
  }

  return [value, handleValue]
}

export default useLocalStorage

/**
 * 对比usePersistedState.ts，我觉得useLocalStorage这种方式更简单，减少了依赖关系
 * 1. 初始化操作简单的可以放在useState里面的回调函数中
 * 2. 替换setter 函数，每次更新storage和value
 */