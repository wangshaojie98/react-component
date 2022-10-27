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
  // NOTE 当插槽元素为1个时，children 是一个对象；当插槽元素使多个时，children才是一个数组
  // NOTE 当插槽元素为字符串、数字等非标签、组件元素时，children的属性中无React属性，需要用React.isValidElement去判断
  // React.Children.forEach(children, (args) => {
  //   console.log('React.Children: ', {
  //     args,
  //     isValidElement: React.isValidElement(args)
  //   });
  //   console.log()
  // })
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