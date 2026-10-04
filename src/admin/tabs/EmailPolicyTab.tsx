import React, { useState } from "react";

interface EmailPolicyTabProps {
  showToast: (msg: string) => void;
  triggerAuditAction: (actionStr: string) => void;
}

export function EmailPolicyTab({ showToast, triggerAuditAction }: EmailPolicyTabProps) {
  const [emailSubTab, setEmailSubTab] = useState(0);

  return (
    <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        {[
          "Chính sách gửi ra ngoài",
          "Thư bị giữ do DLP (3)",
          "Hộp thư dùng chung",
          "Độ tin cậy tên miền & Hàng đợi",
        ].map((title, idx) => (
          <button
            key={idx}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              emailSubTab === idx
                ? "bg-white text-blue-600 border-2 border-blue-600 font-bold shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
            onClick={() => setEmailSubTab(idx)}
          >
            {title}
          </button>
        ))}
      </div>

      {emailSubTab === 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-900">Cấu hình giới hạn gửi ra ngoài</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400">
                  <th className="py-2">Nhóm / Role</th>
                  <th className="py-2">Gửi ngoài</th>
                  <th className="py-2">Tối đa/ngày</th>
                  <th className="py-2">Phạm vi tên miền</th>
                  <th className="py-2">Đính kèm (MB)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["HR Tổng", 1, 200, "Mọi domain", 25],
                  ["HR Chi nhánh", 1, 100, "Mọi domain", 25],
                  ["HR Tuyển dụng", 1, 300, "Mọi domain", 25],
                  ["HR C&B", 1, 50, "Chỉ domain cho phép", 10],
                  ["Employee", 0, 0, "Chỉ nội bộ", 10],
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 font-bold text-slate-900">{row[0]}</td>
                    <td className="py-2.5">
                      <span
                        className={`px-2 py-0.5 rounded font-bold ${
                          row[1] ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {row[1] ? "Bật" : "Tắt"}
                      </span>
                    </td>
                    <td className="py-2.5 font-mono text-slate-700">{row[2]} thư</td>
                    <td className="py-2.5 text-slate-700">{row[3]}</td>
                    <td className="py-2.5 font-mono text-slate-700">{row[4]} MB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-xl shadow-xs"
            onClick={() => showToast("Đã lưu chính sách gửi email ra ngoài")}
          >
            Lưu chính sách Email
          </button>
        </div>
      )}

      {emailSubTab === 1 && (
        <div className="space-y-3">
          <p className="text-xs text-slate-500">
            Admin chỉ xem được siêu dữ liệu. Muốn đọc nội dung chi tiết phải ghi lý do audit log và chờ Admin thứ 2 duyệt.
          </p>
          {[
            { sender: "Võ Hoàng Nam", to: "ketoan@partner.vn", file: "Bảng lương T9.xlsx", reason: "Phát hiện: Số tài khoản, Mức lương" },
            { sender: "Phạm Khánh Vy", to: "ungvien.an@gmail.com", file: "Thư mời phỏng vấn.pdf", reason: "Phát hiện: Số CCCD" },
          ].map((q, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between"
            >
              <div>
                <b className="text-sm font-bold text-slate-900 block">
                  {q.sender} → {q.to}
                </b>
                <span className="text-xs text-slate-500 block">Tệp đính kèm: {q.file}</span>
                <span className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded text-[10px] font-bold mt-1 inline-block">
                  {q.reason}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded shadow-xs"
                  onClick={() => triggerAuditAction(`Yêu cầu xem nội dung thư bị giữ của ${q.sender}`)}
                >
                  Xem nội dung
                </button>
                <button
                  className="px-3 py-1 bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-600 text-xs font-semibold rounded shadow-xs"
                  onClick={() => showToast("Đã duyệt phát thư thành công")}
                >
                  Cho gửi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {emailSubTab === 2 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-slate-900">Danh sách Hộp thư dùng chung (Shared Mailboxes)</h4>
            <button
              className="px-3 py-1 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded shadow-xs"
              onClick={() => showToast("Đã tạo hộp thư dùng chung mới")}
            >
              + Tạo hộp thư
            </button>
          </div>
          {[
            { addr: "tuyendung@ohriise.vn", access: "HR Tuyển dụng", ai: 1 },
            { addr: "hr@ohriise.vn", access: "HR Tổng, HR Chi nhánh", ai: 0 },
            { addr: "ketoan@ohriise.vn", access: "HR C&B", ai: 0 },
          ].map((sm, idx) => (
            <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
              <div>
                <b className="text-slate-900 font-bold block">{sm.addr}</b>
                <span className="text-slate-500">Quyền truy cập: {sm.access}</span>
              </div>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 font-semibold rounded">
                {sm.ai ? "AI CV Auto-forward: Bật" : "AI CV Auto-forward: Tắt"}
              </span>
            </div>
          ))}
        </div>
      )}

      {emailSubTab === 3 && (
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-900">Độ tin cậy tên miền ohriise.vn</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
              <span className="text-xs text-slate-500 block">Bản ghi SPF</span>
              <b className="text-emerald-700 font-bold">Hợp lệ</b>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
              <span className="text-xs text-slate-500 block">Bản ghi DKIM</span>
              <b className="text-emerald-700 font-bold">Hợp lệ (2048-bit)</b>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
              <span className="text-xs text-slate-500 block">Bản ghi DMARC</span>
              <b className="text-amber-700 font-bold">p=none (Nên nâng)</b>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
              <span className="text-xs text-slate-500 block">Gmail API Sync</span>
              <b className="text-emerald-700 font-bold">Đã kết nối</b>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
