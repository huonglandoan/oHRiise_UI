import React, { useState } from "react";
import { AuditLogItem, SessionItem } from "../types";

interface AuditLogsTabProps {
  logs: AuditLogItem[];
  sessions: SessionItem[];
  setSessions: React.Dispatch<React.SetStateAction<SessionItem[]>>;
  showToast: (msg: string) => void;
}

export function AuditLogsTab({
  logs,
  sessions,
  setSessions,
  showToast,
}: AuditLogsTabProps) {
  const [logFilterQuery, setLogFilterQuery] = useState("");
  const [logTypeFilter, setLogTypeFilter] = useState("");

  const filteredLogs = logs.filter(
    (l) =>
      (!logTypeFilter || l.type === logTypeFilter) &&
      (l.user + l.action).toLowerCase().includes(logFilterQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Audit Log Table */}
      <div className="lg:col-span-2 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-base font-bold text-slate-900">
            Audit Trail (Nhật ký không thể sửa xóa)
          </h3>
          <div className="flex gap-2">
            <input
              className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Lọc người dùng hoặc hành động..."
              value={logFilterQuery}
              onChange={(e) => setLogFilterQuery(e.target.value)}
            />
            <select
              className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={logTypeFilter}
              onChange={(e) => setLogTypeFilter(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="ok">Bình thường</option>
              <option value="w">Cần chú ý</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                <th className="py-2.5">Thời gian</th>
                <th className="py-2.5">Người thực hiện</th>
                <th className="py-2.5">Hành động chi tiết</th>
                <th className="py-2.5">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((l, idx) => (
                <tr key={idx}>
                  <td className="py-2.5 font-mono text-slate-400">{l.time}</td>
                  <td className="py-2.5 font-bold text-slate-900">
                    {l.user}
                  </td>
                  <td className="py-2.5">{l.action}</td>
                  <td className="py-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        l.type === "ok"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {l.type === "ok" ? "OK" : "Chú ý"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sessions & Force Logout */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Phiên đăng nhập thời gian thực
        </h3>
        <div className="space-y-3">
          {sessions.map((s, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 text-xs"
            >
              <div className="flex justify-between items-center">
                <b className="text-slate-900 font-bold">
                  {s.user}
                </b>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    s.status.includes("hoạt động")
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {s.status}
                </span>
              </div>
              <p className="text-slate-500 font-mono text-[11px]">
                {s.device} · {s.ip}
              </p>
              {s.status.includes("hoạt động") && (
                <button
                  className="w-full py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded border border-rose-200"
                  onClick={() => {
                    setSessions((prev) =>
                      prev.map((item, i) =>
                        i === idx
                          ? { ...item, status: "Đã buộc đăng xuất" }
                          : item
                      )
                    );
                    showToast(`Đã hủy phiên và buộc đăng xuất ${s.user}`);
                  }}
                >
                  Buộc đăng xuất ngay
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuditLogsTab;
