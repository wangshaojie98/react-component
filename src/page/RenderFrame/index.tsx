import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    let then = Date.now()
    let count = 0;

    /**
     * 每20次渲染帧打印一次，`count:${count}, 16ms/frame`
     */
    function nextFrame() {
      requestAnimationFrame(() => {
        count++

        if (count % 20 === 0) {
          const ms = (Date.now() - then) / count;
          console.log(`count: ${count}, ${ms}/frame, ${1000/ms}/fps`)
        }
        nextFrame()
      })
    }

    // nextFrame()
  }, []);
  return (
    <div>
     <h1>RenderFrame</h1>
    </div>
  );
};

export default Home;
