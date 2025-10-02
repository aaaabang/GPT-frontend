import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./Sidebar";
// App.jsx
export default function App() {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex w-80 h-full p-1 bg-primary ">
        <Sidebar />
      </div>

      {/* 右侧聊天窗口 */}
      <main className="flex w-full flex-col">
        {/* 消息列表（可滚动） */}
        <section className="flex-1 overflow-auto p-4 bg-gray-50">
          <div className="mb-2">Message 1</div>
          <div className="mb-2">Message 2</div>
          <div className="mb-2">Message 3</div>
        </section>

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
