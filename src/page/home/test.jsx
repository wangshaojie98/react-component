import { useEffect } from "react";
import { Link } from "react-router-dom";
import rangy from "rangy";

const Home = () => {
  useEffect(() => {
    // var HtmlTagsToReplace = {
    //   "&": "&amp;",
    //   "<": "&lt;",
    //   ">": "&gt;",
    // };

    // function replaceHtmlTag(tag) {
    //   return HtmlTagsToReplace[tag] || tag;
    // }

    // function escapeHtmlTag(string) {
    //   return string.replace(/[&<>]/g, replaceHtmlTag);
    // }

    // function escapeRegExp(string) {
    //   return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    // }

    // String.prototype.replaceAll = function (search, replacement) {
    //   let target = this;
    //   search = escapeRegExp(search);
    //   return target.replace(new RegExp(search, "g"), replacement);
    // };

    // String.prototype.searchAll = function (search) {
    //   let target = this;
    //   search = escapeRegExp(search);
    //   let regex = new RegExp(search, "gi");
    //   let result = 0;
    //   let indices = [];
    //   while ((result = regex.exec(target)) && result != "") {
    //     indices.push(result.index);
    //   }
    //   return indices;
    // };

    // function cutSentence(word, offset, sentence, sentenceNum) {
    //   if (sentenceNum > 0) {
    //     let arr = sentence.match(
    //       /((?![.!?;:。！？]['"’”]?\s).|\n)*[.!?;:。！？]['"’”]?(\s|.*$)/g
    //     );
    //     if (arr && arr.length > 1) {
    //       arr = arr.reduceRight(
    //         (accumulation, current) => {
    //           if (current.search(/\.\w{0,3}\.\s$/g) != -1) {
    //             accumulation[0] = current + accumulation[0];
    //           } else {
    //             accumulation.unshift(current);
    //           }
    //           return accumulation;
    //         },
    //         [""]
    //       );
    //       arr = arr.filter((x) => x.length);
    //     } else {
    //       arr = [sentence];
    //     }
    //     console.log("arr: ", arr);

    //     let index = arr.findIndex((ele) => {
    //       //try to exactly match to word based on offset.
    //       if (
    //         ele.indexOf(word) !== -1 &&
    //         ele.searchAll(word).indexOf(offset) != -1
    //       )
    //         return true;
    //       else offset -= ele.length;
    //     });

    //     if (index == -1)
    //       // fallback if can not exactly find word.
    //       index = arr.findIndex((ele) => ele.indexOf(word) !== -1);

    //     let left = Math.ceil((sentenceNum - 1) / 2);
    //     let start = index - left;
    //     let end = index + (sentenceNum - 1 - left);

    //     if (start < 0) {
    //       start = 0;
    //       end = sentenceNum - 1;
    //     } else if (end > arr.length - 1) {
    //       end = arr.length - 1;

    //       if (end - (sentenceNum - 1) < 0) {
    //         start = 0;
    //       } else {
    //         start = end - (sentenceNum - 1);
    //       }
    //     }

    //     return arr
    //       .slice(start, end + 1)
    //       .join("")
    //       .replaceAll(word, word.replace(/[^\s]+/g, "<b>$&</b>"));
    //   } else {
    //     return sentence.replace(word, word.replace(/[^\s]+/g, "<b>$&</b>"));
    //   }
    // }

    // function getSelectionOffset(node) {
    //   var range = window.getSelection().getRangeAt(0);
    //   var clone = range.cloneRange();
    //   clone.selectNodeContents(node);
    //   clone.setEnd(range.startContainer, range.startOffset);
    //   let start = clone.toString().length;
    //   clone.setEnd(range.endContainer, range.endOffset);
    //   let end = clone.toString().length;
    //   return { start, end };
    // }

    // function getSentence(sentenceNum) {
    //   let sentence = "";
    //   let offset = 0;
    //   const upNum = 4;

    //   const selection = window.getSelection();
    //   let word = (selection.toString() || "").trim();

    //   if (selection.rangeCount < 1) return;

    //   let node = selection.getRangeAt(0).commonAncestorContainer;

    //   if (["INPUT", "TEXTAREA"].indexOf(node.tagName) !== -1) {
    //     return;
    //   }

    //   node = getWebNode(node, upNum);

    //   if (node !== document) {
    //     sentence = escapeHtmlTag(node.textContent);
    //     offset = getSelectionOffset(node).start;
    //   }

    //   return cutSentence(word, offset, sentence, sentenceNum);
    // }

    // function getWebNode(node, deep) {
    //   const blockTags = ["LI", "P", "DIV", "BODY"];
    //   const nodeName = node.nodeName.toUpperCase();
    //   if (blockTags.includes(nodeName) || deep === 0) {
    //     return node;
    //   } else {
    //     return getWebNode(node.parentElement, deep - 1);
    //   }
    // }

    document.addEventListener("click", (e) => {
      // handleClick(e)
      //   const res = getSentence(4);
      //   console.log("res: ", res);

      // 获取选中的文本
      var selectedText = window.getSelection().toString();
      console.log('range: ', window.getSelection().getRangeAt(0));

      // 获取选中文本所在的节点
      var selectedNode = window.getSelection().anchorNode.parentNode;
      console.log("selectedNode: ", { selectedNode });

      // 获取选中文本所在的块级元素
      var selectedBlock = selectedNode.closest("div, p, article");
      console.log('selectedBlock: ', {selectedBlock});

      // 获取选中文本所在的句子
      var selectedSentence = selectedBlock.textContent
        .split(/[.!?]/)
        .find(function (sentence) {
          return sentence.includes(selectedText);
        });

      // 获取选中文本所在的前一句话
      var previousSentence = selectedBlock.textContent
        .split(/[.!?]/)
        .slice(0, -1)
        .reverse()
        .find(function (sentence) {
          return sentence.trim() !== "" && !sentence.includes(selectedText);
        });

      // 获取选中文本所在的后一句话
      var nextSentence = selectedBlock.textContent
        .split(/[.!?]/)
        .find(function (sentence) {
          return sentence.trim() !== "" && !sentence.includes(selectedText);
        });

      // 将选中文本及其前后两句话记录下来
      var result =
        previousSentence + " " + selectedSentence + " " + nextSentence;
      console.log(result);
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
