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
  ];

  return (
    <div className="flex w-screen h-screen">
      <div className="flex w-80 h-full p-2 bg-primary ">
        <Sidebar />
      </div>

      {/* 右侧聊天窗口 */}
      <main className="flex w-full flex-col">
        {/* 消息列表（可滚动） */}

        <MessageList messages={messages} />

        {/* 底部输入区 */}
        <footer className="p-4 border-t">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full border rounded p-2"
          />
        </footer>
      </main>
    </div>
  );
}
