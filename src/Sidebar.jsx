import plusIcon from "./assets/plus.svg";
import settingIcon from "./assets/settings.svg";
import trashIcon from "./assets/trash-2.svg";
import messageIcon from "./assets/message-square.svg";

export default function Sidebar() {
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
  return (
    <div className="flex flex-col w-full h-full  bg-primary justify-between">
      <div className="flex flex-col space-y-2 h-0 flex-1 min-h-0">
        <button className="flex items-center p-2 rounded-sm bg-primary text-black border border-black-500 hover:bg-secondary">
          <img src={plusIcon} alt="plus" className="w-4 h-4 mr-2" />
          New Chat
        </button>
        {/* 根据 list 渲染按钮 */}
        <div className="flex-1 min-h-0 overflow-auto flex flex-col space-y-2">
          {buttonList.map((item, idx) => (
            <button
              key={idx}
              className="flex items-center p-2 rounded-sm bg-primary text-black hover:bg-secondary"
            >
              <img src={messageIcon} alt="message" className="w-4 h-4 mr-2" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <hr className="bg-gray-500" />
        <button className="flex items-center p-2 rounded-sm bg-primary text-black border border-black-500 hover:bg-secondary">
          <img src={trashIcon} alt="trash" className="w-4 h-4 mr-2" />
          Clear
        </button>
        <button className="flex items-center p-2 rounded-sm bg-primary text-black border border-black-500 hover:bg-secondary">
          <img src={settingIcon} alt="settings" className="w-4 h-4 mr-2" />
          Settings
        </button>
      </div>
    </div>
  );
}
