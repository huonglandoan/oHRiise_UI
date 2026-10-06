import React, { useState } from "react";
import { NotificationItem } from "../../types";

interface NotificationsTabProps {
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  switches: Record<string, boolean>;
  toggleSwitch: (key: string) => void;
  openModal: (content: React.ReactNode, wide?: boolean) => void;
  closeModal: () => void;
  showToast: (msg: string) => void;
}

export function NotificationsTab({
  notifications,
  setNotifications,
  switches,
  toggleSwitch,
  openModal,
  closeModal,
  showToast,
}: NotificationsTabProps) {
  const [notifCatFilter, setNotifCatFilter] = useState("");

  const filteredNotifs = notifications.filter(
    (n) => !notifCatFilter || n.cat === notifCatFilter
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Inbox */}
      <div className="lg:col-span-2 bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Hộp thư thông báo Admin</h3>
          <select
            className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-900 outline-none"
            value={notifCatFilter}
            onChange={(e) => setNotifCatFilter(e.target.value)}
          >
            <option value="">Tất cả loại thông báo</option>
            <option value="Bảo mật">Bảo mật</option>
            <option value="Tích hợp">Tích hợp</option>
            <option value="Yêu cầu quyền">Yêu cầu quyền</option>
            <option value="Offboarding">Offboarding</option>
            <option value="Lưu trữ">Lưu trữ</option>
            <option value="AI">AI</option>
          </select>
        </div>

        <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
          {filteredNotifs.map((n, idx) => (
            <div
              key={idx}
              className={`py-3.5 flex items-start gap-3 ${n.processed ? "opacity-50" : ""}`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                  n.type === "e" ? "bg-rose-500" : n.type === "w" ? "bg-amber-500" : "bg-blue-500"
                }`}
              />
              <div className="flex-1 min-w-0">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded mr-2">
                  {n.cat}
                </span>
                <b className="text-sm font-semibold text-slate-900">{n.title}</b>
                <span className="text-xs text-slate-400 block mt-0.5">{n.time}</span>
              </div>
              {n.processed ? (
                <span className="text-xs text-emerald-600 font-semibold">Đã xử lý</span>
              ) : (
                <button
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
                  onClick={() => {
                    setNotifications((prev) =>
                      prev.map((item, i) => (i === idx ? { ...item, processed: 1 } : item))
                    );
                    showToast("Đã đánh dấu xử lý thông báo");
                  }}
                >
                  Đã xử lý
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Email Templates & Quiet Hours */}
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Quy tắc im lặng & Nhắc nhở</h3>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700">Giờ im lặng (22:00 – 06:00, trừ Mức Cao)</span>
            <button
              className={`w-10 h-5 rounded-full relative transition ${
                switches.q1 ? "bg-emerald-500" : "bg-slate-300"
              }`}
              onClick={() => toggleSwitch("q1")}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition ${
                  switches.q1 ? "left-5.5" : "left-0.5"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700">Nhắc lại sau 48 giờ nếu chưa xử lý</span>
            <button
              className={`w-10 h-5 rounded-full relative transition ${
                switches.q2 ? "bg-emerald-500" : "bg-slate-300"
              }`}
              onClick={() => toggleSwitch("q2")}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition ${
                  switches.q2 ? "left-5.5" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900">Mẫu Email hệ thống</h3>
          {["Welcome Email", "Đặt lại mật khẩu", "Duyệt đơn nghỉ phép", "Phiếu lương hàng tháng"].map(
            (mName, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <b className="text-xs font-semibold text-slate-800">{mName}</b>
                <button
                  className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition shadow-xs"
                  onClick={() => {
                    openModal(
                      <div className="space-y-4">
                        <h3 className="text-base font-bold text-slate-900">Chỉnh sửa mẫu: {mName}</h3>
                        <div>
                          <label className="block text-xs text-slate-500 mb-1">Tiêu đề email</label>
                          <input
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900 outline-none"
                            defaultValue={`[oHRiise] ${mName}`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-1">Nội dung HTML</label>
                          <textarea
                            className="w-full h-32 px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono bg-slate-50 text-slate-900 outline-none"
                            defaultValue={`Xin chào {{ten}},\n\nTài khoản của bạn: {{email}}\nMật khẩu tạm thời: {{mat_khau_tam}}\n\nTrân trọng,\nĐội ngũ HR oHRiise.`}
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
                              closeModal();
                              showToast(`Đã lưu template email ${mName}`);
                            }}
                          >
                            Lưu mẫu Email
                          </button>
                        </div>
                      </div>,
                      true
                    );
                  }}
                >
                  Sửa
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
