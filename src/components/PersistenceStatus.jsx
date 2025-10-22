import { useState, useEffect } from "react";
import databaseIcon from "../assets/database.svg";

function PersistenceStatus() {
  const [showStatus, setShowStatus] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    // 检查localStorage的更新
    const checkLastSaved = () => {
      const chatData = localStorage.getItem("gpt-frontend-chat-data");
      const settings = localStorage.getItem("gpt-frontend-settings");

      if (chatData || settings) {
        setLastSaved(new Date().toLocaleTimeString());
      }
    };

    // 初始检查
    checkLastSaved();

    // 监听localStorage变化
    const handleStorageChange = () => {
      checkLastSaved();
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 2000);
    };

    window.addEventListener("storage", handleStorageChange);

    // 监听页面可见性变化，在页面重新获得焦点时检查数据
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkLastSaved();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (!showStatus && !lastSaved) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showStatus && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-pulse">
          <img src={databaseIcon} alt="database" className="w-4 h-4" />
          <span className="text-sm">Data saved automatically</span>
        </div>
      )}

      {lastSaved && (
        <div
          className="bg-gray-100 border border-gray-300 text-gray-600 px-2 py-1 rounded text-xs mt-2 cursor-pointer hover:bg-gray-200 transition-colors"
          title="Last data save time"
          onClick={() => setShowStatus(!showStatus)}
        >
          Last saved: {lastSaved}
        </div>
      )}
    </div>
  );
}

export default PersistenceStatus;
