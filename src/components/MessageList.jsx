import React, { useRef, useLayoutEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
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
      <div className="flex bg-white w-full px-30 py-8">
        <img
          src={userIcon}
          alt="user"
          className="w-8 h-8 mr-4 bg-yellow-200 p-1 rounded"
        />
        <div className="flex-1 whitespace-pre-wrap">{text}</div>
      </div>
    );
  } else {
    item = (
      <div className="flex bg-gray-100 px-30 py-8">
        <img
          src={gptIcon}
          alt="gpt"
          className="w-8 h-8 mr-4 bg-blue-200 p-1 rounded"
        />
        <div className="flex-1 prose prose-sm max-w-none leading-relaxed">
          <ReactMarkdown
            children={text}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              // 段落样式 - ChatGPT 风格的行高和间距
              p({ children, ...props }) {
                return (
                  <p className="mb-3 leading-7 text-gray-800" {...props}>
                    {children}
                  </p>
                );
              },

              // 标题样式
              h1({ children, ...props }) {
                return (
                  <h1
                    className="text-2xl font-bold mb-4 mt-6 text-gray-900 border-b border-gray-200 pb-2"
                    {...props}
                  >
                    {children}
                  </h1>
                );
              },
              h2({ children, ...props }) {
                return (
                  <h2
                    className="text-xl font-semibold mb-3 mt-5 text-gray-900"
                    {...props}
                  >
                    {children}
                  </h2>
                );
              },
              h3({ children, ...props }) {
                return (
                  <h3
                    className="text-lg font-medium mb-2 mt-4 text-gray-900"
                    {...props}
                  >
                    {children}
                  </h3>
                );
              },

              // 无序列表 - ChatGPT 风格
              ul({ children, ...props }) {
                return (
                  <ul className="mb-4 space-y-1 ml-6 list-disc" {...props}>
                    {children}
                  </ul>
                );
              },

              // 有序列表
              ol({ children, ...props }) {
                return (
                  <ol className="mb-4 space-y-1 ml-6 list-decimal" {...props}>
                    {children}
                  </ol>
                );
              },

              // 列表项 - 简化处理，让浏览器自动处理编号
              li({ children, ...props }) {
                return (
                  <li className="leading-6 text-gray-800 pl-2" {...props}>
                    {children}
                  </li>
                );
              },

              // 引用块 - ChatGPT 风格的左边框
              blockquote({ children, ...props }) {
                return (
                  <blockquote
                    className="border-l-4 border-blue-400 bg-blue-50 pl-4 pr-4 py-2 my-4 italic text-gray-700 rounded-r"
                    {...props}
                  >
                    {children}
                  </blockquote>
                );
              },

              // 表格样式
              table({ children, ...props }) {
                return (
                  <div className="overflow-x-auto mb-4">
                    <table
                      className="min-w-full border border-gray-300 rounded-lg overflow-hidden"
                      {...props}
                    >
                      {children}
                    </table>
                  </div>
                );
              },
              thead({ children, ...props }) {
                return (
                  <thead className="bg-gray-50" {...props}>
                    {children}
                  </thead>
                );
              },
              th({ children, ...props }) {
                return (
                  <th
                    className="px-4 py-2 text-left font-medium text-gray-900 border-b border-gray-300"
                    {...props}
                  >
                    {children}
                  </th>
                );
              },
              td({ children, ...props }) {
                return (
                  <td
                    className="px-4 py-2 text-gray-800 border-b border-gray-200"
                    {...props}
                  >
                    {children}
                  </td>
                );
              },

              // 代码处理 - 保持你原有的高亮功能
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <div className="mb-4">
                    <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, "")}
                      style={materialLight}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-lg border border-gray-200"
                      customStyle={{
                        padding: "16px",
                        fontSize: "14px",
                        lineHeight: "1.5",
                      }}
                    />
                  </div>
                ) : (
                  <code
                    className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono border"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },

              // 水平分割线
              hr({ ...props }) {
                return (
                  <hr className="my-6 border-t border-gray-300" {...props} />
                );
              },

              // 强调文本
              strong({ children, ...props }) {
                return (
                  <strong className="font-semibold text-gray-900" {...props}>
                    {children}
                  </strong>
                );
              },

              // 斜体
              em({ children, ...props }) {
                return (
                  <em className="italic text-gray-700" {...props}>
                    {children}
                  </em>
                );
              },

              // 链接样式
              a({ children, ...props }) {
                return (
                  <a
                    className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                );
              },
            }}
          ></ReactMarkdown>
        </div>
      </div>
    );
  }

  return item;
}

function MessageList({ messages }) {
  const listRef = useRef(null);
  const userScrolledUpRef = useRef(false); // 记录用户是否向上滚动
  const previousMessageCountRef = useRef(0); // 记录上一次渲染时的消息数量

  useLayoutEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    const currentMessageCount = messages ? messages.length : 0;
    const isNewMessage = currentMessageCount > previousMessageCountRef.current;

    // 只有在新消息到来且用户没有上滑时，才立即滚动到底部
    if (isNewMessage && !userScrolledUpRef.current) {
      listElement.scrollTop = listElement.scrollHeight;
    }

    // 更新消息数量记录
    previousMessageCountRef.current = currentMessageCount;

    // 添加滚动事件监听，跟踪用户是否向上滚动
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = listElement;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      // 如果距离底部超过 100px，认为用户向上滚动了
      if (distanceFromBottom > 100) {
        userScrolledUpRef.current = true;
      } else {
        // 用户滚动回底部，重置标记
        userScrolledUpRef.current = false;
      }
    };

    listElement.addEventListener("scroll", handleScroll);

    // 使用 MutationObserver 监听子节点和内容的变化
    const observer = new MutationObserver(() => {
      // 只有当用户没有上滑时，才平滑滚动到底部
      if (!userScrolledUpRef.current) {
        listElement.scrollTo({
          top: listElement.scrollHeight,
          behavior: "smooth",
        });
      }
    });

    // 配置 observer 监听子节点列表、子树和字符数据的变化
    observer.observe(listElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // 组件卸载时停止监听
    return () => {
      observer.disconnect();
      listElement.removeEventListener("scroll", handleScroll);
    };
  }, [messages]); // 依赖 messages

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
