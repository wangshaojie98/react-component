import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { makeAutoObservable } from 'mobx'
import { ReactComponent as StarSvg} from './star.svg'
import './index.scss'

type StarProps = {
  id: number;
  marked: boolean;
  selection: number;
}

const OneStar: React.FC<{ color: string, className: string, style?: object }> = ({ color, className, style }) => {
  return (
    <div className={className} style={style}>
      <span><StarSvg width={20} height={20} style={{ fill: color }} /></span>
    </div>
  )
}


type Ref = HTMLSpanElement
const Star = React.forwardRef<Ref, StarProps>(({ id, marked, selection }, ref) => {
  return (
    <div>
      <OneStar color={selection >= (id - 0.5) ? "#FFB400" :  '#D9D9D9'} className='half-of-star'/>
      <OneStar color={selection >= id ? "#FFB400" :  '#D9D9D9'} className='one-star'/>
    </div>
  )
})



type StarRatingProps = Model;
const StarRating: React.FC<StarRatingProps> = ({ rating, selection, data, onClick, onMouseOut, onMouseOver }) => {
  const isElementLeft = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX } = e // 鼠标点击时视窗的坐标
    const rect = e.currentTarget.getBoundingClientRect(); // button 元素视窗位置信息
    const clientWidth = e.currentTarget.clientWidth;
    if (clientX - rect.left < (clientWidth / 2)) {
      return true;
    } else {
      return false;
    }
  }
  const handleClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
    if (isElementLeft(e)) {
      onClick(id - 0.5)
    } else {
      onClick(id)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, id: number) => {
    if (isElementLeft(e)) {
      onMouseOver(id - 0.5)
    } else {
      onMouseOver(id)
    }
  }
  return (
    <div>
      <ul className='rate' onMouseLeave={onMouseOut}>
        { data.map(({ id }) => {
            return (
              <li 
                onClick={(e) => { handleClick(e, id) }} 
                onMouseMove={(e) => {handleMouseMove(e, id)}}
                key={id}
                className='rate-star'
              >
                <Star id={id} marked={ selection >= id } selection={selection}/>
              </li>
            )
        })}
      </ul>
      <span className='rate-text'>
        { data.find(({ id }) => id === rating)?.text || '' }
      </span>
    </div>
  )
}

type StarRating = {
  value?: number;
  texts?: string [];
}
const Container = observer((props: StarRating) => {
  const { value = -1, texts = [] } = props
  const [model, setModel] = useState(() => new Model({
    rating: value,
    selection: value,
    texts
  }))

  useEffect(() => {
    setModel(new Model({
      rating: value,
      selection: value,
      texts
    }))
  }, [value])

  return (
    <StarRating 
      rating={model.rating}
      selection={model.selection}
      data={model.data}
      onClick={model.onClick}
      onMouseOut={model.onMouseOut}
      onMouseOver={model.onMouseOver}
    />
  )
})

class Model {
  rating: number;
  selection: number;
  data: { text?: string, id: number } [];
  constructor({ rating = -1, selection = -1 , texts } : {rating: number, selection: number, texts?: string []}) {
    this.rating = rating; // 评分
    this.selection = selection; // 当前展示的评分
    this.data = Array.from({ length: 5 }).map((_: any, idx: number) => ({ id: idx + 1, text: texts?.[idx] }))// 数据

    makeAutoObservable(this, {}, { autoBind: true })
  }

  onMouseOver(id: number) {
    console.log('onMouseOver: ', id);
    /**
     * 设置悬浮的id,只要小于，都是实心
     */
    if (id === this.selection) return;

    this.selection = id;
  }

  onMouseOut() {
    console.log('onMouseOut: ', );
    // 离开的时候恢复ratingId
    this.selection = this.rating;
  }

  onClick(id: number) {
    // 设置selection
    this.selection = id;
    this.rating = id;
  }
}


export default Container