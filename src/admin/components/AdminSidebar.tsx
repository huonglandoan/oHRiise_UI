import { useState } from "react";
import { AdminTab } from "../types";
import { NAV_ITEMS } from "../data";
import { AdminNavIcon } from "./AdminNavIcon";

interface AdminSidebarProps {
  tab: AdminTab;
  setTab: (tab: AdminTab) => void;
  getBadgeCount: (key?: string) => number;
}

export function AdminSidebar({ tab, setTab, getBadgeCount }: AdminSidebarProps) {
  const [navSearch, setNavSearch] = useState("");

  const filteredNavItems = NAV_ITEMS.filter((item) => {
    if (!navSearch.trim()) return true;
    const q = navSearch.toLowerCase();
    return (
      item.label.toLowerCase().includes(q) ||
      item.sub.toLowerCase().includes(q) ||
      item.group.toLowerCase().includes(q)
    );
  });

  // Group items by group name
  const groups: { name: string; items: typeof NAV_ITEMS }[] = [];
  filteredNavItems.forEach((item) => {
    let grp = groups.find((g) => g.name === item.group);
    if (!grp) {
      grp = { name: item.group, items: [] };
      groups.push(grp);
    }
    grp.items.push(item);
  });

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm mb-6 space-y-3">
      {/* Top Search & Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1267e8] to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-[#1267e830]">
            o
          </div>
          <div>
            <b className="text-sm font-bold text-[#10213a] block leading-tight">
              Console Quản Trị Hệ Thống
            </b>
            <span className="text-[11px] text-[#64748b] block">
              Phân quyền & Cấu hình tập trung (14 Tab)
            </span>
          </div>
        </div>

        {/* Tab Search Bar */}
        <div className="relative min-w-[240px] max-w-xs flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm tính năng quản trị..."
            value={navSearch}
            onChange={(e) => setNavSearch(e.target.value)}
            className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs rounded-xl pl-8 pr-7 py-2 border border-slate-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition"
          />
          <svg
            className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {navSearch && (
            <button
              onClick={() => setNavSearch("")}
              className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Nav Bar Grouped by Category */}
      <div className="space-y-3">
        {groups.map((group) => (
          <div key={group.name} className="space-y-1.5">
            <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>{group.name}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => {
                const active = tab === item.id;
                const count = getBadgeCount(item.badgeKey);

                return (
                  <button
                    key={item.id}
                    onClick={() => setTab(item.id)}
                    className={`h-9 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 transition-all duration-150 ${
                      active
                        ? "bg-white text-[#1267e8] border-2 border-[#1267e8] font-bold shadow-xs"
                        : "bg-white hover:bg-[#f5f7fa] text-[#64748b] border border-[#e5eaf0]"
                    }`}
                  >
                    <span className={active ? "text-[#1267e8] font-bold" : "text-[#98a5b5]"}>
                      <AdminNavIcon iconId={item.icon} />
                    </span>
                    <span>{item.label}</span>
                    {count > 0 && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                          active
                            ? "bg-[#e8f1ff] text-[#1267e8] border border-[#1267e8]/30"
                            : item.badgeKey === "alerts" || item.badgeKey === "dlp"
                            ? "bg-rose-100 text-rose-700 border border-rose-200"
                            : "bg-[#f5f7fa] text-[#64748b] border border-[#e5eaf0]"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSidebar;
