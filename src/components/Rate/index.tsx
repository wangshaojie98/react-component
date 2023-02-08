import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { makeAutoObservable } from 'mobx'

import './index.scss'

type Star = {
  id: number;
  marked: boolean;
}
const Star = () => {
  return <></>
}

type StarRating = {
  value: number;
  texts: string [];
}
const StarRating = () => {
  return <></>
}



class Model {
  rating: number;
  selection: number;
  stars: {text: string, id: number } [];
  constructor({ rating = -1, selection = -1 , texts = ['1', '2', '3', '4', '5'] }) {
    this.rating = rating; // 评分
    this.selection = selection; // 当前展示的评分
    this.stars = texts.map((text: string, idx: number) => ({ id: idx + 1, text })); // 数据
  }

  onMouseOver(idx: number) {
    /**
     * 设置悬浮的id,只要小于，都是实心
     */
    this.selection = idx;
  }

  onMouseOut() {
    // 离开的时候恢复ratingId
    this.selection = this.rating;
  }

  onClick(idx: number) {
    // 设置selection
    this.selection = idx;
    this.rating = idx;
  }
}
