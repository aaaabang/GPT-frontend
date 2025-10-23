import { useState } from "react";
import useStore from "../store";
import sendIcon from "../assets/send.svg";
import {
  API_CONFIG,
  createChatRequest,
  getRequestHeaders,
} from "../config/api";

const ChatInput = () => {
  const {
    inputValue,
    setInputValue,
    currentSessionId,
    createNewSession,
    addMessageToCurrentSession,
    updateLastMessage,
    getCurrentMessages,
  } = useStore();

  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || isSending) return; // 防止发送空消息或重复发送

    const userMsg = { sender: "user", text: inputValue };
    const inputText = inputValue.trim();
    let targetSessionId;

    // 如果没有当前session，创建新的session
    if (currentSessionId === null) {
      console.log("Creating new session");
      targetSessionId = createNewSession(userMsg);
    } else {
      // 否则添加到当前session
      addMessageToCurrentSession(userMsg);
      targetSessionId = currentSessionId;
    }

    setInputValue("");
    setIsSending(true);

    try {
      // 获取当前session的所有消息并转换为OpenAI格式
      const currentMessages = getCurrentMessages();
      const messages = [
        { role: "system", content: API_CONFIG.SYSTEM_MESSAGE },
        ...currentMessages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
      ];

      await streamChatbotRequest(messages, targetSessionId);
    } catch (error) {
      console.error("发送消息失败:", error);
    } finally {
      setIsSending(false);
    }
  };

  const streamChatbotRequest = async (messages, targetSessionId) => {
    try {
      const response = await fetch(API_CONFIG.BASE_URL, {
        method: "POST",
        headers: getRequestHeaders(),
        body: JSON.stringify(createChatRequest(messages)),
      });

      if (!response.body) {
        throw new Error("ReadableStream not supported or no body returned");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

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
                updateLastMessage(targetSessionId, result);
                console.log(content);
              }
            } catch (err) {
              console.error("JSON parse error", err);
            }
          }
        });
      }

      console.log("Final result:", result);
    } catch (error) {
      console.error("Stream request failed:", error);
      throw error;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 flex bg-transparent backdrop-blur px-30 pb-10 items-center">
      <textarea
        placeholder="Type a message..."
        className="flex h-30 w-full border border-gray-100 rounded-sm p-2 bg-white resize-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isSending}
      />
      <button
        className={`ml-2 mb-1 p-2 rounded flex justify-center items-center ${
          isSending || inputValue.trim() === ""
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-primary-300 hover:bg-primary-400"
        }`}
        style={{ height: "40px" }}
        onClick={handleSendMessage}
        disabled={isSending || inputValue.trim() === ""}
        aria-label="Send"
      >
        {isSending ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <img src={sendIcon} alt="send" className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default ChatInput;
