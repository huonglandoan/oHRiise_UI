import { useState, useMemo } from "react";
import { Icon, Status } from "./App";

// ─── Types ─────────────────────────────────────────────
type AttStatus = "on_time" | "late" | "not_checked_in" | "leave" | "early_leave" | "wfh";
type WorkMode = "office" | "wfh" | "none";
type BranchCode = "HCM" | "HN" | "DN";
type PeriodStatus = "open" | "calculated" | "locked";

interface HREmployee {
  id: string;
  code: string;
  name: string;
  init: string;
  cls: string;
  dept: string;
  branch: BranchCode;
  status: AttStatus;
  checkInTime: string | null;
  mode: WorkMode;
  locationInfo: string;
  note: string;
  // Timesheet metrics
  stdDays: number;
  actualDays: number;
  wfhDays: number;
  lateEarlyCount: number;
  otHours: number;
  paidLeaveDays: number;
  tsStatus: "open" | "locked";
}

interface PayrollPeriod {
  id: string;
  name: string;
  range: string;
  status: PeriodStatus;
  stdDays: number;
}

interface AttendanceHistoryRecord {
  id: string;
  date: string; // YYYY-MM-DD
  dateDisplay: string; // "Thứ Tư, 24/09/2026"
  empCode: string;
  empName: string;
  init: string;
  cls: string;
  dept: string;
  branch: BranchCode;
  checkIn: string;
  checkOut: string;
  workHours: number;
  lateMinutes: number;
  earlyMinutes: number;
  mode: WorkMode;
  device: string;
  wifiIp: string;
  gpsInfo: string;
  status: AttStatus;
  timeline: { time: string; type: "IN" | "OUT"; location: string; method: string }[];
}

// ─── Seed Data ─────────────────────────────────────────
const INIT_EMPLOYEES: HREmployee[] = [
  { id: "e1", code: "NV-0101", name: "Nguyễn Minh Anh", init: "MA", cls: "f3", dept: "Dev", branch: "HCM", status: "on_time", checkInTime: "08:24", mode: "office", locationInfo: "GPS 10m · Wi-Fi Tầng 4", note: "Đã check-in đúng giờ", stdDays: 22, actualDays: 22, wfhDays: 4, lateEarlyCount: 0, otHours: 0, paidLeaveDays: 1, tsStatus: "open" },
  { id: "e2", code: "NV-0102", name: "Trần Bảo Linh",   init: "BL", cls: "f4", dept: "Dev", branch: "HCM", status: "on_time", checkInTime: "08:15", mode: "wfh",    locationInfo: "GPS Remote · WFH App", note: "WFH đã được duyệt", stdDays: 22, actualDays: 22, wfhDays: 8, lateEarlyCount: 0, otHours: 2.5, paidLeaveDays: 0, tsStatus: "open" },
  { id: "e3", code: "NV-0103", name: "Lê Hoàng Khoa",   init: "HK", cls: "f5", dept: "Dev", branch: "HN",  status: "late",    checkInTime: "09:42", mode: "office", locationInfo: "GPS 25m · Wi-Fi Keangnam", note: "Đi trễ 42 phút (Sau 09:30)", stdDays: 22, actualDays: 21, wfhDays: 2, lateEarlyCount: 2, otHours: 3.0, paidLeaveDays: 0, tsStatus: "open" },
  { id: "e4", code: "NV-0104", name: "Phạm Quốc Bảo",   init: "QB", cls: "f2", dept: "Dev", branch: "HCM", status: "not_checked_in", checkInTime: null, mode: "none", locationInfo: "Chưa ghi nhận vị trí", note: "Chưa check-in (Quá 09:30)", stdDays: 22, actualDays: 20, wfhDays: 1, lateEarlyCount: 1, otHours: 0, paidLeaveDays: 0, tsStatus: "open" },
  { id: "e5", code: "NV-0105", name: "Vũ Thị Thu Hà",   init: "TH", cls: "amber", dept: "QA", branch: "HCM", status: "on_time", checkInTime: "08:29", mode: "office", locationInfo: "GPS 8m · Wi-Fi Tầng 4", note: "Check-in đúng giờ", stdDays: 22, actualDays: 22, wfhDays: 3, lateEarlyCount: 0, otHours: 1.5, paidLeaveDays: 0, tsStatus: "open" },
  { id: "e6", code: "NV-0106", name: "Đinh Công Minh",  init: "CM", cls: "cyan", dept: "Dev", branch: "DN",  status: "on_time", checkInTime: "08:02", mode: "office", locationInfo: "GPS 12m · Wi-Fi Đà Nẵng", note: "Check-in sớm", stdDays: 22, actualDays: 22, wfhDays: 0, lateEarlyCount: 0, otHours: 4.0, paidLeaveDays: 0, tsStatus: "open" },
  { id: "e7", code: "NV-0107", name: "Hồ Ngọc Liên",    init: "NL", cls: "lime", dept: "Marketing", branch: "HCM", status: "leave", checkInTime: null, mode: "none", locationInfo: "Nghỉ phép có hưởng lương", note: "Nghỉ phép năm (Đã duyệt)", stdDays: 22, actualDays: 19, wfhDays: 0, lateEarlyCount: 0, otHours: 0, paidLeaveDays: 3, tsStatus: "open" },
  { id: "e8", code: "NV-0108", name: "Phùng Tiến Đạt",  init: "TĐ", cls: "f1", dept: "HR", branch: "HCM", status: "on_time", checkInTime: "08:28", mode: "office", locationInfo: "GPS 5m · Wi-Fi Tầng 4", note: "Check-in đúng giờ", stdDays: 22, actualDays: 22, wfhDays: 2, lateEarlyCount: 0, otHours: 0, paidLeaveDays: 0, tsStatus: "open" },
  { id: "e9", code: "NV-0109", name: "Bùi Thanh Hằng",  init: "TH", cls: "f6", dept: "Sales", branch: "HN",  status: "not_checked_in", checkInTime: null, mode: "none", locationInfo: "Chưa ghi nhận vị trí", note: "Chưa check-in (Quá 09:30)", stdDays: 22, actualDays: 21, wfhDays: 0, lateEarlyCount: 1, otHours: 0, paidLeaveDays: 0, tsStatus: "open" },
];

const PERIODS: PayrollPeriod[] = [
  { id: "p1", name: "Kỳ công Tháng 09/2026 (16/08 - 15/09)", range: "16/08/2026 – 15/09/2026", status: "open", stdDays: 22 },
  { id: "p2", name: "Kỳ công Tháng 08/2026 (16/07 - 15/08)", range: "16/07/2026 – 15/08/2026", status: "locked", stdDays: 22 },
  { id: "p3", name: "Kỳ công Tháng 07/2026 (16/06 - 15/07)", range: "16/06/2026 – 15/07/2026", status: "locked", stdDays: 22 },
];

// Historical Attendance Logs Seed Data
const PAST_HISTORY_LOGS: AttendanceHistoryRecord[] = [
  {
    id: "h1",
    date: "2026-09-24",
    dateDisplay: "Thứ Tư, 24/09/2026",
    empCode: "NV-0101",
    empName: "Nguyễn Minh Anh",
    init: "MA",
    cls: "f3",
    dept: "Dev",
    branch: "HCM",
    checkIn: "08:22",
    checkOut: "17:45",
    workHours: 8.5,
    lateMinutes: 0,
    earlyMinutes: 0,
    mode: "office",
    device: "Kiosk FaceID Tầng 4",
    wifiIp: "192.168.1.104 (Wi-Fi Tầng 4)",
    gpsInfo: "10.7769° N, 106.7009° E (Hợp lệ - Bán kính 8m)",
    status: "on_time",
    timeline: [
      { time: "08:22", type: "IN", location: "Cổng Kiosk Tầng 4 HCM", method: "FaceID AI Camera" },
      { time: "12:00", type: "OUT", location: "Cổng Kiosk Tầng 4 HCM", method: "Quét thẻ từ" },
      { time: "13:05", type: "IN", location: "Cổng Kiosk Tầng 4 HCM", method: "FaceID AI Camera" },
      { time: "17:45", type: "OUT", location: "Cổng Kiosk Tầng 4 HCM", method: "FaceID AI Camera" },
    ],
  },
  {
    id: "h2",
    date: "2026-09-24",
    dateDisplay: "Thứ Tư, 24/09/2026",
    empCode: "NV-0103",
    empName: "Lê Hoàng Khoa",
    init: "HK",
    cls: "f5",
    dept: "Dev",
    branch: "HN",
    checkIn: "09:25",
    checkOut: "18:10",
    workHours: 7.75,
    lateMinutes: 25,
    earlyMinutes: 0,
    mode: "office",
    device: "Mobile App GPS",
    wifiIp: "118.70.180.12 (Keangnam HN)",
    gpsInfo: "21.0168° N, 105.7839° E (Hợp lệ - Bán kính 15m)",
    status: "late",
    timeline: [
      { time: "09:25", type: "IN", location: "Keangnam Landmark HN", method: "Mobile App GPS & Self Selfie" },
      { time: "18:10", type: "OUT", location: "Keangnam Landmark HN", method: "Mobile App GPS" },
    ],
  },
  {
    id: "h3",
    date: "2026-09-24",
    dateDisplay: "Thứ Tư, 24/09/2026",
    empCode: "NV-0102",
    empName: "Trần Bảo Linh",
    init: "BL",
    cls: "f4",
    dept: "Dev",
    branch: "HCM",
    checkIn: "08:30",
    checkOut: "17:30",
    workHours: 8.0,
    lateMinutes: 0,
    earlyMinutes: 0,
    mode: "wfh",
    device: "Web HRMS Portal",
    wifiIp: "14.225.22.89 (Viettel Home IP)",
    gpsInfo: "Remote Location (Đã duyệt đơn WFH #WFH-9021)",
    status: "wfh",
    timeline: [
      { time: "08:30", type: "IN", location: "Web Portal - WFH Remote", method: "Xác thực OTP & IP Web" },
      { time: "17:30", type: "OUT", location: "Web Portal - WFH Remote", method: "Xác thực Web" },
    ],
  },
  {
    id: "h4",
    date: "2026-09-23",
    dateDisplay: "Thứ Ba, 23/09/2026",
    empCode: "NV-0105",
    empName: "Vũ Thị Thu Hà",
    init: "TH",
    cls: "amber",
    dept: "QA",
    branch: "HCM",
    checkIn: "08:18",
    checkOut: "16:45",
    workHours: 7.5,
    lateMinutes: 0,
    earlyMinutes: 15,
    mode: "office",
    device: "Kiosk FaceID Tầng 4",
    wifiIp: "192.168.1.104 (Wi-Fi Tầng 4)",
    gpsInfo: "10.7769° N, 106.7009° E (Hợp lệ)",
    status: "early_leave",
    timeline: [
      { time: "08:18", type: "IN", location: "Cổng Kiosk Tầng 4 HCM", method: "FaceID AI Camera" },
      { time: "16:45", type: "OUT", location: "Cổng Kiosk Tầng 4 HCM", method: "FaceID AI Camera (Về sớm 15p)" },
    ],
  },
  {
    id: "h5",
    date: "2026-09-23",
    dateDisplay: "Thứ Ba, 23/09/2026",
    empCode: "NV-0104",
    empName: "Phạm Quốc Bảo",
    init: "QB",
    cls: "f2",
    dept: "Dev",
    branch: "HCM",
    checkIn: "08:29",
    checkOut: "17:30",
    workHours: 8.0,
    lateMinutes: 0,
    earlyMinutes: 0,
    mode: "office",
    device: "Kiosk FaceID Tầng 4",
    wifiIp: "192.168.1.104 (Wi-Fi Tầng 4)",
    gpsInfo: "10.7769° N, 106.7009° E (Hợp lệ)",
    status: "on_time",
    timeline: [
      { time: "08:29", type: "IN", location: "Cổng Kiosk Tầng 4 HCM", method: "FaceID AI Camera" },
      { time: "17:30", type: "OUT", location: "Cổng Kiosk Tầng 4 HCM", method: "FaceID AI Camera" },
    ],
  },
  {
    id: "h6",
    date: "2026-09-22",
    dateDisplay: "Thứ Hai, 22/09/2026",
    empCode: "NV-0106",
    empName: "Đinh Công Minh",
    init: "CM",
    cls: "cyan",
    dept: "Dev",
    branch: "DN",
    checkIn: "08:05",
    checkOut: "19:30",
    workHours: 10.5,
    lateMinutes: 0,
    earlyMinutes: 0,
    mode: "office",
    device: "Kiosk FaceID Đà Nẵng",
    wifiIp: "116.108.45.10 (Chi nhánh ĐN)",
    gpsInfo: "16.0544° N, 108.2022° E (Đã ghi nhận 2.0h OT)",
    status: "on_time",
    timeline: [
      { time: "08:05", type: "IN", location: "Chi nhánh Đà Nẵng", method: "FaceID Kiosk" },
      { time: "17:30", type: "OUT", location: "Chi nhánh Đà Nẵng", method: "Xác nhận kết thúc ca chuẩn" },
      { time: "19:30", type: "OUT", location: "Chi nhánh Đà Nẵng", method: "FaceID Check-out OT (2.0h)" },
    ],
  },
];

export default function HrDashboard() {
  // Main Tab Navigation: "realtime" | "history" | "timesheet"
  const [activeTab, setActiveTab] = useState<"realtime" | "history" | "timesheet">("realtime");

  // Realtime Filter States
  const [search, setSearch]             = useState("");
  const [deptFilter, setDeptFilter]     = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modeFilter, setModeFilter]     = useState("all");

  // Past History Filter States
  const [histFromDate, setHistFromDate] = useState("2026-09-01");
  const [histToDate, setHistToDate]     = useState("2026-09-25");
  const [histSearch, setHistSearch]     = useState("");
  const [histDept, setHistDept]         = useState("all");
  const [histBranch, setHistBranch]     = useState("all");
  const [histStatus, setHistStatus]     = useState("all");

  // History Detail Drawer State
  const [selectedHistRecord, setSelectedHistRecord] = useState<AttendanceHistoryRecord | null>(null);

  // Manual Attendance Correction Modal (Dành cho HR điều chỉnh công)
  const [adjustModalRecord, setAdjustModalRecord] = useState<AttendanceHistoryRecord | null>(null);
  const [adjCheckIn, setAdjCheckIn] = useState("");
  const [adjCheckOut, setAdjCheckOut] = useState("");
  const [adjReason, setAdjReason] = useState("");

  // Timesheet Hub States
  const [activePeriodId, setActivePeriodId] = useState("p1");
  const [periods, setPeriods]               = useState<PayrollPeriod[]>(PERIODS);
  const [employees, setEmployees]           = useState<HREmployee[]>(INIT_EMPLOYEES);
  const [historyLogs, setHistoryLogs]       = useState<AttendanceHistoryRecord[]>(PAST_HISTORY_LOGS);

  // Loading & Export States
  const [calcLoading, setCalcLoading]   = useState(false);
  const [exportOpen, setExportOpen]     = useState(false);
  const [newPeriodModal, setNewPeriodModal] = useState(false);
  const [newPeriodName, setNewPeriodName]   = useState("");
  const [newPeriodStart, setNewPeriodStart] = useState("2026-09-16");
  const [newPeriodEnd, setNewPeriodEnd]     = useState("2026-10-15");

  const [toastMsg, setToastMsg] = useState("");
  const toast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  // Filtered Realtime Employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((e) => {
      const matchSearch =
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.code.toLowerCase().includes(search.toLowerCase());
      const matchDept = deptFilter === "all" || e.dept === deptFilter;
      const matchBranch = branchFilter === "all" || e.branch === branchFilter;
      const matchStatus = statusFilter === "all" || e.status === statusFilter;
      const matchMode = modeFilter === "all" || e.mode === modeFilter;
      return matchSearch && matchDept && matchBranch && matchStatus && matchMode;
    });
  }, [employees, search, deptFilter, branchFilter, statusFilter, modeFilter]);

  // Filtered Past History Logs
  const filteredHistoryLogs = useMemo(() => {
    return historyLogs.filter((h) => {
      const matchDate = h.date >= histFromDate && h.date <= histToDate;
      const matchSearch =
        h.empName.toLowerCase().includes(histSearch.toLowerCase()) ||
        h.empCode.toLowerCase().includes(histSearch.toLowerCase());
      const matchDept = histDept === "all" || h.dept === histDept;
      const matchBranch = histBranch === "all" || h.branch === histBranch;
      const matchStatus = histStatus === "all" || h.status === histStatus;
      return matchDate && matchSearch && matchDept && matchBranch && matchStatus;
    });
  }, [historyLogs, histFromDate, histToDate, histSearch, histDept, histBranch, histStatus]);

  // Metric Cards Summary
  const totalCheckedIn = 142;
  const totalEmployees = 150;
  const lateCount = employees.filter((e) => e.status === "late").length + 6;
  const notCheckedInCount = employees.filter((e) => e.status === "not_checked_in").length + 3;
  const wfhCount = 25;
  const leaveCount = 3;

  // Active Period
  const activePeriod = periods.find((p) => p.id === activePeriodId) || periods[0];

  // Auto Calculate Handler
  const handleAutoCalculate = () => {
    setCalcLoading(true);
    setTimeout(() => {
      setCalcLoading(false);
      setPeriods((prev) =>
        prev.map((p) => (p.id === activePeriodId ? { ...p, status: "calculated" } : p))
      );
      toast("⚡ [Auto Calculate] Đã tự động đối soát nhật ký chấm công & tính lại công thực tế!");
    }, 1200);
  };

  // Lock Timesheet Handler
  const handleLockTimesheet = () => {
    setPeriods((prev) =>
      prev.map((p) => (p.id === activePeriodId ? { ...p, status: "locked" } : p))
    );
    setEmployees((prev) => prev.map((e) => ({ ...e, tsStatus: "locked" })));
    toast("🔒 Đã chốt Timesheet! Dữ liệu công đã được khóa cứng để chuyển sang tính lương.");
  };

  // Export Data Handler
  const handleExport = (format: "excel" | "csv") => {
    setExportOpen(false);
    const fileName = format === "excel" ? "Timesheet_Thang09_2026.xlsx" : "Timesheet_Thang09_2026.csv";
    toast(`📥 Đang xuất tập tin dữ liệu ${fileName}...`);
  };

  // Create New Period Handler
  const handleCreatePeriod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPeriodName.trim()) return;
    const newP: PayrollPeriod = {
      id: `p${Date.now()}`,
      name: `${newPeriodName.trim()} (${newPeriodStart.slice(8, 10)}/${newPeriodStart.slice(5, 7)} - ${newPeriodEnd.slice(8, 10)}/${newPeriodEnd.slice(5, 7)})`,
      range: `${newPeriodStart} – ${newPeriodEnd}`,
      status: "open",
      stdDays: 22,
    };
    setPeriods((prev) => [newP, ...prev]);
    setActivePeriodId(newP.id);
    setNewPeriodModal(false);
    setNewPeriodName("");
    toast("✅ Đã khởi tạo Kỳ công mới thành công!");
  };

  // Save Attendance Correction Handler
  const handleSaveCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustModalRecord) return;
    setHistoryLogs((prev) =>
      prev.map((h) =>
        h.id === adjustModalRecord.id
          ? {
              ...h,
              checkIn: adjCheckIn || h.checkIn,
              checkOut: adjCheckOut || h.checkOut,
              status: "on_time",
              lateMinutes: 0,
              earlyMinutes: 0,
              timeline: [
                ...h.timeline,
                {
                  time: "16:55 (Vừa cập nhật)",
                  type: "IN",
                  location: "Hệ thống HRMS",
                  method: `HR Điều chỉnh thủ công: ${adjReason || "Đã bổ sung công đầy đủ"}`,
                },
              ],
            }
          : h
      )
    );
    setAdjustModalRecord(null);
    toast(`✅ Đã cập nhật giờ chấm công thủ công cho nhân viên ${adjustModalRecord.empName}`);
  };

  return (
    <div className="page hr-dash">
      {/* Header */}
      <div className="page-heading">
        <div>
          <p>HR OPERATIONS & ATTENDANCE CONTROL</p>
          <h1>Trung tâm Quản trị Chấm công & Lịch sử Điểm danh</h1>
          <span>Thời gian thực: Thứ Năm, 25/09/2026 · 16:55</span>
        </div>
        {toastMsg && <div className="lead-toast">{toastMsg}</div>}
      </div>

      {/* ─── NAVIGATION TABS FOR HR ──────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-5 border-b border-slate-200 pb-3">
        <button
          type="button"
          className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === "realtime"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
          onClick={() => setActiveTab("realtime")}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          Giám sát Realtime (Hôm nay)
          <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-white/20 font-semibold">
            {totalEmployees} NV
          </span>
        </button>

        <button
          type="button"
          className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === "history"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
          onClick={() => setActiveTab("history")}
        >
          <Icon name="calendar" size={16} />
          Lịch sử Chấm công & Điểm danh Quá khứ
          <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-slate-900/10 font-semibold">
            Tra cứu ngày
          </span>
        </button>

        <button
          type="button"
          className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === "timesheet"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
          onClick={() => setActiveTab("timesheet")}
        >
          <Icon name="shield" size={16} />
          Chốt Timesheet & Kỳ công
          <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-slate-900/10 font-semibold">
            Kỳ T09
          </span>
        </button>
      </div>

      {/* ─── TAB 1: REALTIME MONITORING ─────────────────────────────────── */}
      {activeTab === "realtime" && (
        <>
          {/* Top 5 Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-5">
            <div className="panel bg-emerald-50/60 border-emerald-200 p-4 rounded-xl flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                <Icon name="check" size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Đã check-in
                </span>
                <strong className="text-2xl font-extrabold text-emerald-950 block leading-tight">
                  {totalCheckedIn}/{totalEmployees}
                </strong>
                <small className="text-[10px] text-emerald-600 font-semibold">94.6% Đúng giờ</small>
              </div>
            </div>

            <div className="panel bg-amber-50/60 border-amber-200 p-4 rounded-xl flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                <Icon name="bell" size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                  Đi trễ
                </span>
                <strong className="text-2xl font-extrabold text-amber-950 block leading-tight">
                  {lateCount}
                </strong>
                <small className="text-[10px] text-amber-600 font-semibold">Cần chú ý</small>
              </div>
            </div>

            <div className="panel bg-rose-50/60 border-rose-200 p-4 rounded-xl flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                <Icon name="close" size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block">
                  Chưa check-in
                </span>
                <strong className="text-2xl font-extrabold text-rose-950 block leading-tight">
                  {notCheckedInCount}
                </strong>
                <small className="text-[10px] text-rose-600 font-semibold">Sau 09:30 (Cảnh báo)</small>
              </div>
            </div>

            <div className="panel bg-teal-50/60 border-teal-200 p-4 rounded-xl flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-teal-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                <Icon name="laptop" size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
                  Đang WFH
                </span>
                <strong className="text-2xl font-extrabold text-teal-950 block leading-tight">
                  {wfhCount}
                </strong>
                <small className="text-[10px] text-teal-600 font-semibold">Đã được duyệt</small>
              </div>
            </div>

            <div className="panel bg-slate-100/80 border-slate-200 p-4 rounded-xl flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-slate-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                <Icon name="calendar" size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Nghỉ phép / Vắng
                </span>
                <strong className="text-2xl font-extrabold text-slate-900 block leading-tight">
                  {leaveCount}
                </strong>
                <small className="text-[10px] text-slate-500 font-semibold">Nghỉ có lương</small>
              </div>
            </div>
          </div>

          {/* Realtime Monitoring Table */}
          <section className="panel daily-monitor-panel">
            <div className="panel-title">
              <div>
                <p>GIÁM SÁT THỜI GIAN THỰC (REALTIME MONITORING)</p>
                <h2>Bảng Chấm công Nhân sự Toàn công ty (Hôm nay)</h2>
              </div>
            </div>

            <div className="hr-toolbar">
              <div className="mini-search hr-search">
                <Icon name="search" />
                <input
                  placeholder="Tìm theo Mã NV hoặc Tên nhân viên..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="hr-filter-group">
                <label>Phòng ban:</label>
                <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
                  <option value="all">Tất cả phòng ban</option>
                  <option value="Dev">Dev Team</option>
                  <option value="HR">HR Team</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="QA">QA / QC</option>
                </select>
              </div>

              <div className="hr-filter-group">
                <label>Chi nhánh:</label>
                <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}>
                  <option value="all">Tất cả chi nhánh</option>
                  <option value="HCM">TP.HCM</option>
                  <option value="HN">Hà Nội</option>
                  <option value="DN">Đà Nẵng</option>
                </select>
              </div>

              <div className="hr-filter-group">
                <label>Trạng thái:</label>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">Tất cả trạng thái</option>
                  <option value="on_time">Đúng giờ</option>
                  <option value="late">Đi trễ</option>
                  <option value="not_checked_in">Chưa check-in</option>
                  <option value="leave">Nghỉ phép</option>
                </select>
              </div>

              <div className="hr-filter-group">
                <label>Hình thức:</label>
                <select value={modeFilter} onChange={(e) => setModeFilter(e.target.value)}>
                  <option value="all">Tất cả hình thức</option>
                  <option value="office">Office (VP)</option>
                  <option value="wfh">WFH (Từ xa)</option>
                </select>
              </div>
            </div>

            <div className="hr-table-wrap">
              <div className="hr-tbl-head-full">
                <span>MÃ NV</span>
                <span>HỌ & TÊN</span>
                <span>PHÒNG BAN</span>
                <span>CHI NHÁNH</span>
                <span>TRẠNG THÁI</span>
                <span>GIỜ CHECK-IN</span>
                <span>HÌNH THỨC</span>
                <span>VỊ TRÍ / GPS WI-FI</span>
                <span>GHI CHÚ</span>
              </div>

              {filteredEmployees.length === 0 && (
                <div className="req-empty">
                  <Icon name="search" size={18} /> Không tìm thấy nhân viên khớp với bộ lọc.
                </div>
              )}

              {filteredEmployees.map((emp) => {
                const isLate = emp.status === "late";
                const isAbsentAlert = emp.status === "not_checked_in";

                return (
                  <div
                    key={emp.id}
                    className={`hr-tbl-row-full transition-colors ${
                      isLate ? "bg-amber-50/60 border-l-4 border-l-amber-500" : ""
                    } ${isAbsentAlert ? "bg-rose-50/60 border-l-4 border-l-rose-500" : ""}`}
                  >
                    <div className="emp-code-cell">
                      <b>{emp.code}</b>
                    </div>

                    <div className="req-emp">
                      <span className={`face ${emp.cls}`}>{emp.init}</span>
                      <b>{emp.name}</b>
                    </div>

                    <div className="emp-dept-cell">{emp.dept}</div>

                    <div>
                      <span className="font-semibold text-slate-700 text-xs">{emp.branch}</span>
                    </div>

                    <div>
                      {emp.status === "on_time" && (
                        <Status tone="green">Đúng giờ</Status>
                      )}
                      {emp.status === "late" && (
                        <span className="hr-badge badge-late">
                          <Icon name="bell" size={11} /> Đi trễ
                        </span>
                      )}
                      {emp.status === "not_checked_in" && (
                        <span className="hr-badge badge-absent">
                          <Icon name="close" size={11} /> Chưa check-in
                        </span>
                      )}
                      {emp.status === "leave" && (
                        <Status tone="amber">Nghỉ phép</Status>
                      )}
                    </div>

                    <div className="emp-time-cell">
                      {emp.checkInTime ? (
                        <b className={isLate ? "text-amber-700" : "text-emerald-700"}>
                          {emp.checkInTime}
                        </b>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </div>

                    <div>
                      {emp.mode === "office" && (
                        <span className="mode-badge office">Office</span>
                      )}
                      {emp.mode === "wfh" && (
                        <span className="mode-badge wfh">WFH</span>
                      )}
                      {emp.mode === "none" && <span className="text-slate-400">—</span>}
                    </div>

                    <div className="text-xs text-slate-600 font-medium">
                      {emp.locationInfo}
                    </div>

                    <div className="emp-note-cell">
                      <span className={isLate || isAbsentAlert ? "text-rose-600 font-semibold" : ""}>
                        {emp.note}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* ─── TAB 2: PAST ATTENDANCE HISTORY LOGS ────────────────────────── */}
      {activeTab === "history" && (
        <section className="panel">
          <div className="panel-title flex-wrap gap-3">
            <div>
              <p>HISTORICAL ATTENDANCE LOGS</p>
              <h2>Tra cứu Lịch sử Chấm công & Điểm danh Quá khứ</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="secondary sm-btn"
                onClick={() => {
                  setHistFromDate("2026-09-01");
                  setHistToDate("2026-09-25");
                }}
              >
                Tháng này (T09)
              </button>
              <button
                type="button"
                className="secondary sm-btn"
                onClick={() => {
                  setHistFromDate("2026-08-01");
                  setHistToDate("2026-08-31");
                }}
              >
                Tháng trước (T08)
              </button>
            </div>
          </div>

          {/* Date Range & Search Filter Bar */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 mb-4">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Từ ngày:</label>
              <input
                type="date"
                value={histFromDate}
                onChange={(e) => setHistFromDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Đến ngày:</label>
              <input
                type="date"
                value={histToDate}
                onChange={(e) => setHistToDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-600 block mb-1">Tìm nhân viên:</label>
              <input
                type="text"
                placeholder="Nhập tên hoặc Mã NV..."
                value={histSearch}
                onChange={(e) => setHistSearch(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Phòng ban:</label>
              <select
                value={histDept}
                onChange={(e) => setHistDept(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
              >
                <option value="all">Tất cả phòng</option>
                <option value="Dev">Dev Team</option>
                <option value="HR">HR Team</option>
                <option value="QA">QA / QC</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Trạng thái:</label>
              <select
                value={histStatus}
                onChange={(e) => setHistStatus(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="on_time">Đúng giờ</option>
                <option value="late">Đi trễ</option>
                <option value="early_leave">Về sớm</option>
                <option value="wfh">WFH</option>
              </select>
            </div>
          </div>

          {/* Summary Indicator Strip */}
          <div className="flex items-center justify-between bg-blue-50/70 border border-blue-200 rounded-xl p-3 mb-4 text-xs font-medium text-blue-900">
            <span>
              🔍 Đã tìm thấy <b>{filteredHistoryLogs.length}</b> bản ghi lịch sử chấm công từ ngày{" "}
              <b>{histFromDate}</b> đến <b>{histToDate}</b>.
            </span>
            <span className="text-slate-500">Bấm vào bất kỳ dòng nào để xem Timeline mốc quét công chi tiết</span>
          </div>

          {/* History Logs Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 font-bold text-slate-700 border-b border-slate-200 uppercase tracking-wider">
                  <th className="py-3 px-3">NGÀY VÀO CA</th>
                  <th className="py-3 px-3">MÃ NV</th>
                  <th className="py-3 px-3">NHÂN VIÊN</th>
                  <th className="py-3 px-3">CHECK-IN</th>
                  <th className="py-3 px-3">CHECK-OUT</th>
                  <th className="py-3 px-3">TỔNG GIỜ</th>
                  <th className="py-3 px-3">VI PHẠM</th>
                  <th className="py-3 px-3">HÌNH THỨC & THIẾT BỊ</th>
                  <th className="py-3 px-3">TRẠNG THÁI</th>
                  <th className="py-3 px-3 text-right">THAO TÁC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredHistoryLogs.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-slate-500 font-medium">
                      Không có lịch sử chấm công nào trong khoảng thời gian này.
                    </td>
                  </tr>
                ) : (
                  filteredHistoryLogs.map((h) => (
                    <tr
                      key={h.id}
                      className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedHistRecord(h)}
                    >
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        {h.dateDisplay}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-600">{h.empCode}</td>
                      <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-2">
                        <span className={`face ${h.cls}`}>{h.init}</span>
                        <div>
                          <span>{h.empName}</span>
                          <span className="block text-[10px] text-slate-400 font-normal">
                            {h.dept} · {h.branch}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-extrabold text-emerald-700">{h.checkIn}</td>
                      <td className="py-3 px-3 font-extrabold text-slate-700">{h.checkOut}</td>
                      <td className="py-3 px-3 font-extrabold text-blue-600">{h.workHours}h</td>
                      <td className="py-3 px-3">
                        {h.lateMinutes > 0 && (
                          <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">
                            Trễ {h.lateMinutes}p
                          </span>
                        )}
                        {h.earlyMinutes > 0 && (
                          <span className="text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded">
                            Về sớm {h.earlyMinutes}p
                          </span>
                        )}
                        {h.lateMinutes === 0 && h.earlyMinutes === 0 && (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-medium">
                        <span className="block font-semibold">{h.device}</span>
                        <span className="text-[10px] text-slate-400">{h.wifiIp}</span>
                      </td>
                      <td className="py-3 px-3">
                        {h.status === "on_time" && <Status tone="green">Đúng giờ</Status>}
                        {h.status === "late" && (
                          <span className="hr-badge badge-late">Trễ ca</span>
                        )}
                        {h.status === "early_leave" && (
                          <span className="hr-badge badge-absent">Về sớm</span>
                        )}
                        {h.status === "wfh" && <Status tone="blue">WFH</Status>}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg"
                            title="Xem chi tiết Timeline"
                            onClick={() => setSelectedHistRecord(h)}
                          >
                            <Icon name="search" size={14} />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg"
                            title="HR Điều chỉnh công thủ công"
                            onClick={() => {
                              setAdjustModalRecord(h);
                              setAdjCheckIn(h.checkIn);
                              setAdjCheckOut(h.checkOut);
                            }}
                          >
                            <Icon name="edit" size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ─── TAB 3: PAY PERIOD & TIMESHEET HUB ─────────────────────────── */}
      {activeTab === "timesheet" && (
        <section className="panel timesheet-lock-panel">
          <div className="panel-title">
            <div>
              <p>QUY TRÌNH CHỐT CÔNG THÁNG</p>
              <h2>Khu vực Chốt Timesheet & Kỳ công (Pay Period Hub)</h2>
            </div>
            <button
              type="button"
              className="secondary sm-btn"
              onClick={() => setNewPeriodModal(true)}
            >
              <Icon name="plus" /> Tạo kỳ công mới
            </button>
          </div>

          <div className="ts-control-bar">
            <div className="ts-selector">
              <label className="font-bold text-slate-700">Chọn kỳ công:</label>
              <select
                value={activePeriodId}
                onChange={(e) => setActivePeriodId(e.target.value)}
                className="field-input sm-input font-bold text-blue-600"
              >
                {periods.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {activePeriod.status === "locked" ? (
                <span className="ts-tag tag-locked">🔒 Đã chốt</span>
              ) : (
                <span className="ts-tag tag-open">🟢 Đang mở</span>
              )}
            </div>

            <div className="ts-btn-group">
              <button
                type="button"
                className="secondary calc-btn"
                onClick={handleAutoCalculate}
                disabled={calcLoading || activePeriod.status === "locked"}
              >
                <Icon name="sparkles" />
                {calcLoading ? "Đang tính toán..." : "Tính toán công (Auto Calculate)"}
              </button>

              <button
                type="button"
                className={`primary lock-btn ${
                  activePeriod.status === "locked" ? "disabled-btn" : ""
                }`}
                onClick={handleLockTimesheet}
                disabled={activePeriod.status === "locked"}
              >
                <Icon name="shield" />
                {activePeriod.status === "locked"
                  ? "Timesheet Đã Khóa"
                  : "Chốt Timesheet (Lock)"}
              </button>

              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="secondary sm-btn flex items-center gap-1.5"
                  onClick={() => setExportOpen((v) => !v)}
                >
                  <Icon name="file" /> Xuất dữ liệu (Export) <Icon name="chevron" size={12} />
                </button>

                {exportOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 animate-pop-in">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      onClick={() => handleExport("excel")}
                    >
                      <Icon name="file" /> Xuất file Excel (.xlsx)
                    </button>
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      onClick={() => handleExport("csv")}
                    >
                      <Icon name="receipt" /> Xuất file CSV
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hr-table-wrap mt-3">
            <div className="ts-tbl-head-full">
              <span>MÃ NV</span>
              <span>TÊN NHÂN VIÊN</span>
              <span>CÔNG CHUẨN</span>
              <span>CÔNG THỰC TẾ</span>
              <span>SỐ NGÀY WFH</span>
              <span>LẦN TRỄ / VỀ SỚM</span>
              <span>GIỜ OT</span>
              <span>NGHỈ CÓ LƯƠNG</span>
              <span>TRẠNG THÁI TIMESHEET</span>
            </div>

            {employees.map((emp) => {
              const isLocked = activePeriod.status === "locked" || emp.tsStatus === "locked";
              return (
                <div className="ts-tbl-row-full" key={emp.id}>
                  <div className="emp-code-cell">
                    <b>{emp.code}</b>
                  </div>

                  <div className="req-emp">
                    <span className={`face ${emp.cls}`}>{emp.init}</span>
                    <b>{emp.name}</b>
                  </div>

                  <div>
                    <b className="text-slate-600 font-bold">{emp.stdDays}</b> ngày
                  </div>

                  <div>
                    <b className="ts-days text-blue-600 font-extrabold">{emp.actualDays}</b> ngày
                  </div>

                  <div>
                    <span className="mode-badge wfh">{emp.wfhDays} ngày</span>
                  </div>

                  <div>
                    {emp.lateEarlyCount > 0 ? (
                      <span className="late-badge">{emp.lateEarlyCount} lần</span>
                    ) : (
                      <span className="text-slate-400 font-medium">0 lần</span>
                    )}
                  </div>

                  <div>
                    <b className="text-blue-600 font-extrabold">{emp.otHours}h</b> OT
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700">{emp.paidLeaveDays} ngày</span>
                  </div>

                  <div>
                    {isLocked ? (
                      <span className="ts-status-badge locked">
                        🔒 Đã chốt
                      </span>
                    ) : (
                      <span className="ts-status-badge open">
                        ⏳ Chưa chốt
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── DRAWER: DETAILED HISTORICAL ATTENDANCE TIMELINE ───────────────── */}
      {selectedHistRecord && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end"
          onClick={() => setSelectedHistRecord(null)}
        >
          <div
            className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto animate-slide-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">
                  NHẬT KÝ ĐIỂM DÀNH CHI TIẾT
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {selectedHistRecord.empName}
                </h3>
                <span className="text-xs text-slate-500">
                  {selectedHistRecord.empCode} · {selectedHistRecord.dept} ({selectedHistRecord.dateDisplay})
                </span>
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
                onClick={() => setSelectedHistRecord(null)}
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 my-4">
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-center">
                <span className="text-[10px] text-blue-700 font-bold block uppercase">Check-in</span>
                <strong className="text-lg font-black text-blue-950">{selectedHistRecord.checkIn}</strong>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-600 font-bold block uppercase">Check-out</span>
                <strong className="text-lg font-black text-slate-800">{selectedHistRecord.checkOut}</strong>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-center">
                <span className="text-[10px] text-emerald-700 font-bold block uppercase">Tổng giờ làm</span>
                <strong className="text-lg font-black text-emerald-950">{selectedHistRecord.workHours}h</strong>
              </div>
            </div>

            {/* Security & Verification Details */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs mb-5">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Thiết bị quét:</span>
                <span className="font-bold text-slate-800">{selectedHistRecord.device}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Wi-Fi & IP Public:</span>
                <span className="font-bold text-slate-800">{selectedHistRecord.wifiIp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Định vị GPS:</span>
                <span className="font-semibold text-emerald-700">{selectedHistRecord.gpsInfo}</span>
              </div>
            </div>

            {/* Timeline Events */}
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Mốc Quét Công Trong Ngày (Timeline Logs)
            </h4>

            <div className="space-y-4 relative pl-4 border-l-2 border-blue-200 mb-6">
              {selectedHistRecord.timeline.map((ev, idx) => (
                <div key={idx} className="relative">
                  <span
                    className={`absolute -left-[21px] top-0 w-3 h-3 rounded-full border-2 border-white ${
                      ev.type === "IN" ? "bg-emerald-500" : "bg-blue-500"
                    }`}
                  />
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-extrabold ${
                        ev.type === "IN" ? "text-emerald-700" : "text-blue-700"
                      }`}
                    >
                      [{ev.type}] {ev.time}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{ev.location}</p>
                  <p className="text-[11px] text-slate-500">{ev.method}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="w-full secondary py-2.5 rounded-xl text-xs font-bold"
                onClick={() => {
                  setAdjustModalRecord(selectedHistRecord);
                  setAdjCheckIn(selectedHistRecord.checkIn);
                  setAdjCheckOut(selectedHistRecord.checkOut);
                  setSelectedHistRecord(null);
                }}
              >
                <Icon name="edit" size={14} /> Điều chỉnh giờ công thủ công
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: MANUAL ATTENDANCE CORRECTION ───────────────────────── */}
      {adjustModalRecord && (
        <div className="modal-backdrop" onMouseDown={() => setAdjustModalRecord(null)}>
          <form
            className="modal"
            onMouseDown={(e) => e.stopPropagation()}
            onSubmit={handleSaveCorrection}
          >
            <div className="modal-head">
              <div>
                <span className="qa-icon cyan">
                  <Icon name="edit" />
                </span>
                <div>
                  <p>HR CORRECTION</p>
                  <h2>Điều chỉnh Chấm công Thủ công</h2>
                </div>
              </div>
              <button type="button" onClick={() => setAdjustModalRecord(null)}>
                <Icon name="close" />
              </button>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 mb-3">
              <b>Nhân viên:</b> {adjustModalRecord.empName} ({adjustModalRecord.empCode}) <br />
              <b>Ngày áp dụng:</b> {adjustModalRecord.dateDisplay}
            </div>

            <div className="form-row">
              <label>
                Giờ Check-in mới
                <input
                  type="time"
                  value={adjCheckIn}
                  onChange={(e) => setAdjCheckIn(e.target.value)}
                  className="field-input"
                  required
                />
              </label>

              <label>
                Giờ Check-out mới
                <input
                  type="time"
                  value={adjCheckOut}
                  onChange={(e) => setAdjCheckOut(e.target.value)}
                  className="field-input"
                  required
                />
              </label>
            </div>

            <label style={{ marginTop: 10 }}>
              Lý do HR điều chỉnh công <span className="text-rose-500">*</span>
              <textarea
                placeholder="Nhập lý do điều chỉnh (Vd: Nhân viên gặp lỗi mạng Kiosk / Đã duyệt đơn bổ sung...)"
                value={adjReason}
                onChange={(e) => setAdjReason(e.target.value)}
                required
                className="field-input block-input"
                rows={3}
                style={{ marginTop: 4 }}
              />
            </label>

            <div className="modal-actions" style={{ marginTop: 16 }}>
              <button
                type="button"
                className="secondary"
                onClick={() => setAdjustModalRecord(null)}
              >
                Hủy
              </button>
              <button className="primary" type="submit">
                <Icon name="check" /> Cập nhật dữ liệu
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ─── MODAL: CREATE NEW PAY PERIOD ────────────────────────────────── */}
      {newPeriodModal && (
        <div className="modal-backdrop" onMouseDown={() => setNewPeriodModal(false)}>
          <form
            className="modal"
            onMouseDown={(e) => e.stopPropagation()}
            onSubmit={handleCreatePeriod}
          >
            <div className="modal-head">
              <div>
                <span className="qa-icon cyan">
                  <Icon name="calendar" />
                </span>
                <div>
                  <p>KỲ CÔNG MỚI</p>
                  <h2>Tạo Kỳ công Chốt Timesheet Mới</h2>
                </div>
              </div>
              <button type="button" onClick={() => setNewPeriodModal(false)}>
                <Icon name="close" />
              </button>
            </div>

            <div className="policy-ok">
              <Icon name="shield" />
              <span>
                Kỳ công mới sẽ tổng hợp toàn bộ dữ liệu chấm công, đơn WFH và đơn nghỉ phép đã
                duyệt của nhân viên trong chu kỳ.
              </span>
            </div>

            <label>
              Tên kỳ công <span style={{ color: "#e35f55" }}>*</span>
              <input
                type="text"
                placeholder="Ví dụ: Kỳ công Tháng 10/2026"
                value={newPeriodName}
                onChange={(e) => setNewPeriodName(e.target.value)}
                required
                className="field-input block-input"
                style={{ marginTop: 6 }}
              />
            </label>

            <div className="form-row" style={{ marginTop: 12 }}>
              <label>
                Ngày bắt đầu
                <input
                  type="date"
                  value={newPeriodStart}
                  onChange={(e) => setNewPeriodStart(e.target.value)}
                  className="field-input"
                />
              </label>
              <label>
                Ngày kết thúc
                <input
                  type="date"
                  value={newPeriodEnd}
                  onChange={(e) => setNewPeriodEnd(e.target.value)}
                  className="field-input"
                />
              </label>
            </div>

            <div className="modal-actions" style={{ marginTop: 16 }}>
              <button
                type="button"
                className="secondary"
                onClick={() => setNewPeriodModal(false)}
              >
                Hủy
              </button>
              <button className="primary" type="submit">
                <Icon name="plus" /> Khởi tạo Kỳ công
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
