import { create } from "zustand";

const useStore = create((set, get) => ({
  // 聊天历史 - 每个session包含title和messages
  history: [],

  // 当前选中的session ID
  currentSessionId: null,

  // 输入框的值
  inputValue: "",

  // Actions
  // 设置输入框的值
  setInputValue: (value) => set({ inputValue: value }),

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
}));

export default useStore;
