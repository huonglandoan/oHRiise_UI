import React, { useState } from "react";
import { MASTER_DATA_HEADERS } from "../../data";

interface MasterDataTabProps {
  masterData: string[][][];
  setMasterData: React.Dispatch<React.SetStateAction<string[][][]>>;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  showToast: (msg: string) => void;
}

export function MasterDataTab({
  masterData,
  setMasterData,
  openModal,
  closeModal,
  showToast,
}: MasterDataTabProps) {
  const [masterDataSubTab, setMasterDataSubTab] = useState(0);

  const curHeaders = MASTER_DATA_HEADERS[masterDataSubTab];
  const curRows = masterData[masterDataSubTab];

  return (
    <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200 pb-3">
        <div className="flex gap-2">
          {MASTER_DATA_HEADERS.map((h, idx) => (
            <button
              key={idx}
              className={`px-3.5 py-1.5 rounded-xl text-xs flex items-center transition ${
                masterDataSubTab === idx
                  ? "bg-white text-blue-600 border-2 border-blue-600 font-bold shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
              onClick={() => setMasterDataSubTab(idx)}
            >
              {h[0]}
            </button>
          ))}
        </div>
        <button
          className="px-3.5 py-1.5 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-xl transition shadow-xs"
          onClick={() => {
            openModal(
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Thêm mục mới vào {curHeaders[0]}</h3>
                {curHeaders.map((col, cIdx) => (
                  <div key={cIdx}>
                    <label className="block text-xs text-slate-500 mb-1">{col}</label>
                    <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900 outline-none" />
                  </div>
                ))}
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
                      closeModal();
                      showToast(`Đã thêm danh mục mới vào ${curHeaders[0]}`);
                    }}
                  >
                    Thêm
                  </button>
                </div>
              </div>
            );
          }}
        >
          + Thêm dòng
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-semibold">
            <tr>
              {curHeaders.map((h, i) => (
                <th key={i} className="py-2.5 px-3">
                  {h}
                </th>
              ))}
              <th className="py-2.5 px-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {curRows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-slate-50 transition">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="py-3 px-3">
                    {cIdx === 0 ? <b className="text-slate-900">{cell}</b> : cell}
                  </td>
                ))}
                <td className="py-3 px-3 text-right">
                  <button
                    className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-lg transition"
                    onClick={() => {
                      setMasterData((prev) => {
                        const copy = [...prev];
                        copy[masterDataSubTab] = copy[masterDataSubTab].filter((_, i) => i !== rIdx);
                        return copy;
                      });
                      showToast("Đã xóa mục danh mục nền");
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
