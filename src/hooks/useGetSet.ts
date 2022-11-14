import { useRef, useState } from "react";

function useGetSet<T>(initialState: T): [ () => T, (newState: T) => void] {
  const state = useRef(initialState);
  const [value, setValue] = useState(initialState)
  
  const get = () => {
    return state.current
  }
  
  const set = (newState: T) => {
    state.current = newState
    setValue(state.current)
    console.log('current', state.current)
  }
  
  
  return [get, set]
};

export default useGetSet

/**
 * 学到了什么？
 * ref不会驱动hook更新，可以利用useState去更新hook的原理去响应ref的值
 */