import { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import Settings from "./components/Settings";
import PersistenceStatus from "./components/PersistenceStatus";
import useStore from "./store";
import { refreshApiConfig } from "./config/api";

export default function App() {
  const { getCurrentMessages, isSettingsOpen, closeSettings, getSettings } =
    useStore();
  const currentMessages = getCurrentMessages();

  // 应用初始化时同步设置到API配置
  useEffect(() => {
    // 刷新API配置以确保使用最新的持久化设置
    refreshApiConfig();

    // 可选：打印加载状态到控制台（开发时有用）
    console.log("App initialized with persistent data:");
    console.log("- Chat history loaded from localStorage");
    console.log("- Settings loaded from localStorage");
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <div className="flex w-80 h-full p-2 bg-primary-400 ">
        <Sidebar />
      </div>

      {/* 右侧聊天窗口 */}
      <main className="flex w-full flex-col items-stretch relative bg-transparent">
        {/* 消息列表（可滚动） */}
        <MessageList messages={currentMessages} />
        {/* 输入框组件 */}
        <ChatInput />
      </main>

      {/* 设置窗口 */}
      <Settings isOpen={isSettingsOpen} onClose={closeSettings} />
    </div>
  );
}
