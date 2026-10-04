import React, { useState } from "react";
import { PageHeader } from "../components/PageHeader";

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState<"calendar" | "adjust" | "ot" | "history">("calendar");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // State for Adjustment Form
  const [adjDate, setAdjDate] = useState("2026-09-22");
  const [adjType, setAdjType] = useState("Quên Check-out");
  const [adjCheckIn, setAdjCheckIn] = useState("08:30");
  const [adjCheckOut, setAdjCheckOut] = useState("17:30");
  const [adjReason, setAdjReason] = useState("Quên bấm máy chấm công");
  const [adjDetail, setAdjDetail] = useState("");
  const [adjHistory, setAdjHistory] = useState([
    {
      code: "#ADJ-2026-0922",
      type: "Bổ sung giờ Check-out",
      date: "22/09/2026",
      realTime: "Check-out bổ sung: 17:45 PM",
      reason: "Quên bấm máy chấm công khi ra ca",
      status: "Chờ duyệt",
    },
    {
      code: "#EX-2026-0909",
      type: "Giải trình đi muộn",
      date: "09/09/2026",
      realTime: "Check-in: 08:47 AM (Muộn 17 phút)",
      reason: "Sự cố giao thông kẹt xe cầu Sài Gòn",
      status: "Đã chấp nhận",
    },
  ]);

  // State for OT Form
  const [otDate, setOtDate] = useState("2026-09-25");
  const [otType, setOtType] = useState("OT Ngày thường (Hệ số 150%)");
  const [otStart, setOtStart] = useState("18:00");
  const [otEnd, setOtEnd] = useState("20:30");
  const [otProject, setOtProject] = useState("Đốt tiến độ bàn giao Module HRMS v2.0");
  const [otDetail, setOtDetail] = useState("");
  const [otMethod, setOtMethod] = useState("Thanh toán lương tăng ca (Chi trả trong kỳ lương)");
  const [otHistory, setOtHistory] = useState([
    {
      code: "#OT-2026-0925",
      date: "25/09/2026",
      time: "18:00 - 20:30 (2.5 giờ · Hệ số 150%)",
      project: "Đốt tiến độ bàn giao Module HRMS v2.0",
      status: "Chờ duyệt",
    },
  ]);

  // State for History Filters & Data
  const [historyFromDate, setHistoryFromDate] = useState("2026-09-01");
  const [historyToDate, setHistoryToDate] = useState("2026-09-30");
  const [historyTypeFilter, setHistoryTypeFilter] = useState("all");
  const [historyStatusFilter, setHistoryStatusFilter] = useState("all");
  const [historyKeyword, setHistoryKeyword] = useState("");

  const initialRequestsHistory = [
    {
      code: "#OT-2026-0925",
      type: "Đăng ký Tăng ca (OT)",
      submitDate: "24/09/2026 16:30",
      applyDate: "25/09/2026",
      time: "18:00 - 20:30 (2.5 giờ · Hệ số 150%)",
      detail: "Đốt tiến độ bàn giao Module HRMS v2.0",
      status: "Chờ duyệt",
      statusTone: "amber",
    },
    {
      code: "#ADJ-2026-0922",
      type: "Bổ sung giờ Check-out",
      submitDate: "23/09/2026 08:15",
      applyDate: "22/09/2026",
      time: "Check-out bổ sung: 17:45 PM",
      detail: "Quên bấm máy chấm công khi ra ca",
      status: "Chờ duyệt",
      statusTone: "amber",
    },
    {
      code: "#WFH-2026-0918",
      type: "Đăng ký WFH",
      submitDate: "17/09/2026 14:20",
      applyDate: "18/09/2026",
      time: "08:30 - 17:35 (Làm việc tại nhà)",
      detail: "AI camera xác thực 20/20 ảnh làm việc",
      status: "Đã duyệt",
      statusTone: "emerald",
    },
    {
      code: "#EX-2026-0909",
      type: "Giải trình đi muộn",
      submitDate: "09/09/2026 09:10",
      applyDate: "09/09/2026",
      time: "Check-in: 08:47 AM (Muộn 17 phút)",
      detail: "Sự cố giao thông kẹt xe cầu Sài Gòn",
      status: "Đã chấp nhận",
      statusTone: "emerald",
    },
    {
      code: "#LV-2026-0915",
      type: "Đơn xin nghỉ phép",
      submitDate: "12/09/2026 10:00",
      applyDate: "15/09/2026",
      time: "Nghỉ nguyên ngày (Phép năm)",
      detail: "Giải quyết việc cá nhân gia đình",
      status: "Đã duyệt",
      statusTone: "emerald",
    },
  ];

  const filteredRequests = initialRequestsHistory.filter((item) => {
    if (historyTypeFilter !== "all" && item.type !== historyTypeFilter) return false;
    if (historyStatusFilter !== "all" && item.status !== historyStatusFilter) return false;
    if (historyKeyword.trim()) {
      const q = historyKeyword.toLowerCase();
      return (
        item.code.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.detail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSubmitAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = `#ADJ-2026-09${Math.floor(Math.random() * 80 + 10)}`;
    setAdjHistory((prev) => [
      {
        code: newCode,
        type: adjType,
        date: adjDate.split("-").reverse().join("/"),
        realTime: `Check-in: ${adjCheckIn} - Check-out: ${adjCheckOut}`,
        reason: adjReason,
        status: "Chờ duyệt",
      },
      ...prev,
    ]);
    showToast(`Đã nộp đơn bổ sung giờ công (${newCode}) thành công!`);
    setAdjDetail("");
  };

  const handleSubmitOT = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = `#OT-2026-09${Math.floor(Math.random() * 80 + 10)}`;
    setOtHistory((prev) => [
      {
        code: newCode,
        date: otDate.split("-").reverse().join("/"),
        time: `${otStart} - ${otEnd} (2.5 giờ)`,
        project: otProject,
        status: "Chờ duyệt",
      },
      ...prev,
    ]);
    showToast(`Đã nộp đơn đăng ký tăng ca OT (${newCode}) thành công!`);
    setOtDetail("");
  };

  return (
    <div className="page">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl border-l-4 border-emerald-400 shadow-2xl flex items-center gap-2">
          <span className="text-emerald-400">✓</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <PageHeader
        group="CÔNG VIỆC CỦA TÔI"
        title="Chấm công"
        description="Theo dõi thời gian làm việc, bổ sung giờ công và tra cứu lịch sử đơn từ."
        icon="clock"
      />

      {/* Subtab Navigation Buttons */}
      <div className="approval-tabs mb-6">
        <button
          onClick={() => setActiveTab("calendar")}
          className={activeTab === "calendar" ? "active" : ""}
        >
          Lịch chấm công & Lịch biểu
        </button>

        <button
          onClick={() => setActiveTab("adjust")}
          className={activeTab === "adjust" ? "active" : ""}
        >
          Bổ sung giờ công / Đi muộn
        </button>

        <button
          onClick={() => setActiveTab("ot")}
          className={activeTab === "ot" ? "active" : ""}
        >
          Đăng ký Tăng ca (OT)
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={activeTab === "history" ? "active" : ""}
        >
          Lịch sử đơn từ & Yêu cầu
        </button>
      </div>


      {/* =================================================================== */}
      {/* SUBTAB 1: LỊCH CHẤM CÔNG & LỊCH BIỂU                              */}
      {/* =================================================================== */}
      {activeTab === "calendar" && (
        <div className="space-y-6">
          {/* 4 Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-2">
              <span className="text-xs text-slate-400 font-medium">Ngày công tháng 9</span>
              <div className="flex items-baseline gap-1">
                <b className="text-xl font-extrabold text-slate-900">16,5</b>
                <span className="text-xs text-slate-400 font-medium">/ 22 ngày</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full w-[75%]" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-2">
              <span className="text-xs text-slate-400 font-medium">Thời gian trung bình</span>
              <b className="text-xl font-extrabold text-slate-900 block">8h 12m</b>
              <span className="text-[11px] text-emerald-600 font-semibold block">
                +18 phút so với tháng trước
              </span>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-2">
              <span className="text-xs text-slate-400 font-medium">Đi muộn / về sớm</span>
              <b className="text-xl font-extrabold text-slate-900 block">1 lần</b>
              <span className="text-[11px] text-slate-400 block">Đã gửi giải trình</span>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-2">
              <span className="text-xs text-slate-400 font-medium">Ngày WFH</span>
              <b className="text-xl font-extrabold text-slate-900 block">3 ngày</b>
              <span className="text-[11px] text-slate-400 block">Trong hạn mức</span>
            </div>
          </div>

          {/* Calendar Grid Container */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                  LỊCH CHẤM CÔNG
                </span>
                <h3 className="text-base font-bold text-slate-900">Lịch làm việc</h3>
              </div>

              {/* Legend Badges */}
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  Văn phòng
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  WFH
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Nghỉ phép
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  Đi muộn
                </span>
              </div>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between py-1">
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold">
                ‹
              </button>
              <b className="text-sm font-bold text-slate-900">Tháng 9, 2026</b>
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold">
                ›
              </button>
            </div>

            {/* Calendar Table Grid */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-center font-bold">
                    <th className="py-2.5 px-3 border-r border-slate-200">T2</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">T3</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">T4</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">T5</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">T6</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">T7</th>
                    <th className="py-2.5 px-3">CN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {/* Row 1: Days 1-7 */}
                  <tr>
                    {[
                      { d: "1", status: "off", time: "08:32 - 17:41" },
                      { d: "2", status: "off", time: "08:32 - 17:41" },
                      { d: "3", status: "off", time: "08:32 - 17:41" },
                      { d: "4", status: "wfh", text: "WFH" },
                      { d: "5", status: "none" },
                      { d: "6", status: "none" },
                      { d: "7", status: "off", time: "08:32 - 17:41" },
                    ].map((cell, idx) => (
                      <td key={idx} className="p-2 border-r border-slate-200 h-20 align-top hover:bg-slate-50/80 transition">
                        <b className="text-slate-800 font-bold block mb-1">{cell.d}</b>
                        {cell.status === "off" && (
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            <span>{cell.time}</span>
                          </div>
                        )}
                        {cell.status === "wfh" && (
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-teal-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                            <span>{cell.text}</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row 2: Days 8-14 */}
                  <tr>
                    {[
                      { d: "8", status: "off", time: "08:32 - 17:41" },
                      { d: "9", status: "late", time: "08:47 - Muộn" },
                      { d: "10", status: "off", time: "08:32 - 17:41" },
                      { d: "11", status: "wfh", text: "WFH" },
                      { d: "12", status: "none" },
                      { d: "13", status: "none" },
                      { d: "14", status: "off", time: "08:32 - 17:41" },
                    ].map((cell, idx) => (
                      <td key={idx} className="p-2 border-r border-slate-200 h-20 align-top hover:bg-slate-50/80 transition">
                        <b className="text-slate-800 font-bold block mb-1">{cell.d}</b>
                        {cell.status === "off" && (
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            <span>{cell.time}</span>
                          </div>
                        )}
                        {cell.status === "late" && (
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-rose-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                            <span>{cell.time}</span>
                          </div>
                        )}
                        {cell.status === "wfh" && (
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-teal-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                            <span>{cell.text}</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row 3: Days 15-21 */}
                  <tr>
                    {[
                      { d: "15", status: "leave", text: "Nghỉ phép" },
                      { d: "16", status: "off", time: "08:32 - 17:41" },
                      { d: "17", status: "off", time: "08:32 - 17:41" },
                      { d: "18", status: "wfh", text: "WFH" },
                      { d: "19", status: "none" },
                      { d: "20", status: "none" },
                      { d: "21", status: "off", time: "08:32 - 17:41" },
                    ].map((cell, idx) => (
                      <td key={idx} className="p-2 border-r border-slate-200 h-20 align-top hover:bg-slate-50/80 transition">
                        <b className="text-slate-800 font-bold block mb-1">{cell.d}</b>
                        {cell.status === "leave" && (
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>{cell.text}</span>
                          </div>
                        )}
                        {cell.status === "off" && (
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            <span>{cell.time}</span>
                          </div>
                        )}
                        {cell.status === "wfh" && (
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-teal-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                            <span>{cell.text}</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row 4: Days 22-28 */}
                  <tr>
                    {[
                      { d: "22", status: "active", time: "08:32 - 17:41" },
                      { d: "23", status: "off", time: "08:32 - 17:41" },
                      { d: "24", status: "off", time: "08:32 - 17:41" },
                      { d: "25", status: "off", time: "08:32 - 17:41" },
                      { d: "26", status: "none" },
                      { d: "27", status: "none" },
                      { d: "28", status: "off", time: "08:32 - 17:41" },
                    ].map((cell, idx) => (
                      <td
                        key={idx}
                        className={`p-2 border-r border-slate-200 h-20 align-top hover:bg-slate-50/80 transition ${
                          cell.status === "active" ? "bg-blue-50/60 ring-2 ring-blue-500 ring-inset rounded-lg" : ""
                        }`}
                      >
                        <b className="text-slate-800 font-bold block mb-1">{cell.d}</b>
                        {cell.time && (
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            <span>{cell.time}</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row 5: Days 29-30 */}
                  <tr>
                    {[
                      { d: "29", status: "off", time: "08:32 - 17:41" },
                      { d: "30", status: "off", time: "08:32 - 17:41" },
                      { d: "", status: "none" },
                      { d: "", status: "none" },
                      { d: "", status: "none" },
                      { d: "", status: "none" },
                      { d: "", status: "none" },
                    ].map((cell, idx) => (
                      <td key={idx} className="p-2 border-r border-slate-200 h-20 align-top">
                        {cell.d && <b className="text-slate-800 font-bold block mb-1">{cell.d}</b>}
                        {cell.time && (
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            <span>{cell.time}</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SUBTAB 2: BỔ SUNG GIỜ CÔNG / ĐI MUỘN                             */}
      {/* =================================================================== */}
      {activeTab === "adjust" && (
        <div className="space-y-6">
          {/* New Request Form Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                TẠO ĐƠN MỚI
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Bổ sung Giờ công & Giải trình đi muộn / về sớm
              </h3>
            </div>

            <form onSubmit={handleSubmitAdjustment} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Ngày áp dụng *</label>
                  <input
                    type="date"
                    value={adjDate}
                    onChange={(e) => setAdjDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Loại yêu cầu *</label>
                  <select
                    value={adjType}
                    onChange={(e) => setAdjType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    <option>Quên Check-in giờ vào ca</option>
                    <option>Quên Check-out</option>
                    <option>Giải trình đi muộn</option>
                    <option>Giải trình về sớm</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Giờ vào thực tế (Check-in)</label>
                  <input
                    type="text"
                    value={adjCheckIn}
                    onChange={(e) => setAdjCheckIn(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Giờ ra thực tế (Check-out)</label>
                  <input
                    type="text"
                    value={adjCheckOut}
                    onChange={(e) => setAdjCheckOut(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Lý do điều chỉnh *</label>
                <select
                  value={adjReason}
                  onChange={(e) => setAdjReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option>Quên bấm máy chấm công</option>
                  <option>Sự cố giao thông kẹt xe</option>
                  <option>Gặp đối tác / công tác ngoài</option>
                  <option>Sự cố thiết bị chấm công</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Mô tả hoàn cảnh chi tiết</label>
                <textarea
                  rows={3}
                  value={adjDetail}
                  onChange={(e) => setAdjDetail(e.target.value)}
                  placeholder="Ghi rõ chi tiết lý do hoặc hoàn cảnh công tác..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Attachment File Dropzone */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Đính kèm bằng chứng (Vé xe, Hình ảnh, Xác nhận...)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-blue-500 transition cursor-pointer bg-slate-50/50">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-2 font-bold">
                    📄
                  </div>
                  <p className="text-xs text-slate-500">
                    Kéo thả file vào đây hoặc <span className="text-blue-600 font-bold">Chọn tải ảnh lên</span>
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
                >
                  ✓ Nộp đơn bổ sung giờ công
                </button>
              </div>
            </form>
          </div>

          {/* History List Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Lịch sử đơn Bổ sung giờ công & Giải trình ({adjHistory.length})
            </h3>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Mã đơn</th>
                    <th className="py-3 px-4">Loại yêu cầu</th>
                    <th className="py-3 px-4">Ngày áp dụng</th>
                    <th className="py-3 px-4">Giờ thực tế</th>
                    <th className="py-3 px-4">Lý do chi tiết</th>
                    <th className="py-3 px-4">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {adjHistory.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">{item.code}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{item.type}</td>
                      <td className="py-3 px-4 text-slate-600">{item.date}</td>
                      <td className="py-3 px-4 font-mono text-blue-700 font-semibold">{item.realTime}</td>
                      <td className="py-3 px-4 text-slate-600">{item.reason}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            item.status === "Chờ duyệt"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          ● {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SUBTAB 3: ĐĂNG KÝ TĂNG CA (OT)                                     */}
      {/* =================================================================== */}
      {activeTab === "ot" && (
        <div className="space-y-6">
          {/* OT Form Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                ĐĂNG KÝ LÀM THÊM GIỜ
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Đơn đăng ký Tăng ca (Overtime / OT)
              </h3>
            </div>

            <form onSubmit={handleSubmitOT} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Ngày đăng ký tăng ca *</label>
                  <input
                    type="date"
                    value={otDate}
                    onChange={(e) => setOtDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Loại hình tăng ca *</label>
                  <select
                    value={otType}
                    onChange={(e) => setOtType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    <option>OT Ngày thường (Hệ số 150%)</option>
                    <option>OT Cuối tuần (Hệ số 200%)</option>
                    <option>OT Ngày lễ (Hệ số 300%)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Giờ bắt đầu OT *</label>
                  <input
                    type="text"
                    value={otStart}
                    onChange={(e) => setOtStart(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Giờ kết thúc OT *</label>
                  <input
                    type="text"
                    value={otEnd}
                    onChange={(e) => setOtEnd(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    required
                  />
                </div>
              </div>

              {/* OT Auto Calculate Banner */}
              <div className="p-3.5 bg-blue-50/80 border border-blue-100 rounded-xl flex items-center justify-between text-xs text-blue-700">
                <span>Tổng thời gian OT tự động tính toán:</span>
                <b className="text-sm font-extrabold text-blue-700">2,5 giờ OT</b>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Tên dự án / Công việc OT *</label>
                <input
                  type="text"
                  value={otProject}
                  onChange={(e) => setOtProject(e.target.value)}
                  placeholder="Ví dụ: Đốt tiến độ bàn giao Module HRMS v2.0"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Nội dung công việc chi tiết trong ca OT</label>
                <textarea
                  rows={3}
                  value={otDetail}
                  onChange={(e) => setOtDetail(e.target.value)}
                  placeholder="Mô tả cụ thể nhiệm vụ cần hoàn thành trong giờ OT..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Phương thức quy đổi / Chi trả *</label>
                <select
                  value={otMethod}
                  onChange={(e) => setOtMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option>Thanh toán lương tăng ca (Chi trả trong kỳ lương)</option>
                  <option>Quy đổi thành ngày nghỉ bù</option>
                </select>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
                >
                  + Nộp đơn đăng ký OT
                </button>
              </div>
            </form>
          </div>

          {/* OT History Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Lịch sử đăng ký Tăng ca (OT) ({otHistory.length})
            </h3>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Mã đơn</th>
                    <th className="py-3 px-4">Ngày tăng ca</th>
                    <th className="py-3 px-4">Khung giờ OT</th>
                    <th className="py-3 px-4">Nội dung / Dự án</th>
                    <th className="py-3 px-4">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {otHistory.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">{item.code}</td>
                      <td className="py-3 px-4 text-slate-700 font-semibold">{item.date}</td>
                      <td className="py-3 px-4 font-mono text-blue-700 font-semibold">{item.time}</td>
                      <td className="py-3 px-4 text-slate-700">{item.project}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            item.status === "Chờ duyệt"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          ● {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SUBTAB 4: LỊCH SỬ ĐƠN TỪ & YÊU CẦU                                */}
      {/* =================================================================== */}
      {activeTab === "history" && (
        <div className="space-y-6">
          {/* Search Filter Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                BỘ LỌC TRA CỨU DỮ LIỆU
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Tra cứu Lịch sử Đơn từ & Yêu cầu
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Từ ngày</label>
                <input
                  type="date"
                  value={historyFromDate}
                  onChange={(e) => setHistoryFromDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Đến ngày</label>
                <input
                  type="date"
                  value={historyToDate}
                  onChange={(e) => setHistoryToDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Loại đơn từ</label>
                <select
                  value={historyTypeFilter}
                  onChange={(e) => setHistoryTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none"
                >
                  <option value="all">Tất cả các loại đơn</option>
                  <option value="Đăng ký Tăng ca (OT)">Đăng ký Tăng ca (OT)</option>
                  <option value="Bổ sung giờ Check-out">Bổ sung giờ công</option>
                  <option value="Đăng ký WFH">Đăng ký WFH</option>
                  <option value="Giải trình đi muộn">Giải trình đi muộn</option>
                  <option value="Đơn xin nghỉ phép">Đơn xin nghỉ phép</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Trạng thái duyệt</label>
                <select
                  value={historyStatusFilter}
                  onChange={(e) => setHistoryStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="Chờ duyệt">Chờ duyệt</option>
                  <option value="Đã duyệt">Đã duyệt</option>
                  <option value="Đã chấp nhận">Đã chấp nhận</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Tìm theo từ khóa</label>
                <input
                  type="text"
                  placeholder="Mã đơn, lý do..."
                  value={historyKeyword}
                  onChange={(e) => setHistoryKeyword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Results Table Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Kết quả tra cứu ({filteredRequests.length} đơn từ)
              </h3>
              <button
                onClick={() => {
                  setHistoryTypeFilter("all");
                  setHistoryStatusFilter("all");
                  setHistoryKeyword("");
                }}
                className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-semibold rounded-lg shadow-xs transition"
              >
                Đặt lại bộ lọc
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Mã đơn</th>
                    <th className="py-3 px-4">Loại đơn từ</th>
                    <th className="py-3 px-4">Ngày nộp đơn</th>
                    <th className="py-3 px-4">Ngày áp dụng</th>
                    <th className="py-3 px-4">Thời gian / Khung giờ</th>
                    <th className="py-3 px-4">Lý do / Dự án chi tiết</th>
                    <th className="py-3 px-4">Trạng thái</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredRequests.map((req, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">{req.code}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{req.type}</td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{req.submitDate}</td>
                      <td className="py-3 px-4 text-slate-700 font-medium">{req.applyDate}</td>
                      <td className="py-3 px-4 font-mono text-blue-700 font-semibold">{req.time}</td>
                      <td className="py-3 px-4 text-slate-600">{req.detail}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            req.statusTone === "amber"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          ● {req.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => showToast(`Xem thông tin chi tiết đơn ${req.code}`)}
                          className="px-3 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg shadow-xs transition"
                        >
                          Xem
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
