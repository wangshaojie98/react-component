import React from "react";

const useInterval = (callback: Function, delay: number) => {
  const savedCallback = React.useRef(callback);

  const updateCallback = () => {
    savedCallback.current = callback;
  };

  React.useEffect(updateCallback, [callback]);

  React.useEffect(() => {
    const run = () => {
      savedCallback.current();
    };

    const id = setInterval(run, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay]);
};

const Timer = () => {
  const [seconds, setSeconds] = React.useState(0);
  const ref = React.useRef<Function>(() => {});
  const add = () => {
    setSeconds(seconds + 1);
  };
  ref.current = add;

  const ref1 = React.useRef(seconds)
  ref1.current = seconds
   React.useEffect(() => {
    setInterval(() => {
      setSeconds(ref1.current + 1);
    }, 1000);
   }, []);

  /**
   * 错误的示例1
   * setTnterval 会每次update component 都生成一个定时器导致setSeconds重复执行
   */
  // setInterval(()=> {
  //   setSeconds(seconds + 1);
  // }, 1000)

  /**
   * 错误的示例2
   * useEffect执行一次的情况下，在闭包的时候引用的seconds只是初始化的0，所以setconds会从0变到1之后，一直是1
   */
  //  React.useEffect(() => {
  //   setInterval(() => {
  //     setSeconds(seconds + 1);
  //   }, 1000);
  //  }, []);
  React.useEffect(() => {
    setInterval(() => {
      ref.current();
    }, 1000);
  }, []);
  return seconds;
};

export default useInterval;
/**
 * 总结
 * 1、因为定时器只能在初始完成组件之后创建一个，所以必须是useEffect(function, [])，此时引用的值是初始值，定时器会拿不到准确的结果
 * 2、如果定时器在函数全局中，定时器会不断触发，造成执行逻辑重复
 *  useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。
 * 3、因此需要定时器在useEffect触发的同时，需要引用一个值获取最新的结果，那就需要useRef去保存useState的变量，并保持更新
 */