import React from "react";
import Sidebar from "./adminComponent/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 h-screen">
        <Sidebar />
      </aside>
      <main className="flex-grow p-4">
        <div className="rounded-xl bg-gray-100 p-4 shadow-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
