import React from "react";
import { UserAcc, DelegationItem, ApprovalRuleItem } from "../types";
import { TODAY } from "../data";

interface DelegationsTabProps {
  users: UserAcc[];
  delegations: DelegationItem[];
  setDelegations: React.Dispatch<React.SetStateAction<DelegationItem[]>>;
  approvalRules: ApprovalRuleItem[];
  setApprovalRules: React.Dispatch<React.SetStateAction<ApprovalRuleItem[]>>;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  showToast: (msg: string) => void;
}

export function DelegationsTab({
  users,
  delegations,
  setDelegations,
  approvalRules,
  setApprovalRules,
  openModal,
  closeModal,
  showToast,
}: DelegationsTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Temporary Delegations */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Ủy quyền có thời hạn</h3>
          <button
            className="px-3.5 py-1.5 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-lg transition shadow-xs"
            onClick={() => {
              let del1 = users[0]?.name || "Admin";
              let del2 = users[1]?.name || "HR";
              let feat = "Duyệt nghỉ phép";
              let sDate = TODAY;
              let eDate = "2026-10-15";
              openModal(
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Tạo ủy quyền có thời hạn</h3>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Người ủy quyền (Team Lead)</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-900 outline-none"
                      onChange={(e) => (del1 = e.target.value)}
                    >
                      {users.slice(0, 8).map((u) => (
                        <option key={u.email} value={u.name}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Người nhận ủy quyền</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-900 outline-none"
                      onChange={(e) => (del2 = e.target.value)}
                    >
                      {users.slice(8, 20).map((u) => (
                        <option key={u.email} value={u.name}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Quyền được ủy</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-900 outline-none"
                      onChange={(e) => (feat = e.target.value)}
                    >
                      <option>Duyệt nghỉ phép</option>
                      <option>Duyệt WFH</option>
                      <option>Duyệt điều chỉnh công</option>
                      <option>Duyệt expense claim</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Từ ngày</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-900 outline-none"
                        defaultValue={sDate}
                        onChange={(e) => (sDate = e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Đến ngày</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-900 outline-none"
                        defaultValue={eDate}
                        onChange={(e) => (eDate = e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg"
                      onClick={closeModal}
                    >
                      Hủy
                    </button>
                    <button
                      className="px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-lg transition shadow-xs"
                      onClick={() => {
                        setDelegations((prev) => [
                          ...prev,
                          { delegator: del1, delegatee: del2, feature: feat, startDate: sDate, endDate: eDate },
                        ]);
                        closeModal();
                        showToast("Đã tạo lệnh ủy quyền mới thành công");
                      }}
                    >
                      Tạo ủy quyền
                    </button>
                  </div>
                </div>
              );
            }}
          >
            + Tạo ủy quyền
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Ủy quyền</th>
                <th className="py-2.5 px-3">Người nhận</th>
                <th className="py-2.5 px-3">Quyền</th>
                <th className="py-2.5 px-3">Thời hạn</th>
                <th className="py-2.5 px-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {delegations.map((d, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 font-medium">{d.delegator}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{d.delegatee}</td>
                  <td className="py-2.5 px-3">{d.feature}</td>
                  <td className="py-2.5 px-3 text-slate-500">
                    {d.startDate.slice(5)} → {d.endDate.slice(5)}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-lg transition"
                      onClick={() => {
                        setDelegations((prev) => prev.filter((_, i) => i !== idx));
                        showToast("Đã thu hồi ủy quyền");
                      }}
                    >
                      Thu hồi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conditional Approval Rules Builder */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Quy tắc duyệt theo điều kiện</h3>
          <button
            className="px-3.5 py-1.5 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-lg transition shadow-xs"
            onClick={() => {
              let rFeat = "Duyệt nghỉ phép";
              let rVal = 3;
              let rRole = "Team Lead";
              openModal(
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Thêm quy tắc duyệt mới</h3>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Chức năng</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-900 outline-none"
                      onChange={(e) => (rFeat = e.target.value)}
                    >
                      <option>Duyệt nghỉ phép</option>
                      <option>Expense claim</option>
                      <option>Duyệt WFH</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Ngưỡng giá trị không vượt quá</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-900 outline-none"
                      defaultValue={3}
                      onChange={(e) => (rVal = +e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Người duyệt khi thỏa điều kiện</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-900 outline-none"
                      onChange={(e) => (rRole = e.target.value)}
                    >
                      <option>Team Lead</option>
                      <option>HR Chi nhánh</option>
                      <option>HR Tổng</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg"
                      onClick={closeModal}
                    >
                      Hủy
                    </button>
                    <button
                      className="px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-lg transition shadow-xs"
                      onClick={() => {
                        setApprovalRules((prev) => [
                          ...prev,
                          {
                            feature: rFeat,
                            field: "Giá trị",
                            operator: "≤",
                            val: rVal,
                            approverRole: rRole,
                            overflowRule: "Vượt ngưỡng: chuyển cấp cao hơn",
                            active: 1,
                          },
                        ]);
                        closeModal();
                        showToast("Đã thêm quy tắc duyệt mới");
                      }}
                    >
                      Thêm quy tắc
                    </button>
                  </div>
                </div>
              );
            }}
          >
            + Thêm quy tắc
          </button>
        </div>

        <div className="space-y-3">
          {approvalRules.map((r, idx) => (
            <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <b className="text-slate-900 font-bold">{r.feature}</b>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${r.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                  {r.active ? "Kích hoạt" : "Tắt"}
                </span>
              </div>
              <p className="text-slate-600 font-medium">
                Điều kiện: {r.field} {r.operator} {r.val} → Người duyệt: <b className="text-blue-600">{r.approverRole}</b>
              </p>
              <p className="text-[11px] text-slate-400">{r.overflowRule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
