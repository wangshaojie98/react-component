import { useEffect, CSSProperties } from 'react'
import _ from 'lodash'
import styled from 'styled-components'

const Demo = () => {
  useEffect(() => {
    console.log('demo init')
  }, [])

  return <div>demo</div>
}

export default Demo
type Place =
  | 'center'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-right'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-left'
interface AbsoluteBoxProps extends React.CSSProperties {
  place?: Place
}


const positionMap: Record<Place, any> = {
  center: {
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  top: {
    left: '50%',
    top: '0%',
    transform: 'translate(-50%, 0%)'
  },
  right: {
    top: '50%',
    right: '0%',
    transform: 'translate(0%, -50%)'
  },
  left: {
    top: '50%',
    left: '0%',
    transform: 'translate(0%, -50%)'
  },
  bottom: {
    bottom: '0%',
    left: '50%',
    transform: 'translate(-50%, 0%)'
  },
  'top-right': {
    top: '0%',
    right: '0%',
  },
  'top-left': {
    top: '0%',
    left: '0%',
  },
  'bottom-right': {
    bottom: '0%',
    right: '0%',
  },
  'bottom-left': {
    bottom: '0%',
    left: '0%',
  }
}

const generateCSS = (cssProps: AbsoluteBoxProps) => {
  if (!cssProps.place) cssProps.place = 'center'
  
  const finalPosition = {
      [cssProps.place]: positionMap[cssProps.place]
  }

  return _.map(_.merge({}, finalPosition[cssProps.place], cssProps), (value, key) => `${_.kebabCase(key)}: ${value};`).join('');
};

export const AbsoluteBox = styled.div<AbsoluteBoxProps>`
  position: absolute;
  ${props => `${generateCSS(props)}`}
`;

