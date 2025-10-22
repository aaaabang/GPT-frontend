// 从localStorage加载保存的设置
const loadSavedSettings = () => {
  try {
    const saved = localStorage.getItem("apiSettings");
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error("Error loading saved settings:", error);
    return {};
  }
};

// 默认配置
const DEFAULT_CONFIG = {
  API_KEY: "sk-edf922383b18408e8edf02fd7ec00cf8", // ⚠️ Put your API key here
  BASE_URL: "https://api.deepseek.com/chat/completions",
  MODEL: "deepseek-chat",
  SYSTEM_MESSAGE: "You are a helpful assistant.",
};

// 合并默认配置和保存的设置
const savedSettings = loadSavedSettings();

// API 配置对象
export const API_CONFIG = {
  API_KEY: savedSettings.apiKey || DEFAULT_CONFIG.API_KEY,
  BASE_URL: savedSettings.baseUrl || DEFAULT_CONFIG.BASE_URL,
  MODEL: savedSettings.model || DEFAULT_CONFIG.MODEL,
  SYSTEM_MESSAGE: savedSettings.systemMessage || DEFAULT_CONFIG.SYSTEM_MESSAGE,
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
