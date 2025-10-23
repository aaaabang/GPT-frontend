import { useState } from "react";
import plusIcon from "../assets/plus.svg";
import settingIcon from "../assets/settings.svg";
import trashIcon from "../assets/trash-2.svg";
import messageIcon from "../assets/message-square.svg";
import editIcon from "../assets/edit.svg";
import checkIcon from "../assets/check.svg";
import xIcon from "../assets/x.svg";
import useStore from "../store";
import LocalStorageModal from "./LocalStorageModal";

function Sidebar() {
  const {
    history,
    currentSessionId,
    switchToSession,
    startNewChat,
    deleteSession,
    setSessionTitle,
    openSettings,
  } = useStore();

  const [deletedFlag, setDeletedFlag] = useState(false);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const [isLocalStorageOpen, setLocalStorageOpen] = useState(false);
  const rightButtons = [
    {
      show: (currentSessionId, idx, deletedFlag) =>
        currentSessionId === idx && !deletedFlag,
      buttons: [
        {
          icon: editIcon,
          alt: "edit",
          onClick: (e, idx) => {
            e.stopPropagation();
            setEditingIdx(idx);
            setEditingTitle(history[idx].title);
          },
        },
        {
          icon: trashIcon,
          alt: "trash",
          onClick: (e, idx) => {
            e.stopPropagation();
            console.log("delete click", idx);
            setDeletedFlag(true);
          },
        },
      ],
    },
    {
      show: (currentSessionId, idx, deletedFlag) =>
        currentSessionId === idx && deletedFlag,
      buttons: [
        {
          icon: checkIcon,
          alt: "confirm",
          onClick: (e, idx) => {
            e.stopPropagation();
            console.log("delete confirm click", idx);
            deleteSession(idx);
            setDeletedFlag(false);
          },
        },
        {
          icon: xIcon,
          alt: "cancel",
          onClick: (e, idx) => {
            e.stopPropagation();
            console.log("delete cancel click", idx);
            setDeletedFlag(false);
          },
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full h-full  bg-primary-400 justify-between">
      <div className="flex flex-col space-y-2 h-0 flex-1 min-h-0">
        <button
          className="flex items-center p-2 rounded-sm bg-primary-400 text-black border border-black-500 hover:bg-primary-300"
          onClick={() => {
            startNewChat();
            setDeletedFlag(false);
            setEditingIdx(null);
          }}
        >
          <img src={plusIcon} alt="plus" className="w-4 h-4 mr-2" />
          New Chat
        </button>
        {/* 根据 list 渲染按钮 */}
        <div className="flex-1 min-h-0 overflow-auto flex flex-col space-y-2">
          {history.map((item, idx) => (
            <button
              key={idx}
              className={`flex items-center p-2 rounded-sm text-black hover:bg-primary-300 justify-between ${
                currentSessionId === idx ? "bg-primary-200" : "bg-primary-400"
              }`}
              onClick={() => {
                switchToSession(idx);
                setDeletedFlag(false);
                setEditingIdx(null);
                console.log("selectedIdx", idx);
              }}
            >
              <div className="flex items-center">
                <img src={messageIcon} alt="message" className="w-4 h-4 mr-2" />
                {editingIdx === idx ? (
                  <input
                    className="border rounded px-1 py-0.5 w-24 text-black"
                    value={editingTitle}
                    autoFocus
                    onChange={(e) => setEditingTitle(e.target.value)}
                  />
                ) : (
                  item.title
                )}
              </div>
              {editingIdx === idx ? (
                <div className="flex items-center space-x-1 ml-2">
                  <span
                    key="edit-confirm"
                    role="button"
                    tabIndex={0}
                    className="opacity-100 hover:bg-primary-100 cursor-pointer p-1 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSessionTitle(idx, editingTitle);
                      setEditingIdx(null);
                      setEditingTitle("");
                    }}
                  >
                    <img src={checkIcon} alt="confirm" className="w-4 h-4" />
                  </span>
                  <span
                    key="edit-cancel"
                    role="button"
                    tabIndex={0}
                    className="opacity-100 hover:bg-primary-100 cursor-pointer p-1 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingIdx(null);
                      setEditingTitle("");
                    }}
                  >
                    <img src={xIcon} alt="cancel" className="w-4 h-4" />
                  </span>
                </div>
              ) : (
                rightButtons.map(
                  (group, gIdx) =>
                    group.show(currentSessionId, idx, deletedFlag) && (
                      <div
                        className="flex items-center space-x-1 ml-2"
                        key={gIdx}
                      >
                        {group.buttons.map(({ icon, alt, onClick }, bIdx) => (
                          <span
                            key={alt}
                            role="button"
                            tabIndex={0}
                            className="opacity-100 hover:bg-primary-100 cursor-pointer p-1 rounded"
                            onClick={(e) => onClick(e, idx)}
                          >
                            <img src={icon} alt={alt} className="w-4 h-4" />
                          </span>
                        ))}
                      </div>
                    )
                )
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <hr className="bg-gray-500" />
        <button
          className="flex items-center p-2 rounded-sm bg-primary-400 text-black border border-black-500 hover:bg-primary-300"
          onClick={() => setLocalStorageOpen(true)}
        >
          <img src={trashIcon} alt="trash" className="w-4 h-4 mr-2" />
          Local Storage
        </button>
        <LocalStorageModal
          isOpen={isLocalStorageOpen}
          onClose={() => setLocalStorageOpen(false)}
        />
        <button
          className="flex items-center p-2 rounded-sm bg-primary-400 text-black border border-black-500 hover:bg-primary-300"
          onClick={openSettings}
        >
          <img src={settingIcon} alt="settings" className="w-4 h-4 mr-2" />
          Settings
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
