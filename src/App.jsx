import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";
// App.jsx
export default function App() {
  const messages = [
    { sender: "user", text: "Hello!" },
    { sender: "gpt", text: "Hi there! How can I assist you today?" },
    { sender: "user", text: "Can you tell me a joke?" },
    {
      sender: "gpt",
      text: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    },
    { sender: "user", text: "Hello!" },
    { sender: "gpt", text: "Hi there! How can I assist you today?" },
    { sender: "user", text: "Can you tell me a joke?" },
    {
      sender: "gpt",
      text: "Why did the scarecrow win an award? Because he was outstanding in his field! long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text ",
    },
    { sender: "user", text: "Hello!" },
    { sender: "gpt", text: "Hi there! How can I assist you today?" },
    { sender: "user", text: "Can you tell me a joke?" },
    {
      sender: "gpt",
      text: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    },
    { sender: "user", text: "Hello!" },
    { sender: "gpt", text: "Hi there! How can I assist you today?" },
    { sender: "user", text: "Can you tell me a joke?" },
    {
      sender: "gpt",
      text: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    },
    {
      sender: "user",
      text: "long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text end",
    },
  ];

  return (
    <div className="flex w-screen h-screen">
      <div className="flex w-80 h-full p-2 bg-primary-400 ">
        <Sidebar />
      </div>

      {/* 右侧聊天窗口 */}
      <main className="flex w-full flex-col items-center relative bg-transparent">
        {/* 消息列表（可滚动） */}
        <MessageList messages={messages} />

        {/* 输入框只在聊天区底部固定，不遮盖 sidebar */}
        <div className="absolute bottom-0 left-0 right-0 flex bg-transparent backdrop-blur px-30 pb-10">
          <textarea
            placeholder="Type a message..."
            className="flex h-30 w-full border border-gray-100 rounded-sm p-2 bg-white resize-none"
          />
        </div>
      </main>
    </div>
  );
}
