import { useState, useEffect, useCallback } from "react";

const useKeyPress = (targetKey: string) => {
  const [keypressed, setKeypressed] = useState(false)

  const downHandler = useCallback(({ key }: { key: string }) => {
    if (key === targetKey) {
      setKeypressed(true)
    }
  }, [targetKey])

  const upHandler = useCallback(({ key }: { key: string }) => {
    if (key === targetKey) setKeypressed(false)
    
  }, [targetKey])

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetKey, downHandler, upHandler])

  return keypressed
}

export default useKeyPress