import { useState, useCallback, useEffect } from "react";

const useHash = () => {
  const [hash, setHash] = useState(window.location.hash)

  const changeHash = useCallback(() => {
    setHash(window.location.hash)
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', changeHash)

    return () => {
      window.removeEventListener('hashchange', changeHash)
    }
  }, [])

  const updateHash = useCallback((newHash: string) => {
    if (hash !== newHash) {
      window.location.hash = newHash
    }
  }, [hash])

  return [hash, updateHash]
}

export default useHash
