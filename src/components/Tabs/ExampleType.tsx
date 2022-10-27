import React from "react";

type TabsPropsType = {
  defaultIndex: number | string;
  onTabClick: () => void;
  children?: React.ReactNode;
}

type TabItemType = {
  label: string;
  index: number | string;
  children?: React.ReactNode
}
// 继承也是包含父级的所有属性
interface InterTabsType extends React.FC<TabsPropsType> {
  TabItem: typeof TabItem
}

// 取交集也是可以合并属性
type InterTabsType1 = React.FC<TabsPropsType> & { TabItem: typeof TabItem }

type ErrorFunctionType = React.FC<TabsPropsType> & (typeof TabItem) // 这不是添加静态属性的方式，因为React.FC本质是一个interface表示函数类型，T又是函数类型，也就是函数类型取交集

const Tabs: InterTabsType1 = ({ defaultIndex, onTabClick, children }) => {
  return (
    <>
      {children}
    </>
  )
}



const TabItem: React.FC<TabItemType> = (props) => <div {...props} />;
Tabs.TabItem = TabItem

export default Tabs