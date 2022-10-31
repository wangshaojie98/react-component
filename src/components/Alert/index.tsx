import React from "react";
import { useState } from "react";
import './index.scss'

type Alert = {
  message: string;
  type?: string;
  onClose?: (...args: any []) => void;
}

const Alert: React.FC<Alert> = ({
   message, 
   type = 'info', 
   onClose = () => {}
}) => {

  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)
  let timer = React.useRef<any>(null)
  console.log('leaving: ', leaving);

  
  const onInnerClose = () => {
    setLeaving(true)
    timer.current = setTimeout(() => {
      setLeaving(false)
      setVisible(false)
    }, 750)
    console.log('onInnerClose')
  }

  React.useEffect(() => {
    return () => {
      console.log('卸载')
      timer.current && clearTimeout(timer.current)
    }
  }, [timer.current])
  console.log('timer: ', timer.current);
  return (
    <>
    {
      visible && (
        <div className={`alert ${leaving ? 'leaving' : ''} ${type}`}>
          <div className="alert-message">{message}</div>
          <button className="alert-close" onClick={onInnerClose}></button>
        </div>
      )
    }
    </>
  )
}

export default Alert

/**
 * 学到了什么
 * 了解了animation是执行动画的属性，并且animation-fill-mode 设置 CSS 动画在执行之前和之后如何将样式应用于其目标
 * 了解@keyframs是定义动画的声明，动画是from to
 * 
 */