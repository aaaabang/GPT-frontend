import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";

import sendIcon from "./assets/send.svg";
// App.jsx
export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return; // 防止发送空消息
    setMessages([...messages, { sender: "user", text: inputValue }]);
    setInputValue("");

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: "" },
    ]);
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="flex w-80 h-full p-2 bg-primary-400 ">
        <Sidebar />
      </div>

      {/* 右侧聊天窗口 */}
      <main className="flex w-full flex-col items-stretch relative bg-transparent">
        {/* 消息列表（可滚动） */}
        <MessageList messages={messages} />

        {/* 输入框只在聊天区底部固定，不遮盖 sidebar */}
        <div className="absolute bottom-0 left-0 right-0 flex bg-transparent backdrop-blur px-30 pb-10 items-center ">
          <textarea
            placeholder="Type a message..."
            className="flex h-30 w-full border border-gray-100 rounded-sm p-2 bg-white resize-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="ml-2 mb-1 p-2 rounded bg-primary-300 hover:bg-primary-400 flex items-center justify-center"
            style={{ height: "40px" }}
            onClick={() => {
              handleSendMessage();
            }}
            aria-label="Send"
            items-center
          >
            <img src={sendIcon} alt="send" className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
