import React, { useState } from "react";
import { BranchData } from "../types";

interface BranchesTabProps {
  branches: BranchData[];
  setBranches: React.Dispatch<React.SetStateAction<BranchData[]>>;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  showToast: (msg: string) => void;
}

export function BranchesTab({
  branches,
  setBranches,
  openModal,
  closeModal,
  showToast,
}: BranchesTabProps) {
  const [selectedBranchGps, setSelectedBranchGps] = useState<number>(0);
  const [newBranchName, setNewBranchName] = useState("");
  const [newBranchAddress, setNewBranchAddress] = useState("");
  const [newBranchRadius, setNewBranchRadius] = useState(100);

  const curBranch = branches[selectedBranchGps] || branches[0];
  const circleSize = Math.round((curBranch.radius / 300) * 120 + 20);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Branch List */}
      <div className="lg:col-span-2 bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-base font-bold text-slate-900">Danh sách chi nhánh</h3>
          <button
            className="px-3.5 py-1.5 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-lg transition shadow-xs"
            onClick={() => {
              openModal(
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Thêm chi nhánh mới</h3>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Tên chi nhánh</label>
                    <input
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900 focus:bg-white outline-none"
                      placeholder="Ví dụ: Chi nhánh Cầu Giấy..."
                      onChange={(e) => setNewBranchName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Địa chỉ</label>
                    <input
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900 focus:bg-white outline-none"
                      placeholder="Địa chỉ chi tiết..."
                      onChange={(e) => setNewBranchAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">
                      Bán kính GPS hợp lệ (mét)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900 focus:bg-white outline-none"
                      defaultValue={100}
                      onChange={(e) => setNewBranchRadius(+e.target.value)}
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
                        if (!newBranchName.trim()) {
                          showToast("Vui lòng nhập tên chi nhánh");
                          return;
                        }
                        setBranches((prev) => [
                          ...prev,
                          {
                            code: `BR-${prev.length + 1}`,
                            name: newBranchName,
                            address: newBranchAddress || "Chưa cập nhật địa chỉ",
                            radius: newBranchRadius || 100,
                            empCount: 0,
                            active: 1,
                          },
                        ]);
                        closeModal();
                        showToast("Đã tạo chi nhánh mới thành công");
                      }}
                    >
                      Thêm chi nhánh
                    </button>
                  </div>
                </div>
              );
            }}
          >
            + Thêm chi nhánh
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Mã</th>
                <th className="py-2.5 px-3">Tên & Địa chỉ</th>
                <th className="py-2.5 px-3">Bán kính GPS</th>
                <th className="py-2.5 px-3">Nhân sự</th>
                <th className="py-2.5 px-3">Trạng thái</th>
                <th className="py-2.5 px-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {branches.map((b, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">{b.code}</td>
                  <td className="py-3 px-3">
                    <b className="block text-slate-900">{b.name}</b>
                    <span className="text-xs text-slate-400 block">{b.address}</span>
                  </td>
                  <td className="py-3 px-3 font-medium text-blue-600">{b.radius} m</td>
                  <td className="py-3 px-3 font-semibold">{b.empCount} người</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        b.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {b.active ? "Hoạt động" : "Đã đóng"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-1.5">
                    <button
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
                      onClick={() => setSelectedBranchGps(idx)}
                    >
                      Cấu hình GPS
                    </button>
                    <button
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${
                        b.active
                          ? "bg-rose-50 hover:bg-rose-100 text-rose-600"
                          : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600"
                      }`}
                      onClick={() => {
                        setBranches((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, active: item.active ? 0 : 1 } : item))
                        );
                        showToast(`Đã ${b.active ? "đóng" : "mở lại"} chi nhánh ${b.name}`);
                      }}
                    >
                      {b.active ? "Đóng" : "Mở lại"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GPS Radius Preview Simulator */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Mô phỏng GPS Check-in · {curBranch.code}
        </h3>

        <div className="relative h-44 rounded-xl bg-gradient-to-br from-blue-100 via-teal-50 to-emerald-100 border border-slate-200 overflow-hidden flex items-center justify-center">
          {/* Pulsing radius circle */}
          <div
            className="rounded-full border-2 border-blue-500 bg-blue-500/15 transition-all duration-300 flex items-center justify-center"
            style={{ width: `${circleSize}px`, height: `${circleSize}px` }}
          >
            <div className="w-3 h-3 rounded-full bg-rose-500 border-2 border-white shadow-xs" />
          </div>
          <span className="absolute bottom-2 left-2 text-[10px] text-slate-500 font-mono">
            Tọa độ: 10.7743° N, 106.7035° E
          </span>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Bán kính hợp lệ:</span>
            <span className="text-blue-600 font-bold">{curBranch.radius} mét</span>
          </div>
          <input
            type="range"
            min="30"
            max="300"
            value={curBranch.radius}
            className="w-full accent-blue-600"
            onChange={(e) => {
              const val = +e.target.value;
              setBranches((prev) =>
                prev.map((item, i) => (i === selectedBranchGps ? { ...item, radius: val } : item))
              );
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Vĩ độ (Lat)</label>
            <input
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-900 outline-none"
              defaultValue="10.7743"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Kinh độ (Long)</label>
            <input
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-900 outline-none"
              defaultValue="106.7035"
            />
          </div>
        </div>

        <button
          className="w-full py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-xl transition shadow-xs"
          onClick={() => showToast(`Đã lưu thiết lập GPS cho ${curBranch.name}`)}
        >
          Lưu cấu hình GPS
        </button>
      </div>
    </div>
  );
}
