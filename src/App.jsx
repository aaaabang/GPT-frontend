import { useState, useEffect } from "react";
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
  const [history, setHistory] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(-1);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return; // 防止发送空消息

    const userMsg = { sender: "user", text: inputValue };
    //update history
    const hisLength = history.length;
    if (messages.length === 0) {
      console.log("Creating new session");
      const newId = history.length + 1;
      setCurrentSessionId(newId);

      const newSession = {
        title: `Chat ${newId}`,
        messages: [userMsg],
      };
      setHistory([...history, newSession]);
    } else {
      history[currentSessionId - 1].messages.push(userMsg);
      setHistory([...history]);
    }

    setMessages([...messages, userMsg]);
    setInputValue("");

    streamOpenAIRequest();
  };

  useEffect(() => {
    console.log("messages updated:", messages);
  }, [messages]);
  const API_KEY = "<YOUR_API_KEY>"; // ⚠️ Put your API key here

  async function streamOpenAIRequest() {
    // const botResponse = messages[messages.length - 1]?.text;
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
          { role: "user", content: inputValue.trim() },
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
              setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                if (newMessages[newMessages.length - 1].sender !== "bot") {
                  newMessages.push({ sender: "bot", text: result });
                } else {
                  newMessages[newMessages.length - 1] = {
                    ...newMessages[newMessages.length - 1],
                    text: result,
                  };
                }
                return newMessages;
              });
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

  const currentSession = history.find((s) => s.id === currentSessionId);

  return (
    <div className="flex w-screen h-screen">
      <div className="flex w-80 h-full p-2 bg-primary-400 ">
        <Sidebar
          messages={messages}
          setMessages={setMessages}
          currentSessionId={currentSessionId}
          setCurrentSessionId={setCurrentSessionId}
          history={history}
          setHistory={setHistory}
        />
      </div>

      {/* 右侧聊天窗口 */}
      <main className="flex w-full flex-col items-stretch relative bg-transparent">
        {/* 消息列表（可滚动） */}
        {/* TODO: MessageList messages={currentSession?.messages || []} App.jsx:142 Internal React error: Expected static flag was missing. Please notify the React team.*/}
        <MessageList messages={messages || []} />
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
