import React, { useState } from 'react'
import { observer } from 'mobx-react'

import { makeAutoObservable } from 'mobx'

type CountDownProps = {
  str: string;
  isStart: boolean;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
}

const CountDown: React.FC<CountDownProps> = (props) => {
  return (
    <div className='count-down'>
      <h2>------CountDown------</h2>
      <p>{props.str}</p>
      <button onClick={props.isStart ? props.onPause : props.onResume}>{props.isStart ? 'onPause' : 'onResume'}</button>&nbsp;
      <button onClick={props.onRestart}>onRestart</button>

    </div>
  )
}

const CountDownContainer: React.FC = observer(() => {
  const [model] = useState(() => new Model(0, 1, 10))
  return (
    <>
      <CountDown 
        str={model.getString()}
        isStart={model.isStart}
        onPause={model.onPause}
        onResume={model.onResume}
        onRestart={model.onRestart}
      />
    </>
  )
})


export default CountDownContainer

class Model {
  records: [number, number, number]
  timer: any;
  isStart: boolean;
  constructor(public h = 2, public m = 0, public s = 0) {
    this.h = h;
    this.m = m;
    this.s = s;
    this.isStart = true;

    this.records = [h, m, s];
    this.timer = null;

    makeAutoObservable(this, {}, { autoBind: true })

    this.start()
  }

  decreaseH() {
    if (this.h === 0) {
      this.clearInterval()
      return
    }

    this.h--;
  }

  decreaseM() {
    if (this.m > 0) {
      this.m--
      return;
    }

    if (this.h > 0) {
      this.m = 59;
    }

    this.decreaseH()
  }

  decreaseS() {
    if (this.s > 0) {
      this.s--
      return;
    }

    if (this.m > 0 || this.h > 0) {
      this.s = 59;
    }

    this.decreaseM()
  }

  clearInterval() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  start() {
    this.clearInterval()

    this.timer = setInterval(() => {
      this.decreaseS()
    }, 1000)
  }

  resetHMS() {
    this.clearInterval()

    const [h, m, s] = this.records;
    this.h = h;
    this.m = m;
    this.s = s;
  }

  onPause() {
    // 清空计时器
    this.clearInterval()
    this.isStart = false;
  }

  onResume() {
    // 开启倒计时
    this.start()
    this.isStart = true;
  }

  onRestart() {
    // 重新开始
    this.isStart = true;
    this.resetHMS()
    this.start()
  }

  getString() {
    return `${this.h < 10 ? 0 : ''}${this.h}:${this.m < 10 ? 0 : ''}${this.m}:${this.s < 10 ? 0 : ''}${this.s}`
  }
}