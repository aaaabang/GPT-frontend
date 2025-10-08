import React, { useRef, useEffect } from "react";
import userIcon from "./assets/user.svg";
import gptIcon from "./assets/gpt.svg";

//MessageItem component
function MessageItem({ sender, text }) {
  let item = null;
  if (sender === "user") {
    item = (
      <div className="flex bg-white w-full px-40 py-8">
        <img src={userIcon} alt="user" className="w-6 h-6 mr-4 bg-yellow-200" />
        <span className="flex-1">{text}</span>
      </div>
    );
  } else {
    item = (
      <div className="flex bg-gray-100 px-40 py-8">
        <img src={gptIcon} alt="gpt" className="w-6 h-6 mr-4 bg-blue-200" />
        <span className="flex-1">{text}</span>
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
          Start the conversation by typing a message below.
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
