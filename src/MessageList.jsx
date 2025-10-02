import React from "react";
import userIcon from "./assets/user.svg";
import gptIcon from "./assets/gpt.svg";

//MessageItem component
function MessageItem({ sender, text }) {
  let item = null;
  if (sender === "user") {
    item = (
      <div className="flex bg-white w-full px-15 py-8">
        <img src={userIcon} alt="user" className="w-6 h-6 mr-2 bg-yellow-200" />
        <span className="flex-1">{text}</span>
      </div>
    );
  } else {
    item = (
      <div className="flex bg-gray-100 px-15 py-8">
        <img src={gptIcon} alt="gpt" className="w-6 h-6 mr-2 bg-blue-200" />
        <span className="flex-1">{text}</span>
      </div>
    );
  }

  return item;
}

function MessageList({ messages }) {
  return (
    <div className="flex-1 min-h-0 overflow-auto flex flex-col">
      {messages.map((msg, index) => (
        <MessageItem key={index} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
}

export default MessageList;
