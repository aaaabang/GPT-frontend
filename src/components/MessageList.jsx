import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import userIcon from "../assets/user.svg";
import gptIcon from "../assets/gpt.svg";
import "highlight.js/styles/github.css";

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
            rehypePlugins={[rehypeHighlight]}
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
  if (!messages || messages.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-gray-500">
        <span className="font-bold text-lg">
          Before starting, please enter your API key in Settings.
        </span>
      </div>
    );
  }
  const bottomRef = useRef(null);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="flex-1 min-h-0 overflow-auto flex flex-col">
      {messages.map((msg, index) => (
        <MessageItem key={index} sender={msg.sender} text={msg.text} />
      ))}
      <div ref={bottomRef} className="h-35 flex-shrink-0"></div>
    </div>
  );
}

export default MessageList;
