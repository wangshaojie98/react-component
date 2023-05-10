import { useEffect } from 'react'
import { AbsoluteBox } from '../../components/Box'

const Demo = () => {
  useEffect(() => {
    console.log('demo init')
  }, [])

  return <div>
    <AbsoluteBox place={'right'} backgroundColor="red">demo</AbsoluteBox>
    <AbsoluteBox place={'top'} backgroundColor="red">demo</AbsoluteBox>
    <AbsoluteBox  backgroundColor="red">demo</AbsoluteBox>
  </div>
}

export default Demo
