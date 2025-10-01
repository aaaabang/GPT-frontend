import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-1/4 border-r p-4">
      <h2 className="font-bold mb-4">Sidebar</h2>
      <ul className="space-y-2">
        <li className="p-2 bg-gray-100 rounded">Chat 1</li>
        <li className="p-2 bg-gray-100 rounded">Chat 2</li>
      </ul>
    </aside>
  );
}
