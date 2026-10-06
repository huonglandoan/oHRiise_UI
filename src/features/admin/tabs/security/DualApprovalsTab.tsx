import React from "react";
import { UserAcc, PermissionTemplate } from "../../types";

interface DualApprovalsTabProps {
  users: UserAcc[];
  templates: PermissionTemplate[];
  pendingDualApprovals: [string, string, number][];
  setPendingDualApprovals: React.Dispatch<React.SetStateAction<[string, string, number][]>>;
  showToast: (msg: string) => void;
}

export function DualApprovalsTab({
  users,
  templates,
  pendingDualApprovals,
  setPendingDualApprovals,
  showToast,
}: DualApprovalsTabProps) {
  const getTemplate = (id: string) =>
    templates.find((t) => t.id === id) || { n: "Mặc định" };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Dual Approval Queue */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Quy tắc Phê duyệt 2 người (Dual Approval)</h3>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            {pendingDualApprovals.filter((p) => !p[2]).length} yêu cầu chờ duyệt
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Mọi thay đổi quyền cấp cao (HR Tổng, xuất dữ liệu tài chính, đổi IP GPS) cần 2 Admin xác nhận để đảm bảo an toàn thông tin.
        </p>

        <div className="space-y-3">
          {pendingDualApprovals.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 border rounded-xl space-y-2 text-xs transition ${
                item[2] ? "bg-slate-50 border-slate-200 opacity-60" : "bg-blue-50/60 border-blue-200"
              }`}
            >
              <div className="flex justify-between items-start">
                <b className="text-slate-900 text-sm font-bold">{item[0]}</b>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item[2] ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {item[2] ? "Đã phê duyệt 2/2" : "Chờ Admin 2 duyệt"}
                </span>
              </div>
              <p className="text-slate-500">
                Khởi tạo bởi: <b className="text-slate-700">{item[1]}</b> · Cần thêm 1 Admin phê duyệt
              </p>
              {!item[2] && (
                <div className="flex gap-2 pt-1">
                  <button
                    className="flex-1 py-1.5 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-lg transition shadow-xs"
                    onClick={() => {
                      setPendingDualApprovals((prev) =>
                        prev.map((p, i) => (i === idx ? [p[0], p[1], 1] : p))
                      );
                      showToast("Đã duyệt thành công yêu cầu phân quyền nhạy cảm");
                    }}
                  >
                    Duyệt xác nhận 2/2
                  </button>
                  <button
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition shadow-xs"
                    onClick={() => {
                      setPendingDualApprovals((prev) => prev.filter((_, i) => i !== idx));
                      showToast("Đã từ chối yêu cầu");
                    }}
                  >
                    Từ chối
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Periodic Access Review Schedule */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Rà soát quyền định kỳ (Access Certification)</h3>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs">
          <div className="flex justify-between font-semibold text-emerald-900">
            <span>Đợt rà soát quyền Quý 4/2026:</span>
            <b>Đã hoàn thành 88%</b>
          </div>
          <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 w-[88%]" />
          </div>
          <p className="text-emerald-700">
            Còn 4 tài khoản HR Chi nhánh chưa xác nhận lại quyền truy cập hạn chót 15/10/2026.
          </p>
        </div>

        <button
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition"
          onClick={() => showToast("Đã gửi email nhắc nhở rà soát quyền tới 4 HR Chi nhánh")}
        >
          Gửi email nhắc rà soát quyền hàng tháng
        </button>
      </div>
    </div>
  );
}
