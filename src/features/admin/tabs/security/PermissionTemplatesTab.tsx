import React, { useState } from "react";
import { UserAcc, PermissionTemplate } from "../../types";
import { SENSITIVE_FIELDS, SENSITIVE_VISIBILITY, parseMatrixStr } from "../../data";

interface PermissionTemplatesTabProps {
  users: UserAcc[];
  templates: PermissionTemplate[];
  setTemplates: React.Dispatch<React.SetStateAction<PermissionTemplate[]>>;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  showToast: (msg: string) => void;
  triggerAuditAction: (actionStr: string) => void;
}

export function PermissionTemplatesTab({
  users,
  templates,
  setTemplates,
  openModal,
  closeModal,
  showToast,
  triggerAuditAction,
}: PermissionTemplatesTabProps) {
  const [activeTemplateIdx, setActiveTemplateIdx] = useState(0);
  const curTemp = templates[activeTemplateIdx] || templates[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Template List */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Bộ Template quyền</h3>
          <button
            className="px-3 py-1.5 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-lg transition shadow-xs"
            onClick={() => {
              let tName = "";
              openModal(
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Tạo Template quyền mới</h3>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Tên Template</label>
                    <input
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900 focus:bg-white outline-none"
                      placeholder="Ví dụ: HR Chuyên trách Tuyển dụng IT..."
                      onChange={(e) => (tName = e.target.value)}
                    />
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
                        if (!tName.trim()) {
                          showToast("Nhập tên template");
                          return;
                        }
                        setTemplates((prev) => [
                          ...prev,
                          {
                            id: `t_${Date.now()}`,
                            n: tName,
                            d: "Template tùy chỉnh mới",
                            s: "Toàn công ty",
                            p: parseMatrixStr("10000 10000 00000 00000 00000 10000 10000 00000 10000 10001 10000 10000 00000 10000"),
                            f: [1, 2, 2, 1, 0],
                            sys: 0,
                          },
                        ]);
                        closeModal();
                        showToast("Đã tạo bộ template mới");
                      }}
                    >
                      Tạo Template
                    </button>
                  </div>
                </div>
              );
            }}
          >
            + Tạo template
          </button>
        </div>

        <div className="space-y-2">
          {templates.map((t, idx) => {
            const assignedCount = users.filter((u) => u.templateId === t.id).length;
            return (
              <div
                key={t.id}
                className={`p-3.5 rounded-xl border cursor-pointer transition ${
                  activeTemplateIdx === idx
                    ? "border-blue-500 bg-blue-50 shadow-xs"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
                onClick={() => setActiveTemplateIdx(idx)}
              >
                <div className="flex items-center justify-between mb-1">
                  <b className="text-sm font-bold text-slate-900">{t.n}</b>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.sys ? "bg-slate-100 text-slate-600" : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {t.sys ? "Hệ thống" : "Tùy chỉnh"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 mb-2">{t.d}</p>
                <span className="text-[11px] text-slate-400">
                  {assignedCount} tài khoản đang dùng · {t.s}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Template Editor */}
      <div className="lg:col-span-2 bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{curTemp.n}</h3>
            <p className="text-xs text-slate-500">{curTemp.d}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
              onClick={() => {
                setTemplates((prev) => [
                  ...prev,
                  {
                    ...curTemp,
                    id: `t_${Date.now()}`,
                    n: `${curTemp.n} (Bản sao)`,
                    sys: 0,
                  },
                ]);
                showToast("Đã nhân bản bộ template thành công");
              }}
            >
              Tạo bản sao
            </button>
            {!curTemp.sys && (
              <button
                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-lg transition"
                onClick={() => {
                  setTemplates((prev) => prev.filter((_, i) => i !== activeTemplateIdx));
                  setActiveTemplateIdx(0);
                  showToast("Đã xóa template tùy chỉnh");
                }}
              >
                Xóa
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Mô tả bộ quyền</label>
            <input
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-900 focus:bg-white outline-none"
              value={curTemp.d}
              onChange={(e) => {
                const val = e.target.value;
                setTemplates((prev) =>
                  prev.map((t, i) => (i === activeTemplateIdx ? { ...t, d: val } : t))
                );
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Hiển thị trường dữ liệu nhạy cảm</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {SENSITIVE_FIELDS.map((fName, i) => (
                <div key={i} className="p-2 bg-slate-50 border border-slate-100 rounded-lg">
                  <span className="text-[11px] text-slate-500 block mb-1">{fName}</span>
                  <select
                    className="w-full px-2 py-1 border border-slate-200 rounded text-xs bg-white text-slate-900 outline-none"
                    value={curTemp.f[i]}
                    onChange={(e) => {
                      const val = +e.target.value;
                      setTemplates((prev) =>
                        prev.map((t, idx) => {
                          if (idx !== activeTemplateIdx) return t;
                          const newF = [...t.f];
                          newF[i] = val;
                          return { ...t, f: newF };
                        })
                      );
                    }}
                  >
                    {SENSITIVE_VISIBILITY.map((vName, vIdx) => (
                      <option key={vIdx} value={vIdx}>
                        {vName}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-xl transition shadow-xs mt-4"
            onClick={() => triggerAuditAction(`Cập nhật bộ Template quyền ${curTemp.n}`)}
          >
            Lưu thay đổi bộ Template
          </button>
        </div>
      </div>
    </div>
  );
}
