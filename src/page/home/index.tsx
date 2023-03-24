/* eslint-disable */
/* eslint-disable */

import { useEffect } from "react";
import { Link } from "react-router-dom";
import rangy from "rangy";

const Home = () => {
  useEffect(() => {
    // function handleClick(event: MouseEvent) {
    //   const range = rangy.getSelection().getRangeAt(0);
    //   const startContainer = range.startContainer as HTMLElement;
    //   const endContainer = range.endContainer as HTMLElement;
    //   const paragraph = getContainingParagraph(startContainer, endContainer);
    //   console.log("paragraph: ", {paragraph});
    //   console.log(paragraph.textContent);
    // }

    // function getContainingParagraph(
    //   startContainer: HTMLElement,
    //   endContainer: HTMLElement
    // ): HTMLElement {
    //   const paragraphElements = ["P", "DIV"];
    //   const isParagraph = (nodeName: string) =>
    //     paragraphElements.includes(nodeName);
    //   let container = startContainer;
    //   while (container !== null && !isParagraph(container.nodeName)) {
    //     container = container.parentNode as HTMLElement;
    //   }
    //   if (container !== null) {
    //     return container;
    //   }
    //   container = endContainer;
    //   while (container !== null && !isParagraph(container.nodeName)) {
    //     container = container.parentNode as HTMLElement;
    //   }
    //   return container;
    // }
  
    // function getSentence(sentenceNum) {
    //   let sentence = '';
    //   let offset = 0;
    //   const upNum = 4;
  
    //   const selection = window.getSelection();
    //   if (selection) {
    //     let word = (selection.toString() || '').trim();
  
    //     if (selection.rangeCount < 1)
    //         return;
    
    //     let node = selection.getRangeAt(0).commonAncestorContainer;
    
    //     // if (['INPUT', 'TEXTAREA'].indexOf(node.tagName) !== -1) {
    //     //     return;
    //     // }
    
    //     // node = getWebNode(node, upNum);
    
    //     // if (node !== document) {
    //     //     sentence = escapeHtmlTag(node.textContent);
    //     //     offset = getSelectionOffset(node).start;
    //     // }
    
    //     // return cutSentence(word, offset, sentence, sentenceNum);
    //   }
      
  // }
    document.addEventListener("click", (e) => {
      
    });
  }, []);
  return (
    <div>
      <Link to={"/component"}>component</Link>
      <div className="para">
        <span id="A52750P474957S1296966" className="sent">
          <span>
            <span id="A52750P474957S12969660" className="word ">
              Many
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969661" className="word ">
              years
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969662" className="word ">
              ago
            </span>
            ,<span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969663" className="word ">
              in
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969664" className="word ">
              a
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969665" className="word ">
              city
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969666" className="word ">
              in
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969667" className="word ">
              Arabia
            </span>
            ,<span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969668" className="word ">
              there
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969669" className="word ">
              was
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129696610" className="word ">
              a
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129696611" className="word ">
              boy
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129696612" className="word ">
              called
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129696613" className="word ">
              Aladdin
            </span>
            .<span className="white-space"> </span>
          </span>
        </span>
        <span id="A52750P474957S1296969" className="sent">
          <span>
            <span id="A52750P474957S12969690" className="word ">
              He
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969691" className="word ">
              lived
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969692" className="word ">
              with
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969693" className="word ">
              his
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969694" className="word ">
              mother
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969695" className="word ">
              in
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969696" className="word ">
              a
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969697" className="word ">
              little
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969698" className="word ">
              house
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969699" className="word ">
              near
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129696910" className="word ">
              the
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129696911" className="word ">
              market
            </span>
            ,<span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129696912" className="word ">
              and
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129696913" className="word ">
              they
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129696914" className="word ">
              were
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129696915" className="word ">
              very
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129696916" className="word ">
              poor
            </span>
            .<span className="white-space"> </span>
          </span>
        </span>
        <span id="A52750P474957S1296972" className="sent">
          <span>
            <span id="A52750P474957S12969720" className="word ">
              Aladdin’s
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969721" className="word ">
              mother
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969722" className="word ">
              worked
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969723" className="word ">
              all
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969724" className="word ">
              day
            </span>
            ,<span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969725" className="word ">
              and
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969726" className="word ">
              sometimes
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969727" className="word ">
              half
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969728" className="word ">
              the
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S12969729" className="word ">
              night
            </span>
            ,<span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129697210" className="word ">
              but
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129697211" className="word ">
              Aladdin
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129697212" className="word ">
              never
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129697213" className="word ">
              helped
            </span>
            <span className="white-space"> </span>
          </span>
          <span>
            <span id="A52750P474957S129697214" className="word ">
              her
            </span>
            .<span className="white-space"> </span>
          </span>
        </span>
      </div>
      <p>
        React doesn’t offer a way to “attach” reusable behavior to a component
        (for example, connecting it to a store). If you’ve worked with React for
        a while, you may be familiar with patterns like{" "}
        <a href="/docs/render-props.html">render props</a> and{" "}
        <a href="/docs/higher-order-components.html">higher-order components</a>{" "}
        that try to solve this. But these patterns require you to restructure
        your components when you use them, which can be cumbersome and make code
        harder to follow. If you look at a typical React application in React
        DevTools, you will likely find a “wrapper hell” of components surrounded
        by layers of providers, consumers, higher-order components, render
        props, and other abstractions. While we could{" "}
        <a
          href="https://github.com/facebook/react-devtools/pull/503"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          filter them out in DevTools
        </a>
        , this points to a deeper underlying problem: React needs a better
        primitive for sharing stateful logic.
      </p>
      <div>
        <span>I</span><span>love</span><span>you.</span>
        <span>React</span><span>doesn’t</span><span>offer.</span>
      </div>
    </div>
  );
};

export default Home;
