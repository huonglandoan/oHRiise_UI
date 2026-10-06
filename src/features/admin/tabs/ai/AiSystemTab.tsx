import React, { useState } from "react";

interface AiSystemTabProps {
  switches: Record<string, boolean>;
  toggleSwitch: (key: string) => void;
  showToast: (msg: string) => void;
}

export function AiSystemTab({
  switches,
  toggleSwitch,
  showToast,
}: AiSystemTabProps) {
  const [cvWeights, setCvWeights] = useState({ wk: 45, we: 30, wd: 15, wl: 10 });
  const [cvMatchScoreThreshold, setCvMatchScoreThreshold] = useState(70);
  const [aiTestResult, setAiTestResult] = useState<string | null>(null);

  const totalCvWeight = cvWeights.wk + cvWeights.we + cvWeights.wd + cvWeights.wl;

  const runCvMatchingTest = () => {
    setAiTestResult("loading");
    setTimeout(() => {
      setAiTestResult("done");
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CV-JD Matching Settings */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              AI CV–JD Matching Engine
            </h3>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
              v2.3 Active
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span>Trọng số Kỹ năng chuyên môn:</span>
                <b>{cvWeights.wk}%</b>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={cvWeights.wk}
                className="w-full accent-blue-600"
                onChange={(e) => setCvWeights({ ...cvWeights, wk: +e.target.value })}
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Trọng số Kinh nghiệm thực tế:</span>
                <b>{cvWeights.we}%</b>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={cvWeights.we}
                className="w-full accent-blue-600"
                onChange={(e) => setCvWeights({ ...cvWeights, we: +e.target.value })}
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Trọng số Học vấn & Chứng chỉ:</span>
                <b>{cvWeights.wd}%</b>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={cvWeights.wd}
                className="w-full accent-blue-600"
                onChange={(e) => setCvWeights({ ...cvWeights, wd: +e.target.value })}
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Trọng số Ngoại ngữ:</span>
                <b>{cvWeights.wl}%</b>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={cvWeights.wl}
                className="w-full accent-blue-600"
                onChange={(e) => setCvWeights({ ...cvWeights, wl: +e.target.value })}
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <span
                className={`px-3 py-1 rounded-full font-bold ${
                  totalCvWeight === 100
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                Tổng trọng số: {totalCvWeight}% {totalCvWeight !== 100 && "(Cần đúng 100%)"}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex justify-between text-xs mb-1">
              <span>Ngưỡng điểm Đạt yêu cầu phỏng vấn:</span>
              <b>{cvMatchScoreThreshold} điểm</b>
            </div>
            <input
              type="range"
              min="40"
              max="95"
              value={cvMatchScoreThreshold}
              className="w-full accent-blue-600"
              onChange={(e) => setCvMatchScoreThreshold(+e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              className="flex-1 py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-xl shadow-xs"
              onClick={runCvMatchingTest}
            >
              Chạy thử với CV mẫu
            </button>
            <button
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-xl shadow-xs"
              onClick={() => showToast("Đã lưu cấu hình AI CV-JD Matching")}
            >
              Lưu
            </button>
          </div>

          {/* Test Execution Output */}
          {aiTestResult === "loading" && (
            <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500 text-center">
              Đang phân tích CV mẫu qua AI...
            </div>
          )}
          {aiTestResult === "done" && (
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-4 border-emerald-500 text-emerald-700 font-bold flex items-center justify-center text-sm">
                  86
                </div>
                <div>
                  <b className="text-slate-900 block text-sm">
                    Nguyễn Văn An · Backend Engineer
                  </b>
                  <span className="text-slate-500">
                    Chất lượng khớp: Phù hợp cao (86/100)
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {["Java", "Spring Boot", "PostgreSQL", "Docker"].map((sk, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-semibold"
                  >
                    {sk}
                  </span>
                ))}
                <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded text-[10px] font-semibold">
                  Thiếu: Kubernetes
                </span>
              </div>
            </div>
          )}
        </div>

        {/* WFH AI Monitoring */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              AI Phân tích WFH & Screenshot
            </h3>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
              v1.4 Active
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-500 mb-1">
                Số screenshot chụp ngẫu nhiên/ngày WFH: <b>6 lần</b>
              </label>
              <input
                type="range"
                min="3"
                max="12"
                defaultValue="6"
                className="w-full accent-blue-600"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">
                Cảnh báo khi ứng dụng ngoài công việc vượt: <b>25%</b> thời gian
              </label>
              <input
                type="range"
                min="10"
                max="60"
                defaultValue="25"
                className="w-full accent-blue-600"
              />
            </div>
            <div className="flex justify-between items-center pt-1">
              <span>Làm mờ thông tin nhạy cảm (Mật khẩu, Chat cá nhân)</span>
              <button
                className={`w-10 h-5 rounded-full relative transition ${
                  switches.blur ? "bg-emerald-500" : "bg-slate-300"
                }`}
                onClick={() => toggleSwitch("blur")}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition ${
                    switches.blur ? "left-5.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          <button
            className="w-full py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-xl shadow-xs"
            onClick={() => showToast("Đã lưu cấu hình AI WFH Analytics")}
          >
            Lưu cấu hình WFH AI
          </button>
        </div>
      </div>
    </div>
  );
}

export default AiSystemTab;
