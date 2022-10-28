import React, { useState } from "react";
import './index.scss'

type TabsPropsType = {
  defaultIndex: number | string;
  onChange: () => void;
  children?: React.ReactNode;
}


type TabItemType = {
  label: string;
  index: number | string;
  children?: React.ReactNode
}

type TabsType = React.FC<TabsPropsType> & { TabItem: typeof TabItem }

const TabItem: React.FC<TabItemType> = props => <div {...props} />;
const Tabs: TabsType = ({ defaultIndex, onChange, children }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)
 
  const onToggle = (index: number) => {
    console.log(index)
    setSelectedIndex(index)
  }
  return (
    <div className="tab">
      <div className="tab-menu">
        {
          React.Children.map(children, (element) => {
            if (!React.isValidElement(element)) return null

            const { props: { index, label }, type } = element

            if (type !== TabItem) return null

            if (type === TabItem) {
              return <button onClick={() => { onToggle(index)}} className={`tab-menu-item ${index === selectedIndex ? 'active' : ''}`}>{label}</button>
            }
          })
        }
      </div>
      <div className="tab-view">
        {
          React.Children.map(children, (element) => {
            if (!React.isValidElement(element)) return null

            const { props: { index, children }, type } = element

            if (type !== TabItem) return null

            if (type === TabItem) {
              return <div  className={`tab-view-item ${index === selectedIndex ? 'active' : ''}`}>{children}</div>
            }
          })
        }
      </div>
    </div>
  )
}



Tabs.TabItem = TabItem

export default Tabs

// NOTE 当插槽元素为1个时，children 是一个对象；当插槽元素使多个时，children才是一个数组
// NOTE 当插槽元素为字符串、数字等非标签、组件元素时，children的属性中无React属性，需要用React.isValidElement去判断
// NOTE 当覆盖children中的 props 时，可以使用React.cloneElement
// React.Children.forEach(children, (args) => {
//   console.log('React.Children: ', {
//     args,
//     isValidElement: React.isValidElement(args)
//   });
//   console.log()
// })

/**
 * 学到了什么
 * 1. 类型：函数组件挂着属性的方式
 * 2. 类型：children 类型
 * 3. 技术：通过React.Children.map去覆盖不同情况、通过React.isValidElement校验元素类型、通过组件类型过滤组件
 * 4. 技术：使用一个内部index去控制当前激活的tabItem，通过css display 控制展示隐藏
 */