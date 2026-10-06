import React from "react";

interface SystemConfigTabProps {
  switches: Record<string, boolean>;
  toggleSwitch: (key: string) => void;
  showToast: (msg: string) => void;
}

export function SystemConfigTab({
  switches,
  toggleSwitch,
  showToast,
}: SystemConfigTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Timekeeping Hardware */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Thiết bị chấm công phần cứng</h3>
        <div className="space-y-3">
          {[
            { name: "Kiosk QR động – HCM-Q1", key: "d1", sub: "Online · Làm mới 20s" },
            { name: "Máy vân tay – HCM-TD", key: "d2", sub: "Online · 64 mẫu vân tay" },
            { name: "Camera AI FaceID – HN-CG", key: "d3", sub: "Offline từ 07:15 sáng nay" },
          ].map((dev, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between"
            >
              <div>
                <b className="text-sm font-bold text-slate-900 block">{dev.name}</b>
                <span className="text-xs text-slate-500">{dev.sub}</span>
              </div>
              <button
                className={`w-10 h-5 rounded-full relative transition ${
                  switches[dev.key] ? "bg-emerald-500" : "bg-slate-300"
                }`}
                onClick={() => toggleSwitch(dev.key)}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition ${
                    switches[dev.key] ? "left-5.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">API Endpoint kết nối thiết bị</label>
            <input
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-900 font-mono"
              defaultValue="https://api.ohriise.vn/v1/devices/sync"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">API Live Key</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-900 font-mono"
              defaultValue="sk_live_4f9a8c2199b4"
            />
          </div>
        </div>

        <button
          className="w-full py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-xl transition shadow-xs"
          onClick={() => showToast("Kết nối thiết bị thành công (3/4 thiết bị online)")}
        >
          Kiểm tra kết nối thiết bị Realtime
        </button>
      </div>

      {/* SMTP & Push Notifications */}
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
          <h3 className="text-base font-bold text-slate-900">Máy chủ gửi Email (SMTP)</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs text-slate-500 mb-1">Máy chủ</label>
              <input
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white text-slate-900 font-mono"
                defaultValue="smtp.ohriise.vn"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Cổng Port</label>
              <input
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white text-slate-900 font-mono"
                defaultValue="587"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Tài khoản gửi</label>
            <input
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white text-slate-900 font-mono"
              defaultValue="no-reply@ohriise.vn"
            />
          </div>
          <div className="flex justify-between items-center text-xs pt-1">
            <span className="text-slate-700">Bật mã hóa TLS</span>
            <button
              className={`w-10 h-5 rounded-full relative transition ${
                switches.smtpTls ? "bg-emerald-500" : "bg-slate-300"
              }`}
              onClick={() => toggleSwitch("smtpTls")}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition ${
                  switches.smtpTls ? "left-5.5" : "left-0.5"
                }`}
              />
            </button>
          </div>
          <button
            className="w-full py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-xl shadow-xs"
            onClick={() => showToast("Đã gửi email thử thành công")}
          >
            Gửi email kiểm tra (Test Email)
          </button>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
          <h3 className="text-base font-bold text-slate-900">Push Notification (FCM Firebase)</h3>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700">Bật thông báo đẩy cho ứng dụng Mobile</span>
            <button
              className={`w-10 h-5 rounded-full relative transition ${
                switches.fcm ? "bg-emerald-500" : "bg-slate-300"
              }`}
              onClick={() => toggleSwitch("fcm")}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition ${
                  switches.fcm ? "left-5.5" : "left-0.5"
                }`}
              />
            </button>
          </div>
          <button
            className="w-full py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-xl shadow-xs"
            onClick={() => showToast("Đã gửi Push thử nghiệm tới 3 thiết bị")}
          >
            Gửi Push thử nghiệm
          </button>
        </div>
      </div>
    </div>
  );
}
