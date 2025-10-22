// API 配置文件
export const API_CONFIG = {
  API_KEY: "sk-edf922383b18408e8edf02fd7ec00cf8", // ⚠️ Put your API key here
  BASE_URL: "https://api.deepseek.com/chat/completions",
  MODEL: "deepseek-chat",
  SYSTEM_MESSAGE: "You are a helpful assistant.",
};

export const createChatRequest = (inputText) => ({
  model: API_CONFIG.MODEL,
  messages: [
    { role: "system", content: API_CONFIG.SYSTEM_MESSAGE },
    { role: "user", content: inputText },
  ],
  stream: true,
});

export const getRequestHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_CONFIG.API_KEY}`,
});
