export default function Sidebar() {
  const buttonList = [
    { id: 1, label: "按钮1" },
    { id: 2, label: "按钮2" },
    { id: 3, label: "按钮3" },
  ];
  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="flex flex-col p-2 space-y-2">
        <button className="p-2 rounded-md bg-primary text-black border border-black-500 hover:bg-secondary">
          New Chat
        </button>
        {/* 根据 list 渲染按钮 */}
        <div className="flex flex-col space-y-2 mt-2">
          {buttonList.map((item, idx) => (
            <button
              key={idx}
              className="px-4 py-2 rounded bg-primary text-black hover:bg-secondary"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col p-2 space-y-2">
        <hr className="" />
        <button className="p-5 rounded-md bg-primary items-center text-black border border-black-200 hover:bg-secondary">
          Clear Conversations
        </button>
        <button className="p-5 rounded-md bg-primary items-center text-black border border-black-200 hover:bg-secondary">
          Settings
        </button>
      </div>
    </div>
  );
}
