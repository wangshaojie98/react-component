import { useReducer } from "react";

type UseAsync = (fn: (...args: any[]) => Promise<any>) => { isLoading: boolean, error: any, value: any, run: (...args: any []) => Promise<any> }

const useAsync: UseAsync = (fn) => {
  const initialState = {
    isLoading: false,
    error: null,
    value: null
  }

  const reducer = (state: any, action: { type: string; payload?: any; }) => {
    switch (action.type) {
      case 'start':
        return {
          isLoading: true,
          error: null,
          value: null
        }
      case 'error':
        return {
          isLoading: false,
          error: action.payload,
          value: null
        }
      case 'finished':
        return {
          isLoading: false,
          error: null,
          value: action.payload
        }
      default: 
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const run = async (...args: any []) => {
    dispatch({type: 'start'})

    try {
      const res = await fn(...args);
      dispatch({ type: 'finished', payload: res })
      return res
    } catch (error) {
      dispatch({ type: 'error', payload: error })
    }
  }

  return { ...state, run }
}

export default useAsync

/**
 * useAsync 是一个封装接口调用，并处理loading和error的一个hook
 */
// 此方法只适用于table和图表类需要loading的功能