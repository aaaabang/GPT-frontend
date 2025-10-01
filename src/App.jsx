import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./Sidebar";
// App.jsx
export default function App() {
  return (
    <div className="h-screen flex w-full bg-blue-50">
      {/* 左侧侧边栏 */}
      <aside className="w-64 border-r p-4">
        <h2 className="font-bold mb-4">Sidebar</h2>
        <ul className="space-y-2">
          <li className="p-2 bg-gray-100 rounded">Chat 1</li>
          <li className="p-2 bg-gray-100 rounded">Chat 2</li>
        </ul>
      </aside>

      {/* 右侧聊天窗口 */}
      <main className="flex-1 flex flex-col">
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
