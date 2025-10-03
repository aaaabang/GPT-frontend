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
    <div className="flex flex-col w-full h-full  bg-primary-400 justify-between">
      <div className="flex flex-col space-y-2 h-0 flex-1 min-h-0">
        <button className="flex items-center p-2 rounded-sm bg-primary-400 text-black border border-black-500 hover:bg-primary-300">
          <img src={plusIcon} alt="plus" className="w-4 h-4 mr-2" />
          New Chat
        </button>
        {/* 根据 list 渲染按钮 */}
        <div className="flex-1 min-h-0 overflow-auto flex flex-col space-y-2">
          {buttonList.map((item, idx) => (
            <button
              key={idx}
              className="flex items-center p-2 rounded-sm  text-black hover:bg-primary-300 justify-between"
            >
              <div className="flex items-center">
                <img src={messageIcon} alt="message" className="w-4 h-4 mr-2" />
                {item.label}
              </div>
              <div className="flex items-center space-x-1 ml-2">
                <button className="opacity-100 hover:bg-primary-100">
                  <img src={settingIcon} alt="settings" className="w-4 h-4" />
                </button>
                <button className="opacity-100 hover:bg-primary-100">
                  <img src={trashIcon} alt="trash" className="w-4 h-4" />
                </button>
              </div>
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
