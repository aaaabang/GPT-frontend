import React, { useRef, useLayoutEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import userIcon from "../assets/user.svg";
import gptIcon from "../assets/gpt.svg";
import "highlight.js/styles/github.css";
import "katex/dist/katex.min.css";

//MessageItem component
function MessageItem({ sender, text }) {
  let item = null;
  if (sender === "user") {
    item = (
      <div className="flex bg-white w-full px-40 py-8">
        <img src={userIcon} alt="user" className="w-6 h-6 mr-4 bg-yellow-200" />
        <div className="flex-1 whitespace-pre-wrap">{text}</div>
      </div>
    );
  } else {
    item = (
      <div className="flex bg-gray-100 px-40 py-8">
        <img src={gptIcon} alt="gpt" className="w-6 h-6 mr-4 bg-blue-200" />
        <div className="flex-1 prose prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <pre className="bg-gray-800 text-white p-3 rounded-md overflow-x-auto">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code
                    className="bg-gray-200 px-1 py-0.5 rounded text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre({ children, ...props }) {
                return <div {...props}>{children}</div>;
              },
            }}
          >
            {text}
          </ReactMarkdown>
        </div>
      </div>
    );
  }

  return item;
}

function MessageList({ messages }) {
  const listRef = useRef(null);

  useLayoutEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    // 立即滚动到底部以应对 messages 数组的直接变化
    listElement.scrollTop = listElement.scrollHeight;

    // 使用 MutationObserver 监听子节点和内容的变化
    const observer = new MutationObserver(() => {
      // 当内容变化导致高度增加时，平滑滚动到底部
      listElement.scrollTo({
        top: listElement.scrollHeight,
        behavior: "smooth",
      });
    });

    // 配置 observer 监听子节点列表、子树和字符数据的变化
    observer.observe(listElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // 组件卸载时停止监听
    return () => observer.disconnect();
  }, [messages]); // 初始设置时依赖 messages

  if (!messages || messages.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-gray-500">
        <span className="font-bold text-lg">
          Before starting, please enter your API key in Settings.
        </span>
      </div>
    );
  }

  return (
    <div ref={listRef} className="flex-1 min-h-0 overflow-auto flex flex-col">
      {messages.map((msg, index) => (
        <MessageItem key={index} sender={msg.sender} text={msg.text} />
      ))}
      {/* The empty div at the bottom is no longer needed for scrolling */}
      <div className="h-40 flex-shrink-0"></div>
    </div>
  );
}

export default MessageList;
