import { useState, useEffect, useCallback } from "react";

type UseNavigatorOnLine = () => boolean;

const getOnLineStatus = () => {
  return typeof navigator !== "undefined"
    ? typeof navigator.onLine === "boolean"
      ? navigator.onLine
      : true
    : true;
};

/**
 * 
 * 返回用户是否在线
 */
const useNavigatorOnLine: UseNavigatorOnLine = () => {
  const [isOnline, setIsOnline] = useState(getOnLineStatus());

  const setOnLine = useCallback(() => {
    setIsOnline(true)
  }, [])

  const setOffLine = useCallback(() => {
    setIsOnline(false)
  }, [])


  useEffect(() => {
    window.addEventListener('online', setOnLine)
    window.addEventListener('offline', setOffLine)

    return () => {
      window.removeEventListener('online', setOnLine)
      window.removeEventListener('offline', setOffLine)
    }
  }, [])

  return isOnline;
};

export default useNavigatorOnLine;
