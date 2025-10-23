// 从多个位置加载保存的设置（支持新旧格式）
const loadSavedSettings = () => {
  try {
    // 首先尝试从新的store格式加载
    const storeSettings = localStorage.getItem("gpt-frontend-settings");
    if (storeSettings) {
      return JSON.parse(storeSettings);
    }

    // 如果没有找到新格式，尝试从旧格式加载
    const legacySettings = localStorage.getItem("apiSettings");
    if (legacySettings) {
      return JSON.parse(legacySettings);
    }

    return {};
  } catch (error) {
    console.error("Error loading saved settings:", error);
    return {};
  }
};

// 默认配置
const DEFAULT_CONFIG = {
  API_KEY: "", // ⚠️ Put your API key here
  BASE_URL: "https://api.deepseek.com/chat/completions",
  MODEL: "deepseek-chat",
  SYSTEM_MESSAGE: "You are a helpful assistant.",
};

// 合并默认配置和保存的设置
let savedSettings = loadSavedSettings();

// API 配置对象
export const API_CONFIG = {
  API_KEY: savedSettings.apiKey || DEFAULT_CONFIG.API_KEY,
  BASE_URL: savedSettings.baseUrl || DEFAULT_CONFIG.BASE_URL,
  MODEL: savedSettings.model || DEFAULT_CONFIG.MODEL,
  SYSTEM_MESSAGE: savedSettings.systemMessage || DEFAULT_CONFIG.SYSTEM_MESSAGE,
};

// 提供一个刷新配置的方法
export const refreshApiConfig = () => {
  savedSettings = loadSavedSettings();
  API_CONFIG.API_KEY = savedSettings.apiKey || DEFAULT_CONFIG.API_KEY;
  API_CONFIG.BASE_URL = savedSettings.baseUrl || DEFAULT_CONFIG.BASE_URL;
  API_CONFIG.MODEL = savedSettings.model || DEFAULT_CONFIG.MODEL;
  API_CONFIG.SYSTEM_MESSAGE =
    savedSettings.systemMessage || DEFAULT_CONFIG.SYSTEM_MESSAGE;
};

export const createChatRequest = (messages) => ({
  model: API_CONFIG.MODEL,
  messages,
  stream: true,
});

export const getRequestHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_CONFIG.API_KEY}`,
});
