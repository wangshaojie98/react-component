import React, { useState } from "react";
import './index.scss'

type CollapseProps = {
  defaultActiveKey: string [];
  onChange: (activeKeys: string []) => void;
  children: React.ReactNode;
  
}

type PanelProps = {
  header: string;
  isCollapsed?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  index: string;
}

type CollapseType = React.FC<CollapseProps> & {
  Panel: typeof Panel
}

const Panel: React.FC<PanelProps> = ({ header, children, onClick = () => {}, isCollapsed, index }) => {
  return (
    <div className="collapse-panel">
      <button className="collapse-button" onClick={() => {onClick()}}>{header}</button>
      <div className={`collapse-content ${isCollapsed ? 'active' : ''}`}>
        {children}
      </div>
    </div>
  )
}

const Collapse: CollapseType = ({ defaultActiveKey, onChange, children }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey)

  const onClick = (key: string) => {
    const index = activeKey.indexOf(key)
    let res = [...activeKey]

    if (index > -1) {
      res = activeKey.filter(k => k !== key)
    } else {
      res = [...res, key]
    }

    setActiveKey(res)
    onChange(res)
  }


  return (
    <div className="collapse">
      {
        React.Children.map(children, child => {
          if (!React.isValidElement(child)) return null
          if (child.type !== Panel) return null

          const { props: { index } } = child
          const { props } = child
          // 方案一
          // return React.cloneElement(child, {...child.props, onClick: () => { onClick(index) }, isCollapsed: activeKey.includes(index) })

          // 方案二
          return (
            <Panel
              index={index}
              header={props.header}
              children={props.children}
              isCollapsed={activeKey.includes(index)}
              onClick={() => { onClick(index)}}
            />
          )
        })
      }
    </div>
  )
}

Collapse.Panel = Panel

export default Collapse

/**
 * 学到了什么
 * 思路：维护一个数组去保持激活的key
 * 技术：React.Children.map去遍历数组
 * 技术：React.isValidElement 排除非标签和非组件元素
 * 技术：child.type === Panel 判断组件
 * 技术：给组件添加属性可以使用React.cloneElement 
 * 或者使用Panel组件代替复制，主动传入children
 */