import React, { useState } from "react";
import './index.scss'

type CollapseProps = {
  defaultActiveKey: string [];
  onChange: (activeKeys: string []) => void;
  children: React.ReactNode
}

type PanelProps = {
  header: string;
  index: string;
  isCollapsed?: boolean;
  onClick?: () => void;
  children: React.ReactNode
}

type CollapseType = React.FC<CollapseProps> & {
  Panel: typeof Panel
}

const Panel: React.FC<PanelProps> = ({ header, children, onClick = () => {}, isCollapsed }) => {
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
    console.log('key: ', key);
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
          console.log('child: ', child);
          console.log('props: ', child.props);
          return React.cloneElement(child, {...child.props, onClick: () => { onClick(index) }, isCollapsed: activeKey.includes(index) })
        })
      }
    </div>
  )
}

Collapse.Panel = Panel

export default Collapse