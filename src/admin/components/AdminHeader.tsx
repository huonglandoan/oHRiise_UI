import { NavItem } from "../types";
import { AdminNavIcon } from "./AdminNavIcon";

interface AdminHeaderProps {
  activeNavItem: NavItem;
}

export function AdminHeader({ activeNavItem }: AdminHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-5 p-4 bg-white border border-[#e5eaf0] rounded-2xl shadow-xs">
      <div>
        <div className="flex items-center gap-2 text-xs text-[#1267e8] font-semibold mb-1 tracking-wide">
          <span>Console Quản Trị</span>
          <span className="text-[#e5eaf0]">/</span>
          <span className="text-[#64748b] font-medium">{activeNavItem.group}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-[#e8f1ff] text-[#1267e8] border border-[#1267e8]/15 flex items-center justify-center">
            <AdminNavIcon iconId={activeNavItem.icon} />
          </span>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#10213a] flex items-center gap-2">
              <span>{activeNavItem.label}</span>
            </h1>
            <p className="text-xs text-[#64748b] mt-0.5 font-normal">{activeNavItem.sub}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-semibold flex items-center gap-2 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Hệ thống 100% Online</span>
        </span>
      </div>
    </div>
  );
}

export default AdminHeader;
