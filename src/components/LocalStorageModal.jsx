import { useState } from "react";
import xIcon from "../assets/x.svg";
import useStore from "../store";

function LocalStorageModal({ isOpen, onClose }) {
  const {
    getSettings,
    updateSettings,
    history,
    currentSessionId,
    clearAllData,
  } = useStore();

  // 导出数据
  const handleExportData = () => {
    try {
      const exportData = {
        version: "1.0",
        timestamp: new Date().toISOString(),
        settings: getSettings(),
        chatHistory: history,
        currentSessionId: currentSessionId,
      };
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `gpt-frontend-backup-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      alert("Data exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    }
  };

  // 导入数据
  const handleImportData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importData = JSON.parse(e.target.result);
          if (
            !importData.version ||
            !importData.settings ||
            !importData.chatHistory
          ) {
            throw new Error("Invalid data format");
          }
          if (confirm("This will replace all current data. Are you sure?")) {
            updateSettings(importData.settings);
            useStore.setState({
              history: importData.chatHistory,
              currentSessionId: importData.currentSessionId || null,
            });
            alert("Data imported successfully!");
            onClose();
          }
        } catch (error) {
          console.error("Import failed:", error);
          alert("Import failed. Please check the file format.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  // 清除所有数据
  const handleClearData = () => {
    if (
      confirm("This will delete all chat history and settings. Are you sure?")
    ) {
      clearAllData();
      alert("All data cleared successfully!");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="bg-white rounded-lg shadow-xl w-[400px] max-w-lg p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Local Storage</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <img src={xIcon} alt="close" className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <button
              onClick={handleExportData}
              className="px-3 py-2 text-sm text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors"
            >
              导出数据
            </button>
            <button
              onClick={handleImportData}
              className="px-3 py-2 text-sm text-green-600 border border-green-300 rounded-md hover:bg-green-50 transition-colors"
            >
              导入数据
            </button>
            <button
              onClick={handleClearData}
              className="px-3 py-2 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
            >
              清除所有数据
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocalStorageModal;
