import plusIcon from "./assets/plus.svg";
import settingIcon from "./assets/settings.svg";
import trashIcon from "./assets/trash-2.svg";
import messageIcon from "./assets/message-square.svg";
import editIcon from "./assets/edit.svg";
import checkIcon from "./assets/check.svg";
import xIcon from "./assets/x.svg";
import useStore from "./store";

function Sidebar() {
  const {
    history,
    currentSessionId,
    deletedFlag,
    switchToSession,
    startNewChat,
    deleteSession,
    setDeletedFlag,
  } = useStore();

  // 右侧按钮配置
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
                console.log("selectedIdx", idx);
              }}
            >
              <div className="flex items-center">
                <img src={messageIcon} alt="message" className="w-4 h-4 mr-2" />
                {item.title}
              </div>
              {rightButtons.map(
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
