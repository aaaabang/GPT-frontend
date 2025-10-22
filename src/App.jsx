import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";
import useStore from "./store";

import sendIcon from "./assets/send.svg";
// App.jsx
export default function App() {
  const {
    inputValue,
    setInputValue,
    currentSessionId,
    createNewSession,
    addMessageToCurrentSession,
    updateLastMessage,
    getCurrentMessages,
  } = useStore();

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return; // 防止发送空消息

    const userMsg = { sender: "user", text: inputValue };
    const inputText = inputValue.trim();
    
    // 如果没有当前session，创建新的session
    if (currentSessionId === null) {
      console.log("Creating new session");
      createNewSession(userMsg);
    } else {
      // 否则添加到当前session
      addMessageToCurrentSession(userMsg);
    }

    setInputValue("");
    streamOpenAIRequest(inputText);
  };

  const API_KEY = "sk-edf922383b18408e8edf02fd7ec00cf8"; // ⚠️ Put your API key here

  async function streamOpenAIRequest(inputText) {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat", // 可以换成你要的模型
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: inputText },
        ],
        stream: true, // 开启流式响应
      }),
    });

    if (!response.body) {
      console.error("ReadableStream not supported or no body returned");
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let result = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // 将字节解码为字符串
      const chunk = decoder.decode(value, { stream: true });

      chunk.split("\n").forEach((line) => {
        line = line.trim();
        if (line.startsWith("data: ")) {
          const dataStr = line.replace("data: ", "").trim();
          if (dataStr === "[DONE]") return;

          try {
            const data = JSON.parse(dataStr);
            const content = data.choices[0].delta?.content;
            if (content) {
              result += content;
              updateLastMessage(result);
              // 这里可以实时显示在页面上
              console.log(content);
            }
          } catch (err) {
            console.error("JSON parse error", err);
          }
        }
      });
    }

    console.log("Final result:", result);
  }

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
        {/* 输入框只在聊天区底部固定，不遮盖 sidebar */}
        <div className="absolute bottom-0 left-0 right-0 flex bg-transparent backdrop-blur px-30 pb-10 items-center ">
          <textarea
            placeholder="Type a message..."
            className="flex h-30 w-full border border-gray-100 rounded-sm p-2 bg-white resize-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="ml-2 mb-1 p-2 rounded bg-primary-300 hover:bg-primary-400 flex justify-center items-center"
            style={{ height: "40px" }}
            onClick={() => {
              handleSendMessage();
            }}
            aria-label="Send"
          >
            <img src={sendIcon} alt="send" className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
