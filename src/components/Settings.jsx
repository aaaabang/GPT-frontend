import { useState, useEffect } from "react";
import xIcon from "../assets/x.svg";
import checkIcon from "../assets/check.svg";
import { API_CONFIG } from "../config/api";
import useStore from "../store";

function Settings({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [model, setModel] = useState("");
  const [systemMessage, setSystemMessage] = useState("");

  // 从store获取设置相关方法
  const { getSettings, updateSettings } = useStore();

  // 当设置窗口打开时，加载当前配置
  useEffect(() => {
    if (isOpen) {
      // 从store和localStorage读取保存的设置，如果没有则使用默认值
      const storeSettings = getSettings();
      const legacySettings = JSON.parse(
        localStorage.getItem("apiSettings") || "{}"
      );

      // 合并设置，优先使用store中的设置，然后是旧的localStorage设置，最后是默认值
      const settings = { ...legacySettings, ...storeSettings };

      setApiKey(settings.apiKey || API_CONFIG.API_KEY);
      setBaseUrl(settings.baseUrl || API_CONFIG.BASE_URL);
      setModel(settings.model || API_CONFIG.MODEL);
      setSystemMessage(settings.systemMessage || API_CONFIG.SYSTEM_MESSAGE);
    }
  }, [isOpen, getSettings]);

  const handleSave = () => {
    // 准备设置数据
    const settings = {
      apiKey,
      baseUrl,
      model,
      systemMessage,
    };

    // 保存到store（会自动持久化到localStorage）
    updateSettings(settings);

    // 同时保存到旧的localStorage位置以保持向后兼容
    localStorage.setItem("apiSettings", JSON.stringify(settings));

    // 更新API_CONFIG（运行时更新）
    API_CONFIG.API_KEY = apiKey;
    API_CONFIG.BASE_URL = baseUrl;
    API_CONFIG.MODEL = model;
    API_CONFIG.SYSTEM_MESSAGE = systemMessage;

    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleReset = () => {
    // 重置为默认值
    setApiKey("");
    setBaseUrl("https://api.deepseek.com/chat/completions");
    setModel("deepseek-chat");
    setSystemMessage("You are a helpful assistant.");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="bg-white rounded-lg shadow-xl w-[500px] max-w-2xl p-8">
        {/* 标题栏 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">API Settings</h2>
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <img src={xIcon} alt="close" className="w-5 h-5" />
          </button>
        </div>

        {/* 表单内容 */}
        <div className="space-y-4">
          {/* API Key */}
          <div>
            <label
              htmlFor="apiKey"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              API Key
            </label>
            <input
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            />
          </div>

          {/* Base URL */}
          <div>
            <label
              htmlFor="baseUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Base URL
            </label>
            <input
              type="text"
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://api.deepseek.com/chat/completions"
            />
          </div>

          {/* Model */}
          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Model
            </label>
            <select
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="deepseek-chat">DeepSeek Chat</option>
              <option value="deepseek-reasoner">DeepSeek Reasoner</option>
            </select>
          </div>

          {/* System Message */}
          <div>
            <label
              htmlFor="systemMessage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              System Message
            </label>
            <textarea
              id="systemMessage"
              value={systemMessage}
              onChange={(e) => setSystemMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="You are a helpful assistant."
            />
          </div>
        </div>

        {/* 按钮组 */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Reset to Default
          </button>
          <div className="flex space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors flex items-center"
            >
              <img src={checkIcon} alt="save" className="w-4 h-4 mr-1" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
