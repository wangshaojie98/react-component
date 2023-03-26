import { useEffect } from "react";
import { Link } from "react-router-dom";
import rangy from "rangy";

const Home = () => {
  useEffect(() => {
    var HtmlTagsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;'
  };
  
  function replaceHtmlTag(tag) {
      return HtmlTagsToReplace[tag] || tag;
  }
  
  function escapeHtmlTag(string) {
      return string.replace(/[&<>]/g, replaceHtmlTag);
  }
  
  function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  
  String.prototype.replaceAll = function(search, replacement) {
      let target = this;
      search = escapeRegExp(search);
      return target.replace(new RegExp(search, 'g'), replacement);
  };
  
  String.prototype.searchAll = function(search) {
      let target = this;
      search = escapeRegExp(search);
      let regex = new RegExp(search, 'gi');
      let result = 0;
      let indices = [];
      while ((result = regex.exec(target)) && result != '') {
          indices.push(result.index);
      }
      return indices;
  };
  
  
  
  function cutSentence(word, offset, sentence, sentenceNum) {
  
      if (sentenceNum > 0) {
          let arr = sentence.match(/((?![.!?;:。！？]['"’”]?\s).|\n)*[.!?;:。！？]['"’”]?(\s|.*$)/g);
          if (arr && arr.length > 1) {
              arr = arr.reduceRight((accumulation, current) => {
                  if (current.search(/\.\w{0,3}\.\s$/g) != -1) {
                      accumulation[0] = current + accumulation[0];
                  } else {
                      accumulation.unshift(current);
                  }
                  return accumulation;
              }, ['']);
              arr = arr.filter(x => x.length);
          } else {
              arr = [sentence];
          }
          console.log('arr: ', arr);
  
          let index = arr.findIndex(ele => { //try to exactly match to word based on offset.
              if (ele.indexOf(word) !== -1 && ele.searchAll(word).indexOf(offset) != -1)
                  return true;
              else
                  offset -= ele.length;
          });
  
          if (index == -1) // fallback if can not exactly find word.
              index = arr.findIndex(ele => ele.indexOf(word) !== -1);
  
          let left = Math.ceil((sentenceNum - 1) / 2);
          let start = index - left;
          let end = index + ((sentenceNum - 1) - left);
  
          if (start < 0) {
              start = 0;
              end = sentenceNum - 1;
          } else if (end > (arr.length - 1)) {
              end = arr.length - 1;
  
              if ((end - (sentenceNum - 1)) < 0) {
                  start = 0;
              } else {
                  start = end - (sentenceNum - 1);
              }
          }
  
          return arr.slice(start, end + 1).join('').replaceAll(word, word.replace(/[^\s]+/g,'<b>\$&</b>'));
      } else {
          return sentence.replace(word, word.replace(/[^\s]+/g,'<b>\$&</b>'));
      }
  }
  
  function getSelectionOffset(node) {
      var range = window.getSelection().getRangeAt(0);
      var clone = range.cloneRange();
      clone.selectNodeContents(node);
      clone.setEnd(range.startContainer, range.startOffset);
      let start = clone.toString().length;
      clone.setEnd(range.endContainer, range.endOffset);
      let end = clone.toString().length;
      return { start, end };
  
  }
  
  function getSentence(sentenceNum) {
      let sentence = '';
      let offset = 0;
      const upNum = 4;
  
      const selection = window.getSelection();
      let word = (selection.toString() || '').trim();
  
      if (selection.rangeCount < 1)
          return;
  
      let node = selection.getRangeAt(0).commonAncestorContainer;
  
      if (['INPUT', 'TEXTAREA'].indexOf(node.tagName) !== -1) {
          return;
      }
  
      node = getWebNode(node, upNum);
  
      if (node !== document) {
          sentence = escapeHtmlTag(node.textContent);
          offset = getSelectionOffset(node).start;
      }
  
      return cutSentence(word, offset, sentence, sentenceNum);
  }
  
  function getWebNode(node, deep) {
      const blockTags = ['LI', 'P', 'DIV', 'BODY'];
      const nodeName = node.nodeName.toUpperCase();
      if (blockTags.includes(nodeName) || deep === 0) {
          return node;
      } else {
          return getWebNode(node.parentElement, deep - 1);
      }
  }

    document.addEventListener("click", (e) => {
      // handleClick(e)
      const res = getSentence(4);
      console.log('res: ', res);
    });
  }, []);
  return (
    <div>
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
