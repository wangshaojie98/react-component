import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { makeAutoObservable } from 'mobx'

import './index.scss'

type ButtonWithRippleProps = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void
}

/**
 * 设计动画
 * 点击时获取目标target的相对视窗坐标信息、鼠标点击的相对视窗的坐标信息。根据计算获取相对button的点击的相对位置坐标
 * 当coords坐标信息发生变化，设置isRippling为true,一定时间后isRippling为false
 * 当isRippling为true时，插入一个动画层元素，动画执行，当isRippling为false时动画结束。动画层消失。
 */
const ButtonWithRipple: React.FC<ButtonWithRippleProps> = ({ children, onClick }) => {
  const [isRippling, setIsRippling] = useState(false)
  const [coords, setCoords] = useState([-1, -1])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { clientX, clientY } = e // 鼠标点击时视窗的坐标
    const rect = e.currentTarget.getBoundingClientRect(); // button 元素视窗位置信息
    const res = [clientX - rect.left, clientY - rect.top];
    
    setCoords(res)
    onClick(e)
  }

  useEffect(() => {
    if (coords[0] > -1 || coords[1] > -1) {
      setIsRippling(true)

      setTimeout(() => {
        setCoords([-1, -1])
        setIsRippling(false);
      }, 300)
    }
  }, [coords])
  return (
    <button onClick={handleClick} className="ripple-button">
      <span className='content'>{children}</span>
      {
        isRippling ? (
          <div className='ripple' style={{ left: coords[0], top: coords[1]}}></div>
        ): null
      }
    </button>
  )
}


export default ButtonWithRipple;
/**
 * 好文：
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
 * https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/clientX
 * https://segmentfault.com/a/1190000002405897
 * https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation
 * https://www.jianshu.com/p/1dd668ccc97a target vs currentTarget
 * 动画要比消失慢
 */