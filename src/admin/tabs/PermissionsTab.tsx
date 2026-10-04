import React, { useState } from "react";
import { UserAcc, PermissionTemplate } from "../types";
import { MODULE_NAMES, ACTION_COLS, SENSITIVE_CELL_HIGHLIGHTS } from "../data";

interface PermissionsTabProps {
  users: UserAcc[];
  setUsers: React.Dispatch<React.SetStateAction<UserAcc[]>>;
  templates: PermissionTemplate[];
  showToast: (msg: string) => void;
  triggerAuditAction: (actionStr: string) => void;
  checkSoDConflicts: (matrix: number[][]) => string[];
}

export function PermissionsTab({
  users,
  setUsers,
  templates,
  showToast,
  triggerAuditAction,
  checkSoDConflicts,
}: PermissionsTabProps) {
  const getTemplate = (id: string) =>
    templates.find((t) => t.id === id) || templates[0];

  const hrUsers = users.map((u, idx) => ({ u, idx })).filter(({ u }) => u.role === "HR");
  const [selectedHrUserIdx, setSelectedHrUserIdx] = useState(0);

  const activeHrUser = hrUsers[selectedHrUserIdx]?.u || hrUsers[0]?.u;
  const activeTemplate = activeHrUser ? getTemplate(activeHrUser.templateId) : templates[0];
  const [editingMatrix, setEditingMatrix] = useState<number[][]>(activeTemplate.p);

  const handleToggleCell = (mIdx: number, cIdx: number) => {
    setEditingMatrix((prev) =>
      prev.map((row, rI) => {
        if (rI !== mIdx) return row;
        const newRow = [...row];
        if (cIdx === 0 && newRow[0] === 1) {
          return [0, 0, 0, 0, 0];
        }
        newRow[cIdx] = newRow[cIdx] ? 0 : 1;
        if (cIdx > 0 && newRow[cIdx]) {
          newRow[0] = 1;
        }
        return newRow;
      })
    );
  };

  const sodWarnings = checkSoDConflicts(editingMatrix);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
        {/* User & Template Selector Toolbar */}
        <div className="flex flex-wrap items-center gap-4 border-b border-slate-200 pb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Chọn tài khoản HR</label>
            <select
              className="px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-900 focus:bg-white font-medium outline-none"
              value={selectedHrUserIdx}
              onChange={(e) => {
                const idx = +e.target.value;
                setSelectedHrUserIdx(idx);
                const u = hrUsers[idx]?.u;
                if (u) setEditingMatrix(getTemplate(u.templateId).p);
              }}
            >
              {hrUsers.map(({ u }, i) => (
                <option key={i} value={i}>
                  {u.name} · {getTemplate(u.templateId).n}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Gán bộ Template quyền</label>
            <select
              className="px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-900 focus:bg-white font-medium outline-none"
              value={activeHrUser?.templateId}
              onChange={(e) => {
                const tId = e.target.value;
                if (activeHrUser) {
                  setUsers((prev) =>
                    prev.map((u) => (u.email === activeHrUser.email ? { ...u, templateId: tId } : u))
                  );
                }
                setEditingMatrix(getTemplate(tId).p);
                showToast("Đã thay đổi bộ template mặc định");
              }}
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.n}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-5">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
              Khớp 100% với Template {activeTemplate.n}
            </span>
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Chức năng hệ thống</th>
                {ACTION_COLS.map((col, i) => (
                  <th key={i} className="py-2.5 px-3 text-center">
                    {col}
                  </th>
                ))}
                <th className="py-2.5 px-3 text-center">Phạm vi dữ liệu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {MODULE_NAMES.map(([mName], i) => (
                <tr key={i} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{mName}</td>
                  {ACTION_COLS.map((_, c) => {
                    const active = editingMatrix[i][c];
                    const isSensitive = SENSITIVE_CELL_HIGHLIGHTS.includes(`${i},${c}`);
                    return (
                      <td key={c} className="py-2.5 px-3 text-center">
                        <button
                          className={`w-6 h-6 rounded-md border font-bold text-xs transition flex items-center justify-center ${
                            active
                              ? "bg-white border-2 border-blue-600 text-blue-600 font-extrabold shadow-xs"
                              : "bg-white border border-slate-300 text-transparent hover:border-slate-400"
                          } ${isSensitive ? "ring-2 ring-rose-400 ring-offset-1" : ""}`}
                          onClick={() => handleToggleCell(i, c)}
                        >
                          ✓
                        </button>
                      </td>
                    );
                  })}
                  <td className="py-2.5 px-3 text-center">
                    <select className="px-2 py-1 border border-slate-200 rounded text-xs bg-white text-slate-900 outline-none">
                      <option>{activeTemplate.s}</option>
                      <option>Chi nhánh đăng ký</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SoD Warnings Display */}
        {sodWarnings.length > 0 ? (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
            {sodWarnings.map((w, idx) => (
              <div key={idx} className="text-xs text-amber-800 font-medium">
                ⚠ Cảnh báo Phân tách nhiệm vụ (SoD): {w}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-emerald-600 font-semibold">
            ✓ Cấu hình hợp lệ: Không phát hiện xung đột phân tách nhiệm vụ (Separation of Duties).
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl transition shadow-xs"
            onClick={() => setEditingMatrix(activeTemplate.p)}
          >
            Đặt lại theo Template
          </button>
          <button
            className="px-4 py-2 bg-white hover:bg-slate-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-xl transition shadow-xs"
            onClick={() => triggerAuditAction(`Cập nhật ma trận phân quyền cho ${activeHrUser?.name || "HR"}`)}
          >
            Lưu thay đổi ma trận
          </button>
        </div>
      </div>
    </div>
  );
}
