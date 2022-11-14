import { useCallback, useState, useRef } from 'react'

function useHover<T extends HTMLElement | null>(): [(node: T) => void , boolean] {
  const [isHovering, setIsHovering] = useState(false)
  const ref = useRef<T>()

  const callbackRef = useCallback((node: T) => {
    const handleMouseOver = () => { setIsHovering(true) }
    const handleMouseOut = () => { setIsHovering(false) }
    

    ref.current = node

    if (ref.current) {
      ref.current.addEventListener('mouseover', handleMouseOver)
      ref.current.addEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return [callbackRef, isHovering]
}

export default useHover

/**
 * 学到了什么
 * 1. 了解到ref属性的callback写法
 * 2. HTMLElement 类型的属性都有可能为空
 */