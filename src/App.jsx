import "./App.css";
import Sidebar from "./components/Sidebar";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import useStore from "./store";

export default function App() {
  const { getCurrentMessages } = useStore();
  const currentMessages = getCurrentMessages();

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
    </div>
  );
}
