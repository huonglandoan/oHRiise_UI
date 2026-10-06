import React, { useState } from "react";
import { DeptData, PermissionTemplate } from "../../types";

interface DepartmentsTabProps {
  depts: DeptData[];
  setDepts: React.Dispatch<React.SetStateAction<DeptData[]>>;
  templates: PermissionTemplate[];
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  showToast: (msg: string) => void;
}

export function DepartmentsTab({
  depts,
  setDepts,
  templates,
  openModal,
  closeModal,
  showToast,
}: DepartmentsTabProps) {
  const [selectedDeptIndex, setSelectedDeptIndex] = useState(0);
  const selectedDept = depts[selectedDeptIndex] || depts[0];

  const getTemplate = (id: string) =>
    templates.find((t) => t.id === id) || { n: "Mặc định" };

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500">Tổng số phòng ban</span>
          <b className="text-xl text-slate-900 block mt-1">{depts.length}</b>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500">Tổng quy mô nhân sự</span>
          <b className="text-xl text-slate-900 block mt-1">
            {depts.reduce((acc, d) => acc + d.count, 0)} người
          </b>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500">Nhóm nghiệp vụ HR</span>
          <b className="text-xl text-slate-900 block mt-1">7 nhóm</b>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500">Tổng số chức danh</span>
          <b className="text-xl text-slate-900 block mt-1">
            {depts.reduce((acc, d) => acc + d.titlesStr.split(",").length, 0)}
          </b>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Danh mục phòng ban</h3>
            <button
              className="px-3.5 py-1.5 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-lg transition shadow-xs"
              onClick={() => {
                let dName = "";
                let dHead = "";
                openModal(
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900">Thêm phòng ban mới</h3>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Tên phòng ban</label>
                      <input
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900 focus:bg-white outline-none"
                        placeholder="Ví dụ: Truyền thông & Thương hiệu..."
                        onChange={(e) => (dName = e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Trưởng phòng</label>
                      <input
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900 focus:bg-white outline-none"
                        placeholder="Họ và tên..."
                        onChange={(e) => (dHead = e.target.value)}
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
                          if (!dName.trim()) {
                            showToast("Nhập tên phòng ban");
                            return;
                          }
                          setDepts((prev) => [
                            ...prev,
                            {
                              code: dName.slice(0, 3).toUpperCase(),
                              name: dName,
                              manager: dHead || "Chưa gán",
                              count: 0,
                              titlesStr: "Trưởng phòng,Chuyên viên",
                            },
                          ]);
                          closeModal();
                          showToast("Đã thêm phòng ban mới thành công");
                        }}
                      >
                        Thêm phòng ban
                      </button>
                    </div>
                  </div>
                );
              }}
            >
              + Thêm phòng ban
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Mã</th>
                  <th className="py-2.5 px-3">Tên phòng ban</th>
                  <th className="py-2.5 px-3">Trưởng phòng</th>
                  <th className="py-2.5 px-3 text-right">Nhân sự</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {depts.map((d, idx) => (
                  <tr
                    key={idx}
                    className={`cursor-pointer transition ${
                      selectedDeptIndex === idx
                        ? "bg-blue-50 font-semibold text-blue-700"
                        : "hover:bg-slate-50"
                    }`}
                    onClick={() => setSelectedDeptIndex(idx)}
                  >
                    <td className="py-3 px-3 font-mono">{d.code}</td>
                    <td className="py-3 px-3">{d.name}</td>
                    <td className="py-3 px-3">{d.manager}</td>
                    <td className="py-3 px-3 text-right font-semibold">{d.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Detail View */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{selectedDept.name}</h3>
            <p className="text-xs text-slate-500">
              Trưởng phòng: <b className="text-slate-800">{selectedDept.manager}</b> ·{" "}
              {selectedDept.count} nhân sự
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Phân bổ nhân sự theo chi nhánh</label>
            <div className="space-y-2">
              {[
                { name: "HCM-Q1", pct: 0.45, color: "bg-blue-600" },
                { name: "HCM-TD", pct: 0.25, color: "bg-cyan-500" },
                { name: "HN-CG", pct: 0.18, color: "bg-emerald-500" },
                { name: "DN-HC", pct: 0.12, color: "bg-lime-500" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="w-16 font-mono text-slate-600">{b.name}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${b.color}`} style={{ width: `${b.pct * 100}%` }} />
                  </div>
                  <b className="w-8 text-right text-slate-700">
                    {Math.round(selectedDept.count * b.pct)}
                  </b>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Danh mục chức danh chuẩn</label>
            <div className="flex flex-wrap gap-1.5">
              {selectedDept.titlesStr.split(",").map((title, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-teal-50 text-teal-700 border border-teal-200 rounded-lg text-xs font-medium"
                >
                  {title}
                </span>
              ))}
            </div>
          </div>

          {selectedDept.code === "NS" && (
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2">
                Nhóm nghiệp vụ HR & Template mặc định
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { group: "HR Tổng", count: 2, tId: "tt" },
                  { group: "HR Chi nhánh", count: 3, tId: "cn" },
                  { group: "HR Tuyển dụng", count: 5, tId: "ta" },
                  { group: "HR C&B", count: 4, tId: "cb" },
                  { group: "HR Đào tạo & PT", count: 3, tId: "ld" },
                  { group: "HR Operations", count: 5, tId: "op" },
                  { group: "HRBP", count: 3, tId: "bp" },
                ].map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100"
                  >
                    <b className="text-slate-800">{h.group}</b>
                    <span className="text-slate-500">{h.count} người</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-semibold">
                      {getTemplate(h.tId).n}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition"
              onClick={() => showToast(`Đã mở chỉnh sửa phòng ban ${selectedDept.name}`)}
            >
              Chỉnh sửa
            </button>
            <button
              className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-xl transition"
              onClick={() =>
                showToast(`Phòng ban ${selectedDept.name} còn ${selectedDept.count} nhân sự. Hãy điều chuyển trước!`)
              }
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
