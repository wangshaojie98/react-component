import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { makeAutoObservable } from "mobx";
import { ReactComponent as StarSvg } from "./star.svg";
import "./index.scss";

const isElementLeft = (e: React.MouseEvent<HTMLElement>) => {
  const { clientX } = e; // 鼠标点击时视窗的坐标
  const rect = e.currentTarget.getBoundingClientRect(); // button 元素视窗位置信息
  const clientWidth = e.currentTarget.clientWidth;
  if (clientX - rect.left < clientWidth / 2) {
    return true;
  } else {
    return false;
  }
};

interface StarProps {
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>, id: number) => void;
  onMouseMove: (e: React.MouseEvent<HTMLElement>, id: number) => void;
  id: number;
  allowHalf: boolean;
  selection: number;
  character?: React.ReactNode | ((props: StarProps) => React.ReactNode);
}
const Star = (props: StarProps) => {
  const { disabled, onClick, onMouseMove, id, allowHalf, selection, character } = props;
  const onInternalMouseMove: React.MouseEventHandler<HTMLElement> = (e) => {
    onMouseMove(e, id);
  };

  const onInternalClick: React.MouseEventHandler<HTMLElement> = (e) => {
    onClick(e, id);
  };

  const characterNode = typeof character === 'function' ? character(props) : character;

  const getClassName = () => {
    if (allowHalf && (selection > id - 1) && (selection < id)) {
      return 'half'
    }

    if (selection >= id) {
      return 'full'
    }

    return 'zero'
  }
  return (
    <li
      onClick={disabled ? undefined : onInternalClick}
      onMouseMove={disabled ? undefined : onInternalMouseMove}
      key={id}
      className={`rate-star rate-star-${getClassName()}`}
    >
      { allowHalf && (<div className="rate-star-first">{characterNode}</div>) }
      <div className="rate-star-second">{characterNode}</div>
    </li>
  )
}
type ContainerProps = {
  value?: number;
  texts?: string[];
  allowHalf?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  character?: React.ReactNode | ((props: StarProps) => React.ReactNode);
};
const Container = observer((props: ContainerProps) => {
  const { 
    value, 
    texts = [], 
    allowHalf, 
    clearable, 
    disabled, 
    style, 
    character = '★'
  } = props;
  const [model, setModel] = useState(
    () =>
      new Model({
        rating: value,
        selection: value,
        texts,
        allowHalf,
        clearable,
        disabled,
      })
  );

  useEffect(() => {
    setModel(
      new Model({
        rating: value,
        selection: value,
        texts,
        allowHalf,
        clearable,
        disabled,
      })
    );
  }, [value]);

  const starNodes = model.data.map(({id}) => (
    <Star 
      key={id}
      disabled={model.disabled}
      onClick={model.onClick}
      onMouseMove={model.onMouseMove}
      id={id}
      allowHalf={model.allowHalf}
      selection={model.selection}
      character={character}
    />
  ))
  return (
    <div style={style}>
      <ul className="rate" onMouseLeave={model.onMouseLeave} style={style}>
        {starNodes}
      </ul>
      <span className="rate-text">
        {model.data.find(({ id }) => id === model.rating)?.text || ""}
      </span>
    </div>
  );
});

type ModelProps = {
  rating?: number;
  selection?: number;
  texts?: string[];
  allowHalf?: boolean;
  clearable?: boolean;
  disabled?: boolean;
};
class Model {
  rating: number;
  selection: number;
  data: { text?: string; id: number }[];
  allowHalf: boolean;
  clearable: boolean;
  disabled: boolean;
  constructor(props: ModelProps) {
    const {
      rating = -1,
      selection = -1,
      texts,
      allowHalf = false,
      clearable = false,
      disabled = false,
    } = props;
    this.allowHalf = allowHalf;
    this.rating = rating; // 评分
    this.selection = selection; // 当前展示的评分
    this.clearable = clearable;
    this.disabled = disabled;
    this.data = Array.from({ length: 5 }).map((_: any, idx: number) => ({
      id: idx + 1,
      text: texts?.[idx],
    })); // 数据

    makeAutoObservable(this, {}, { autoBind: true });
  }

  handleMouseMove(id: number) {
    /**
     * 设置悬浮的id,只要小于，都是实心
     */
    if (id === this.selection) return;

    this.selection = id;
  }

  hanldeMouseLeave() {
    // 离开的时候恢复ratingId
    this.selection = this.rating;
  }

  handleClick(id: number) {
    // 设置selection
    this.selection = id;
    this.rating = id;
  }

  reset() {
    this.rating = -1;
    this.selection = -1;
  }

  onClick(e: React.MouseEvent<HTMLElement>, id: number) {
    if (this.clearable && this.rating === ((this.allowHalf && isElementLeft(e)) ? id - 0.5 : id)) {
      this.reset();
      return;
    }

    this.handleClick((this.allowHalf && isElementLeft(e)) ? id - 0.5 : id);
  }

  onMouseMove(e: React.MouseEvent<HTMLElement>, id: number) {
    this.handleMouseMove((this.allowHalf && isElementLeft(e)) ? id - 0.5 : id);
  }

  onMouseLeave() {
    this.hanldeMouseLeave();
  }
}

export default Container;
