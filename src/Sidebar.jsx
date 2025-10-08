import plusIcon from "./assets/plus.svg";
import settingIcon from "./assets/settings.svg";
import trashIcon from "./assets/trash-2.svg";
import messageIcon from "./assets/message-square.svg";
import editIcon from "./assets/edit.svg";
import checkIcon from "./assets/check.svg";
import xIcon from "./assets/x.svg";
import { useState } from "react";

const buttonList = [
  { id: 1, label: "按钮1" },
  { id: 2, label: "按钮2" },
  { id: 3, label: "按钮3" },
  { id: 3, label: "按钮3" },
  { id: 3, label: "按钮3" },
  { id: 3, label: "按钮3" },
  { id: 3, label: "按钮3" },
  { id: 3, label: "按钮3" },
  { id: 3, label: "按钮3" },
  { id: 3, label: "按钮3" },
  { id: 3, label: "按钮3" },
  { id: 3, label: "按钮3" },
  { id: 3, label: "按钮3" },
  { id: 3, label: "按钮3" },
  { id: 3, label: "按钮3" },
];

function Sidebar({ messages, setMessages }) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [deletedFlag, setDeletedFlag] = useState(false);

  // 右侧按钮配置
  const rightButtons = [
    {
      show: (selectedIdx, idx, deletedFlag) =>
        selectedIdx === idx && !deletedFlag,
      buttons: [
        {
          icon: editIcon,
          alt: "edit",
          onClick: (e, idx) => {
            e.stopPropagation();
            console.log("edit click", idx);
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
      show: (selectedIdx, idx, deletedFlag) =>
        selectedIdx === idx && deletedFlag,
      buttons: [
        {
          icon: checkIcon,
          alt: "confirm",
          onClick: (e, idx) => {
            e.stopPropagation();
            console.log("delete confirm click", idx);
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
            setSelectedIdx(null);
            setDeletedFlag(false); // 新建聊天时重置删除确认状态
            setMessages([]);
          }}
        >
          <img src={plusIcon} alt="plus" className="w-4 h-4 mr-2" />
          New Chat
        </button>
        {/* 根据 list 渲染按钮 */}
        <div className="flex-1 min-h-0 overflow-auto flex flex-col space-y-2">
          {buttonList.map((item, idx) => (
            <button
              key={idx}
              className={`flex items-center p-2 rounded-sm text-black hover:bg-primary-300 justify-between ${
                selectedIdx === idx ? "bg-primary-200" : "bg-primary-400"
              }`}
              onClick={() => {
                setSelectedIdx(idx);
                setDeletedFlag(false); // 切换按钮时重置删除确认状态
                console.log("selectedIdx", idx);
              }}
            >
              <div className="flex items-center">
                <img src={messageIcon} alt="message" className="w-4 h-4 mr-2" />
                {item.label}
              </div>
              {rightButtons.map(
                (group, gIdx) =>
                  group.show(selectedIdx, idx, deletedFlag) && (
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
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <hr className="bg-gray-500" />
        <button className="flex items-center p-2 rounded-sm bg-primary-400 text-black border border-black-500 hover:bg-primary-300">
          <img src={trashIcon} alt="trash" className="w-4 h-4 mr-2" />
          Local Storage
        </button>
        <button className="flex items-center p-2 rounded-sm bg-primary-400 text-black border border-black-500 hover:bg-primary-300">
          <img src={settingIcon} alt="settings" className="w-4 h-4 mr-2" />
          Settings
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
