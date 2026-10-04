import React from "react";
import { UserAcc, BranchData, AlertItem, AuditLogItem, AdminTab } from "../types";

interface DashboardTabProps {
  users: UserAcc[];
  branches: BranchData[];
  alerts: AlertItem[];
  pendingDualApprovals: [string, string, number][];
  offboardingQueue: [string, string, string][];
  logs: AuditLogItem[];
  setTab: (t: AdminTab) => void;
}

export function DashboardTab({
  users,
  branches,
  alerts,
  pendingDualApprovals,
  offboardingQueue,
  logs,
  setTab,
}: DashboardTabProps) {
  const activeAccCount = users.filter((u) => u.active).length;
  const activeBranchCount = branches.filter((b) => b.active).length;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Tài khoản đang hoạt động</span>
          <b className="text-2xl text-slate-900 block mt-1">{activeAccCount + 420}</b>
          <span className="text-xs text-emerald-600 font-medium">+8 tài khoản trong tuần</span>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Chi nhánh hoạt động</span>
          <b className="text-2xl text-slate-900 block mt-1">{activeBranchCount}</b>
          <span className="text-xs text-slate-400">1 chi nhánh đã đóng</span>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Cảnh báo chưa xử lý</span>
          <b className="text-2xl text-amber-600 block mt-1">{alerts.length}</b>
          <span className="text-xs text-rose-500 font-medium">1 cảnh báo mức nghiêm trọng</span>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Lượt AI xử lý hôm nay</span>
          <b className="text-2xl text-blue-600 block mt-1">186</b>
          <span className="text-xs text-slate-500">14 CV · 172 phân tích WFH</span>
        </div>
      </div>

      {/* Alerts & System Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts Panel */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Cảnh báo hệ thống</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">
              {alerts.length} chưa xử lý
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {alerts.map((al, idx) => {
              const dotBg = al.type === "e" ? "bg-rose-500" : al.type === "w" ? "bg-amber-500" : "bg-blue-500";
              return (
                <div key={idx} className="py-3 flex items-start gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${dotBg}`} />
                  <div className="flex-1 min-w-0">
                    <b className="text-sm text-slate-800 block">{al.title}</b>
                    <span className="text-xs text-slate-500 block">{al.subtitle}</span>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{al.time}</span>
                </div>
              );
            })}
          </div>
          <button
            className="w-full py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl transition shadow-xs"
            onClick={() => setTab("lg")}
          >
            Xem tất cả nhật ký & cảnh báo
          </button>
        </div>

        {/* Connected Services Panel */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Dịch vụ kết nối & Hạ tầng</h3>
          <div className="space-y-3">
            {[
              { name: "Cơ sở dữ liệu", st: "ok", info: "12 ms · PostgreSQL Cluster" },
              { name: "SMTP (gửi email)", st: "ok", info: "Hàng đợi 0 email" },
              { name: "FCM (push mobile)", st: "ok", info: "98,4% tỷ lệ gửi thành công" },
              { name: "Thiết bị chấm công", st: "w", info: "3/4 thiết bị online" },
              { name: "AI Engine", st: "ok", info: "CV–JD v2.3 · WFH v1.4" },
              { name: "MISA AMIS Sync", st: "ok", info: "Đồng bộ gần nhất 09:02" },
            ].map((serv, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      serv.st === "ok" ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                  <b className="text-sm font-medium text-slate-800">{serv.name}</b>
                </div>
                <span className="text-xs text-slate-500">{serv.info}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Health Summary */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Tình trạng bảo mật & Tuân thủ</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <span className="text-xs text-amber-800 font-medium">Chưa bật MFA</span>
            <b className="text-xl text-amber-900 block mt-1">
              {users.filter((u) => u.role === "Employee").length} tài khoản
            </b>
            <span className="text-xs text-amber-700">Tài khoản nhân viên cơ bản</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-xs text-slate-600 font-medium">Lâu không đăng nhập</span>
            <b className="text-xl text-slate-900 block mt-1">
              {users.filter((u) => /ngày/.test(u.lastLogin)).length} tài khoản
            </b>
            <span className="text-xs text-slate-500">Trên 3 ngày chưa vào app</span>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <span className="text-xs text-blue-800 font-medium">Chờ duyệt quyền nhạy cảm</span>
            <b className="text-xl text-blue-900 block mt-1">
              {pendingDualApprovals.filter((p) => !p[2]).length} yêu cầu
            </b>
            <span className="text-xs text-blue-700">Cần Admin thứ hai phê duyệt</span>
          </div>
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
            <span className="text-xs text-rose-800 font-medium">Chờ khóa Offboarding</span>
            <b className="text-xl text-rose-900 block mt-1">{offboardingQueue.length} tài khoản</b>
            <span className="text-xs text-rose-700">Đã hoàn tất thủ tục nghỉ việc</span>
          </div>
        </div>
      </div>

      {/* Recent Audit Activities */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3">
        <h3 className="text-base font-bold text-slate-900">Nhật ký hoạt động gần đây</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <tbody>
              {logs.slice(0, 5).map((l, idx) => (
                <tr key={idx} className="border-b border-slate-100 last:border-0">
                  <td className="py-2.5 text-xs text-slate-400 font-mono w-20">{l.time}</td>
                  <td className="py-2.5 font-semibold text-slate-900 w-44">{l.user}</td>
                  <td className="py-2.5">{l.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
