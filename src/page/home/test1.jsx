import { useEffect } from "react";
import { Link } from "react-router-dom";
import rangy from "rangy";

const Home = () => {
  useEffect(() => {
    const INLINE_TAGS = new Set([
      // Inline text semantics
      'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i',
      'kbd', 'mark', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'small',
      'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr'
    ])
    // match tail                                                    for "..."
    const sentenceTailTester = /^((\.(?![ .]))|[^.?!。？！…\r\n])+(.)\3{0,2}/
    // match head                 a.b is ok    chars that ends a sentence
    const sentenceHeadTester = /((\.(?![ .]))|[^.?!。？！…\r\n])+$/
    /**
    * @returns {string}
    */
    function getSelectionSentence () {
      const selection = window.getSelection()
      console.log('selection: ', selection);
      const selectedText = selection.toString()
      if (!selectedText.trim()) { return '' }
    
      var sentenceHead = ''
      var sentenceTail = ''
    
      const anchorNode = selection.anchorNode
      console.log('anchorNode: ', anchorNode);
      if (anchorNode.nodeType === Node.TEXT_NODE) {
        let leadingText = anchorNode.textContent.slice(0, selection.anchorOffset)
        for (let node = anchorNode.previousSibling; node; node = node.previousSibling) {
          if (node.nodeType === Node.TEXT_NODE) {
            leadingText = node.textContent + leadingText
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            leadingText = node.innerText + leadingText
          }
        }
    
        for (
          let element = anchorNode.parentElement;
          element && INLINE_TAGS.has(element.tagName.toLowerCase()) && element !== document.body;
          element = element.parentElement
        ) {
          for (let el = element.previousElementSibling; el; el = el.previousElementSibling) {
            leadingText = el.innerText + leadingText
          }
        }
    
        sentenceHead = (leadingText.match(sentenceHeadTester) || [''])[0]
      }
    
      const focusNode = selection.focusNode
      if (selection.focusNode.nodeType === Node.TEXT_NODE) {
        let tailingText = selection.focusNode.textContent.slice(selection.focusOffset)
        for (let node = focusNode.nextSibling; node; node = node.nextSibling) {
          if (node.nodeType === Node.TEXT_NODE) {
            tailingText += node.textContent
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            tailingText += node.innerText
          }
        }
    
        for (
          let element = focusNode.parentElement;
          element && INLINE_TAGS.has(element.tagName.toLowerCase()) && element !== document.body;
          element = element.parentElement
        ) {
          for (let el = element.nextElementSibling; el; el = el.nextElementSibling) {
            tailingText += el.innerText
          }
        }
    
        sentenceTail = (tailingText.match(sentenceTailTester) || [''])[0]
      }
    
      return (sentenceHead + selectedText + sentenceTail)
        .replace(/(^\s+)|(\s+$)/gm, '\n') // allow one empty line & trim each line
        .replace(/(^\s+)|(\s+$)/g, '') // remove heading or tailing \n
    }

    document.addEventListener("click", (e) => {
      const res = getSelectionSentence()
      console.log('res: ', res);
    });
  }, []);
  return (
    <div>
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
      <Link to={"/component"}>component</Link>
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
        <span>I</span>
        <span>love</span>
        <span>you.</span>
        <span>React</span>
        <span>doesn’t</span>
        <span>offer.</span>
      </div>
    </div>
  );
};

export default Home;
