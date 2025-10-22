import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 持久化存储的键名
const STORAGE_KEYS = {
  CHAT_DATA: "gpt-frontend-chat-data",
  SETTINGS: "gpt-frontend-settings",
};

// 从localStorage加载初始设置数据
const loadInitialSettings = () => {
  try {
    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return savedSettings ? JSON.parse(savedSettings) : {};
  } catch (error) {
    console.warn("Failed to load settings from localStorage:", error);
    return {};
  }
};

const useStore = create(
  persist(
    (set, get) => ({
      // 聊天历史 - 每个session包含title和messages
      history: [],

      // 当前选中的session ID
      currentSessionId: null,

      // 输入框的值
      inputValue: "",

      // 设置窗口的打开状态
      isSettingsOpen: false,

      // Actions
      // 设置输入框的值
      setInputValue: (value) => set({ inputValue: value }),

      // 打开/关闭设置窗口
      openSettings: () => set({ isSettingsOpen: true }),
      closeSettings: () => set({ isSettingsOpen: false }),

      // 创建新的聊天session
      createNewSession: (userMessage) => {
        const { history } = get();
        const newSessionId = history.length;
        const newSession = {
          title: `Chat ${newSessionId + 1}`,
          messages: [userMessage],
        };

        set({
          history: [...history, newSession],
          currentSessionId: newSessionId,
        });

        return newSessionId;
      },

      // 向当前session添加消息
      addMessageToCurrentSession: (message) => {
        const { history, currentSessionId } = get();
        if (currentSessionId === null) return;

        const newHistory = [...history];
        newHistory[currentSessionId].messages.push(message);

        set({ history: newHistory });
      },

      // 更新指定session的最后一条消息（用于流式响应）
      updateLastMessage: (sessionId, newText) => {
        const { history } = get();
        if (sessionId === null || sessionId >= history.length) return;

        const newHistory = [...history];
        const currentMessages = newHistory[sessionId].messages;

        if (
          currentMessages.length > 0 &&
          currentMessages[currentMessages.length - 1].sender === "bot"
        ) {
          // 更新最后一条bot消息
          currentMessages[currentMessages.length - 1].text = newText;
        } else {
          // 添加新的bot消息
          currentMessages.push({ sender: "bot", text: newText });
        }

        set({ history: newHistory });
      },

      // 切换到指定的session
      switchToSession: (sessionId) => {
        set({
          currentSessionId: sessionId,
        });
      },

      // 新建聊天（清空当前选中）
      startNewChat: () => {
        set({
          currentSessionId: null,
          inputValue: "",
        });
      },

      // 删除session
      deleteSession: (sessionId) => {
        const { history, currentSessionId } = get();
        const newHistory = history.filter((_, index) => index !== sessionId);

        set({
          history: newHistory,
          currentSessionId:
            currentSessionId === sessionId
              ? null
              : currentSessionId > sessionId
              ? currentSessionId - 1
              : currentSessionId,
        });
      },

      // 获取当前session的messages（计算属性）
      getCurrentMessages: () => {
        const { history, currentSessionId } = get();
        if (currentSessionId === null) return [];
        return history[currentSessionId]?.messages || [];
      },

      // 新增：设置指定session的标题
      setSessionTitle: (idx, newTitle) => {
        const { history } = get();
        if (idx < 0 || idx >= history.length) return;
        const newHistory = [...history];
        newHistory[idx] = { ...newHistory[idx], title: newTitle };
        set({ history: newHistory });
      },

      // 设置数据持久化相关方法
      settings: loadInitialSettings(),

      // 更新设置并保存到localStorage
      updateSettings: (newSettings) => {
        const updatedSettings = { ...get().settings, ...newSettings };
        set({ settings: updatedSettings });
        try {
          localStorage.setItem(
            STORAGE_KEYS.SETTINGS,
            JSON.stringify(updatedSettings)
          );
        } catch (error) {
          console.warn("Failed to save settings to localStorage:", error);
        }
      },

      // 获取设置
      getSettings: () => {
        return get().settings;
      },

      // 清除所有数据（用于重置）
      clearAllData: () => {
        set({
          history: [],
          currentSessionId: null,
          inputValue: "",
          settings: {},
        });
        try {
          localStorage.removeItem(STORAGE_KEYS.SETTINGS);
          localStorage.removeItem(STORAGE_KEYS.CHAT_DATA);
        } catch (error) {
          console.warn("Failed to clear localStorage:", error);
        }
      },
    }),
    {
      name: STORAGE_KEYS.CHAT_DATA,
      storage: createJSONStorage(() => localStorage),
      // 只持久化聊天相关的数据，设置单独处理
      partialize: (state) => ({
        history: state.history,
        currentSessionId: state.currentSessionId,
        inputValue: state.inputValue,
      }),
      // 版本控制，以便将来做数据迁移
      version: 1,
      // 错误处理
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.warn("Failed to rehydrate chat data:", error);
        } else {
          console.log("Chat data rehydrated successfully");
        }
      },
    }
  )
);

export default useStore;
