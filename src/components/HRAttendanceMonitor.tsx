import React, { useState, useMemo } from "react";

// --- Icons Component ---
export type MonitorIconName =
  | "userCheck"
  | "clockAlert"
  | "userX"
  | "laptop"
  | "calendarOff"
  | "search"
  | "refresh"
  | "download"
  | "mapPin"
  | "wifi"
  | "checkCircle"
  | "alertTriangle"
  | "xCircle"
  | "clock"
  | "filter"
  | "fileEdit"
  | "history"
  | "chevronDown"
  | "shieldCheck"
  | "building"
  | "users"
  | "bell"
  | "close"
  | "info"
  | "sparkles"
  | "calendar";

export function MonitorIcon({ name, size = 18, className = "" }: { name: MonitorIconName; size?: number; className?: string }) {
  const iconMap: Record<MonitorIconName, React.ReactNode> = {
    userCheck: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </>
    ),
    clockAlert: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="15" x2="12.01" y2="15" />
      </>
    ),
    userX: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="17" y1="8" x2="22" y2="13" />
        <line x1="22" y1="8" x2="17" y2="13" />
      </>
    ),
    laptop: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <line x1="2" y1="20" x2="22" y2="20" />
        <line x1="9" y1="20" x2="15" y2="20" />
      </>
    ),
    calendarOff: (
      <>
        <line x1="2" y1="2" x2="22" y2="22" />
        <path d="M4 4v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.58-.77" />
        <path d="M20 14V6a2 2 0 0 0-2-2H8" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="4" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    ),
    refresh: (
      <>
        <path d="M21.5 2v6h-6" />
        <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      </>
    ),
    download: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    ),
    mapPin: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    wifi: (
      <>
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="2.5" />
      </>
    ),
    checkCircle: (
      <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </>
    ),
    alertTriangle: (
      <>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </>
    ),
    xCircle: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
    filter: (
      <>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </>
    ),
    fileEdit: (
      <>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </>
    ),
    history: (
      <>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <polyline points="12 7 12 12 15 15" />
      </>
    ),
    chevronDown: <polyline points="6 9 12 15 18 9" />,
    shieldCheck: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    building: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
      </>
    ),
    users: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.9" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </>
    ),
    close: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3 1.9 4.1L18 9l-4.1 1.9L12 15l-1.9-4.1L6 9l4.1-1.9L12 3z" />
        <path d="M5 16l1 2.2L8.2 19l-2.2 1L5 22l-1-2.2L1.8 19l2.2-1L5 16z" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {iconMap[name] || iconMap.info}
    </svg>
  );
}

// --- Data Types ---
export type AttendanceStatusType = "on_time" | "late" | "absent" | "wfh" | "leave";
export type WorkFormatType = "office" | "wfh";
export type BranchType = "TPHCM" | "Hà Nội" | "Đà Nẵng";
export type DeptType = "Product" | "Dev" | "QA" | "Helpdesk" | "HR" | "Sales";

export interface AttendanceRecord {
  id: string;
  code: string; // Mã NV (ví dụ: NV-1042)
  name: string; // Tên NV
  email: string;
  avatar: string;
  initials: string;
  roleTitle: string;
  dept: DeptType;
  branch: BranchType;
  officeDetail: string; // ví dụ: Tầng 4 · Tòa W-Tower
  status: AttendanceStatusType;
  statusText: string;
  lateMinutes?: number;
  checkInTime: string; // e.g. "08:24:12 AM" or "Chưa check-in"
  checkOutTime: string; // e.g. "17:32:05 PM" or "Chưa check-out"
  workFormat: WorkFormatType;
  workFormatText: string;
  verificationType: "wifi" | "gps" | "ai_cam" | "none";
  ipAddress: string;
  wifiName?: string;
  gpsCoordinates?: string;
  geofenceRadius?: string; // e.g. "Bán kính 25m"
  isVerified: boolean;
  historyLog: {
    date: string;
    checkIn: string;
    checkOut: string;
    status: AttendanceStatusType;
    statusText: string;
  }[];
}

// --- Initial Mock Data (10 Employees) ---
const INITIAL_RECORDS: AttendanceRecord[] = [
  {
    id: "emp-1",
    code: "NV-1042",
    name: "Nguyễn Văn An",
    email: "an.nguyen@ohriise.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    initials: "AN",
    roleTitle: "Senior Frontend Engineer",
    dept: "Dev",
    branch: "TPHCM",
    officeDetail: "Tầng 4 · LandMark 81",
    status: "on_time",
    statusText: "Đúng giờ",
    checkInTime: "08:24:12 AM",
    checkOutTime: "Chưa check-out",
    workFormat: "office",
    workFormatText: "Tại văn phòng (VP)",
    verificationType: "wifi",
    wifiName: "oHRiise_Corp_5G",
    ipAddress: "192.168.1.104",
    gpsCoordinates: "10.7769° N, 106.7009° E",
    geofenceRadius: "Bán kính 20m (Hợp lệ)",
    isVerified: true,
    historyLog: [
      { date: "28/09", checkIn: "08:26 AM", checkOut: "17:35 PM", status: "on_time", statusText: "Đúng giờ" },
      { date: "27/09", checkIn: "08:22 AM", checkOut: "17:40 PM", status: "on_time", statusText: "Đúng giờ" },
      { date: "26/09", checkIn: "08:29 AM", checkOut: "17:30 PM", status: "on_time", statusText: "Đúng giờ" },
    ],
  },
  {
    id: "emp-2",
    code: "NV-1088",
    name: "Trần Thị Thu Thảo",
    email: "thao.tran@ohriise.com",
    avatar: "",
    initials: "TT",
    roleTitle: "UI/UX Product Designer",
    dept: "Product",
    branch: "TPHCM",
    officeDetail: "Tầng 4 · LandMark 81",
    status: "late",
    statusText: "Đi trễ 18 phút",
    lateMinutes: 18,
    checkInTime: "08:48:05 AM",
    checkOutTime: "Chưa check-out",
    workFormat: "office",
    workFormatText: "Tại văn phòng (VP)",
    verificationType: "wifi",
    wifiName: "oHRiise_Corp_Guest",
    ipAddress: "192.168.1.188",
    gpsCoordinates: "10.7772° N, 106.7011° E",
    geofenceRadius: "Bán kính 45m (Chấp nhận)",
    isVerified: true,
    historyLog: [
      { date: "28/09", checkIn: "08:45 AM", checkOut: "17:45 PM", status: "late", statusText: "Đi trễ 15p" },
      { date: "27/09", checkIn: "08:20 AM", checkOut: "17:35 PM", status: "on_time", statusText: "Đúng giờ" },
      { date: "26/09", checkIn: "08:24 AM", checkOut: "17:30 PM", status: "on_time", statusText: "Đúng giờ" },
    ],
  },
  {
    id: "emp-3",
    code: "NV-1105",
    name: "Lê Hoàng Nam",
    email: "nam.le@ohriise.com",
    avatar: "",
    initials: "HN",
    roleTitle: "Automation QA Lead",
    dept: "QA",
    branch: "Hà Nội",
    officeDetail: "Tầng 12 · Handico Tower",
    status: "absent",
    statusText: "Chưa Check-in (>09:30)",
    checkInTime: "Chưa check-in",
    checkOutTime: "Chưa check-out",
    workFormat: "office",
    workFormatText: "Tại văn phòng (VP)",
    verificationType: "none",
    ipAddress: "N/A",
    gpsCoordinates: "Chưa định vị",
    geofenceRadius: "N/A",
    isVerified: false,
    historyLog: [
      { date: "28/09", checkIn: "08:29 AM", checkOut: "17:30 PM", status: "on_time", statusText: "Đúng giờ" },
      { date: "27/09", checkIn: "08:31 AM", checkOut: "17:40 PM", status: "late", statusText: "Trễ 1 phút" },
    ],
  },
  {
    id: "emp-4",
    code: "NV-1092",
    name: "Phạm Quỳnh Anh",
    email: "anh.pham@ohriise.com",
    avatar: "",
    initials: "QA",
    roleTitle: "HR Business Partner",
    dept: "HR",
    branch: "TPHCM",
    officeDetail: "Làm việc tại nhà (Remote)",
    status: "wfh",
    statusText: "Đang WFH (Có đơn)",
    checkInTime: "08:30:00 AM",
    checkOutTime: "Chưa check-out",
    workFormat: "wfh",
    workFormatText: "Từ xa (WFH)",
    verificationType: "ai_cam",
    ipAddress: "113.161.42.12 (Home Fiber)",
    gpsCoordinates: "10.7821° N, 106.6981° E",
    geofenceRadius: "AI Cam Verified (20/20 snapshot)",
    isVerified: true,
    historyLog: [
      { date: "28/09", checkIn: "08:30 AM", checkOut: "17:35 PM", status: "wfh", statusText: "WFH Duyệt" },
      { date: "27/09", checkIn: "08:25 AM", checkOut: "17:30 PM", status: "on_time", statusText: "Đúng giờ" },
    ],
  },
  {
    id: "emp-5",
    code: "NV-1150",
    name: "Đặng Quốc Bảo",
    email: "bao.dang@ohriise.com",
    avatar: "",
    initials: "QB",
    roleTitle: "Backend Software Architect",
    dept: "Dev",
    branch: "Đà Nẵng",
    officeDetail: "Tầng 6 · Software Park",
    status: "on_time",
    statusText: "Đúng giờ",
    checkInTime: "08:15:30 AM",
    checkOutTime: "Chưa check-out",
    workFormat: "office",
    workFormatText: "Tại văn phòng (VP)",
    verificationType: "wifi",
    wifiName: "DN_Branch_HighSpeed",
    ipAddress: "192.168.2.55",
    gpsCoordinates: "16.0544° N, 108.2022° E",
    geofenceRadius: "Bán kính 15m (Rất tốt)",
    isVerified: true,
    historyLog: [
      { date: "28/09", checkIn: "08:18 AM", checkOut: "17:30 PM", status: "on_time", statusText: "Đúng giờ" },
      { date: "27/09", checkIn: "08:15 AM", checkOut: "17:35 PM", status: "on_time", statusText: "Đúng giờ" },
    ],
  },
  {
    id: "emp-6",
    code: "NV-1033",
    name: "Vũ Minh Tuấn",
    email: "tuan.vu@ohriise.com",
    avatar: "",
    initials: "MT",
    roleTitle: "IT Helpdesk Specialist",
    dept: "Helpdesk",
    branch: "Hà Nội",
    officeDetail: "Tầng 12 · Handico Tower",
    status: "late",
    statusText: "Đi trễ 25 phút",
    lateMinutes: 25,
    checkInTime: "08:55:10 AM",
    checkOutTime: "Chưa check-out",
    workFormat: "office",
    workFormatText: "Tại văn phòng (VP)",
    verificationType: "wifi",
    wifiName: "HN_Office_Internal",
    ipAddress: "192.168.3.12",
    gpsCoordinates: "21.0285° N, 105.8542° E",
    geofenceRadius: "Bán kính 50m (Chấp nhận)",
    isVerified: true,
    historyLog: [
      { date: "28/09", checkIn: "08:50 AM", checkOut: "17:40 PM", status: "late", statusText: "Đi trễ 20p" },
    ],
  },
  {
    id: "emp-7",
    code: "NV-1201",
    name: "Đỗ Thanh Hà",
    email: "ha.do@ohriise.com",
    avatar: "",
    initials: "TH",
    roleTitle: "Enterprise Account Executive",
    dept: "Sales",
    branch: "TPHCM",
    officeDetail: "Nghỉ phép năm (#LV-2026-0929)",
    status: "leave",
    statusText: "Nghỉ phép năm",
    checkInTime: "Miễn chấm công",
    checkOutTime: "Miễn chấm công",
    workFormat: "wfh",
    workFormatText: "Nghỉ phép",
    verificationType: "none",
    ipAddress: "N/A",
    gpsCoordinates: "N/A",
    geofenceRadius: "Đơn phép đã duyệt",
    isVerified: true,
    historyLog: [
      { date: "28/09", checkIn: "08:25 AM", checkOut: "17:30 PM", status: "on_time", statusText: "Đúng giờ" },
    ],
  },
  {
    id: "emp-8",
    code: "NV-1144",
    name: "Bùi Anh Dũng",
    email: "dung.bui@ohriise.com",
    avatar: "",
    initials: "AD",
    roleTitle: "DevOps Engineer",
    dept: "Dev",
    branch: "TPHCM",
    officeDetail: "Tầng 4 · LandMark 81",
    status: "absent",
    statusText: "Chưa Check-in (>09:30)",
    checkInTime: "Chưa check-in",
    checkOutTime: "Chưa check-out",
    workFormat: "office",
    workFormatText: "Tại văn phòng (VP)",
    verificationType: "none",
    ipAddress: "N/A",
    gpsCoordinates: "Chưa định vị",
    geofenceRadius: "N/A",
    isVerified: false,
    historyLog: [
      { date: "28/09", checkIn: "08:27 AM", checkOut: "17:30 PM", status: "on_time", statusText: "Đúng giờ" },
    ],
  },
  {
    id: "emp-9",
    code: "NV-1168",
    name: "Hoàng Ngọc Mai",
    email: "mai.hoang@ohriise.com",
    avatar: "",
    initials: "NM",
    roleTitle: "Product Owner",
    dept: "Product",
    branch: "TPHCM",
    officeDetail: "Làm việc từ xa (WFH)",
    status: "wfh",
    statusText: "Đang WFH (Có đơn)",
    checkInTime: "08:28:44 AM",
    checkOutTime: "Chưa check-out",
    workFormat: "wfh",
    workFormatText: "Từ xa (WFH)",
    verificationType: "ai_cam",
    ipAddress: "14.232.18.90 (Home IP)",
    gpsCoordinates: "10.7626° N, 106.6602° E",
    geofenceRadius: "AI Cam Verified (18/20 snapshot)",
    isVerified: true,
    historyLog: [
      { date: "28/09", checkIn: "08:28 AM", checkOut: "17:35 PM", status: "wfh", statusText: "WFH Duyệt" },
    ],
  },
  {
    id: "emp-10",
    code: "NV-1077",
    name: "Nguyễn Đức Kiên",
    email: "kien.nguyen@ohriise.com",
    avatar: "",
    initials: "DK",
    roleTitle: "Sales Manager",
    dept: "Sales",
    branch: "Đà Nẵng",
    officeDetail: "Tầng 6 · Software Park",
    status: "on_time",
    statusText: "Đúng giờ (Đã ra ca)",
    checkInTime: "08:22:15 AM",
    checkOutTime: "17:30:10 PM",
    workFormat: "office",
    workFormatText: "Tại văn phòng (VP)",
    verificationType: "gps",
    ipAddress: "192.168.2.10",
    gpsCoordinates: "16.0540° N, 108.2020° E",
    geofenceRadius: "Bán kính 12m (Hợp lệ)",
    isVerified: true,
    historyLog: [
      { date: "28/09", checkIn: "08:22 AM", checkOut: "17:30 PM", status: "on_time", statusText: "Đúng giờ" },
    ],
  },
];

export default function HRAttendanceMonitor() {
  // --- States ---
  const [records, setRecords] = useState<AttendanceRecord[]>(INITIAL_RECORDS);
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [deptFilter, setDeptFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [formatFilter, setFormatFilter] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("2026-09-29");

  // Interactive Modals
  const [adjustmentTarget, setAdjustmentTarget] = useState<AttendanceRecord | null>(null);
  const [historyTarget, setHistoryTarget] = useState<AttendanceRecord | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>("16:31:39");

  // Adjustment Modal Form State
  const [adjustmentType, setAdjustmentType] = useState<string>("checkin_fix");
  const [adjustmentTime, setAdjustmentTime] = useState<string>("08:30");
  const [adjustmentReason, setAdjustmentReason] = useState<string>("Kẹt xe tuyến đường Võ Văn Kiệt / Cầu Sài Gòn");

  // Trigger Toast Notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handle Realtime Refresh Simulation
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      setLastRefreshedTime(timeStr);
      showToast("🔄 Đã đồng bộ dữ liệu chấm công Realtime từ Gateway Wi-Fi & GPS!");
    }, 700);
  };

  // Handle Export CSV/Excel Simulation
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Mã NV,Họ Tên,Phòng Ban,Chi Nhánh,Trạng Thái,Check-in,Check-out,Hình Thức,Wi-Fi/IP,GPS Coordinates\n" +
      records
        .map(
          (r) =>
            `"${r.code}","${r.name}","${r.dept}","${r.branch}","${r.statusText}","${r.checkInTime}","${r.checkOutTime}","${r.workFormatText}","${r.ipAddress}","${r.gpsCoordinates}"`
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Bao_Cao_Cham_Cong_Realtime_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`📥 Đã xuất báo cáo CSV dữ liệu chấm công ngày ${selectedDate} thành công!`);
  };

  // Handle Creating Adjustment Request
  const handleSubmitAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustmentTarget) return;

    // Update target record status to on_time / adjusted
    setRecords((prev) =>
      prev.map((item) => {
        if (item.id === adjustmentTarget.id) {
          return {
            ...item,
            status: "on_time",
            statusText: "Đã điều chỉnh (Đúng giờ)",
            checkInTime: adjustmentTime + ":00 AM",
            isVerified: true,
          };
        }
        return item;
      })
    );

    showToast(`✅ Đã tạo đơn điều chỉnh chấm công giúp nhân viên ${adjustmentTarget.name} (${adjustmentTarget.code})!`);
    setAdjustmentTarget(null);
  };

  // Filtered Records calculation
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      // Search Input (Name, Code, Email)
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchName = r.name.toLowerCase().includes(q);
        const matchCode = r.code.toLowerCase().includes(q);
        const matchEmail = r.email.toLowerCase().includes(q);
        if (!matchName && !matchCode && !matchEmail) return false;
      }
      // Branch Filter
      if (branchFilter !== "all" && r.branch !== branchFilter) return false;

      // Dept Filter
      if (deptFilter !== "all" && r.dept !== deptFilter) return false;

      // Status Filter
      if (statusFilter !== "all") {
        if (statusFilter === "on_time" && r.status !== "on_time") return false;
        if (statusFilter === "late" && r.status !== "late") return false;
        if (statusFilter === "absent" && r.status !== "absent") return false;
        if (statusFilter === "wfh" && r.status !== "wfh") return false;
        if (statusFilter === "leave" && r.status !== "leave") return false;
      }

      // Format Filter
      if (formatFilter !== "all" && r.workFormat !== formatFilter) return false;

      return true;
    });
  }, [records, searchQuery, branchFilter, deptFilter, statusFilter, formatFilter]);

  // Statistics calculation for Top Stats Bar
  const stats = useMemo(() => {
    const total = 150; // Quán số toàn công ty
    const checkedInCount = 142; // Đã Check-in
    const lateCount = records.filter((r) => r.status === "late").length || 8;
    const absentCount = records.filter((r) => r.status === "absent").length || 5;
    const wfhCount = records.filter((r) => r.status === "wfh").length || 25;
    const leaveCount = records.filter((r) => r.status === "leave").length || 3;

    const checkedInPercentage = ((checkedInCount / total) * 100).toFixed(1);

    return {
      total,
      checkedInCount,
      checkedInPercentage,
      lateCount,
      absentCount,
      wfhCount,
      leaveCount,
    };
  }, [records]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* --- PAGE HEADER TITLE BAR --- */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "16px",
          background: "linear-gradient(135deg, #ffffff 0%, #f4f8ff 100%)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "20px 24px",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                color: "var(--brand)",
                background: "var(--brand-light)",
                padding: "3px 10px",
                borderRadius: "20px",
              }}
            >
              Role: HR Attendance Monitor
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#10b981",
                background: "#ecfdf5",
                padding: "3px 10px",
                borderRadius: "20px",
                border: "1px solid #a7f3d0",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.25)",
                }}
              />
              Gateway Realtime Live ({lastRefreshedTime})
            </span>
          </div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "var(--text-1)",
              letterSpacing: "-0.5px",
              margin: 0,
            }}
          >
            Giám Sát Chấm Công Realtime
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-2)", marginTop: "4px" }}>
            Theo dõi quân số đi làm, phát hiện trễ ca & xác thực an ninh GPS / Wi-Fi toàn hệ thống chi nhánh.
          </p>
        </div>

        {/* Quick Summary Pill & Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <div
            style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <MonitorIcon name="users" size={20} className="text-blue-600" />
            <div>
              <span style={{ fontSize: "11px", color: "var(--text-3)", display: "block" }}>Tổng nhân sự hôm nay</span>
              <strong style={{ fontSize: "15px", color: "var(--navy)" }}>150 Nhân viên</strong>
            </div>
          </div>
        </div>
      </div>

      {/* --- 1. TOP STATS BAR - 5 THẺ CHỈ SỐ NHÂN SỰ HÀNG NGÀY (Grid 5 Cột) --- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "14px",
        }}
      >
        {/* Card 1: Đã Check-in */}
        <div
          style={{
            background: "white",
            border: "1px solid #d1fae5",
            borderRadius: "14px",
            padding: "16px 18px",
            boxShadow: "0 2px 10px rgba(16, 185, 129, 0.05)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#047857", textTransform: "uppercase", letterSpacing: "0.5px" }}>Đã Check-in</span>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#065f46", margin: "4px 0 2px" }}>
                {stats.checkedInCount} / {stats.total}
              </div>
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "#ecfdf5",
                color: "#10b981",
                display: "grid",
                placeItems: "center",
              }}
            >
              <MonitorIcon name="userCheck" size={22} />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#047857",
                background: "#d1fae5",
                padding: "2px 8px",
                borderRadius: "12px",
              }}
            >
              {stats.checkedInPercentage}% Đúng giờ & WFH
            </span>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              height: "6px",
              width: "100%",
              backgroundColor: "#e6f4ea",
              borderRadius: "4px",
              marginTop: "12px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${stats.checkedInPercentage}%`,
                background: "linear-gradient(90deg, #10b981, #059669)",
                borderRadius: "4px",
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </div>

        {/* Card 2: Đi trễ */}
        <div
          style={{
            background: "white",
            border: "1px solid #fef3c7",
            borderRadius: "14px",
            padding: "16px 18px",
            boxShadow: "0 2px 10px rgba(245, 158, 11, 0.05)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#b45309", textTransform: "uppercase", letterSpacing: "0.5px" }}>Đi trễ</span>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#92400e", margin: "4px 0 2px" }}>
                {stats.lateCount} <span style={{ fontSize: "13px", fontWeight: 500 }}>nhân viên</span>
              </div>
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "#fffbeb",
                color: "#f59e0b",
                display: "grid",
                placeItems: "center",
              }}
            >
              <MonitorIcon name="clockAlert" size={22} />
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#b45309",
                background: "#fef3c7",
                padding: "3px 8px",
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <MonitorIcon name="alertTriangle" size={12} /> Cảnh báo trễ &gt;15p
            </span>
          </div>
        </div>

        {/* Card 3: Chưa Check-in */}
        <div
          style={{
            background: "white",
            border: "1px solid #fecdd3",
            borderRadius: "14px",
            padding: "16px 18px",
            boxShadow: "0 2px 10px rgba(244, 63, 94, 0.05)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#be123c", textTransform: "uppercase", letterSpacing: "0.5px" }}>Chưa Check-in</span>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#9f1239", margin: "4px 0 2px" }}>
                {stats.absentCount} <span style={{ fontSize: "13px", fontWeight: 500 }}>nhân viên</span>
              </div>
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "#fff1f2",
                color: "#f43f5e",
                display: "grid",
                placeItems: "center",
              }}
            >
              <MonitorIcon name="userX" size={22} />
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#be123c",
                background: "#ffe4e6",
                padding: "3px 8px",
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f43f5e" }} /> Cảnh báo sau 09:30
            </span>
          </div>
        </div>

        {/* Card 4: Đang WFH */}
        <div
          style={{
            background: "white",
            border: "1px solid #ccfbf1",
            borderRadius: "14px",
            padding: "16px 18px",
            boxShadow: "0 2px 10px rgba(20, 184, 166, 0.05)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#0f766e", textTransform: "uppercase", letterSpacing: "0.5px" }}>Đang WFH</span>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#115e59", margin: "4px 0 2px" }}>
                {stats.wfhCount} <span style={{ fontSize: "13px", fontWeight: 500 }}>nhân viên</span>
              </div>
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "#f0fdfa",
                color: "#14b8a6",
                display: "grid",
                placeItems: "center",
              }}
            >
              <MonitorIcon name="laptop" size={22} />
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#0f766e",
                background: "#ccfbf1",
                padding: "3px 8px",
                borderRadius: "12px",
              }}
            >
              Badge Teal Info (Remote)
            </span>
          </div>
        </div>

        {/* Card 5: Nghỉ phép/Vắng */}
        <div
          style={{
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "16px 18px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px" }}>Nghỉ phép / Vắng</span>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#334155", margin: "4px 0 2px" }}>
                {stats.leaveCount} <span style={{ fontSize: "13px", fontWeight: 500 }}>nhân viên</span>
              </div>
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "#f1f5f9",
                color: "#64748b",
                display: "grid",
                placeItems: "center",
              }}
            >
              <MonitorIcon name="calendarOff" size={22} />
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#475569",
                background: "#f1f5f9",
                padding: "3px 8px",
                borderRadius: "12px",
              }}
            >
              Badge Gray (Có phép / Vắng)
            </span>
          </div>
        </div>
      </div>

      {/* --- 2. ADVANCED TOOLBAR FILTER --- */}
      <div
        style={{
          background: "white",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          padding: "16px 20px",
          boxShadow: "var(--shadow-sm)",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MonitorIcon name="filter" size={18} className="text-blue-600" />
            <strong style={{ fontSize: "14px", color: "var(--text-1)" }}>Bộ Lọc Nâng Cao & Thao Tác</strong>
            <span
              style={{
                fontSize: "12px",
                color: "var(--text-3)",
                background: "var(--bg)",
                padding: "2px 8px",
                borderRadius: "12px",
              }}
            >
              Hiển thị: <b>{filteredRecords.length}</b> / {records.length} NV
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={handleExport}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "#ffffff",
                color: "var(--text-1)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <MonitorIcon name="download" size={16} /> 📥 Xuất dữ liệu ngày
            </button>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "10px",
                border: "none",
                background: "var(--brand)",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: isRefreshing ? "wait" : "pointer",
                boxShadow: "0 2px 8px rgba(18, 103, 232, 0.25)",
                transition: "all 0.15s",
              }}
            >
              <MonitorIcon
                name="refresh"
                size={16}
                className={isRefreshing ? "animate-spin" : ""}
              />
              🔄 Làm mới Realtime
            </button>
          </div>
        </div>

        {/* Inputs & Dropdowns Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
          }}
        >
          {/* Ô Search Input */}
          <div
            style={{
              position: "relative",
              gridColumn: "span 2",
              minWidth: "240px",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-3)",
                display: "flex",
              }}
            >
              <MonitorIcon name="search" size={16} />
            </span>
            <input
              type="text"
              placeholder="Tìm nhanh theo Tên NV, Mã NV (NV-xxx), Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                height: "38px",
                paddingLeft: "36px",
                paddingRight: "12px",
                borderRadius: "9px",
                border: "1px solid var(--border)",
                fontSize: "13px",
                outline: "none",
                background: "var(--bg)",
                transition: "border-color 0.15s",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "transparent",
                  color: "var(--text-3)",
                  cursor: "pointer",
                }}
              >
                <MonitorIcon name="close" size={14} />
              </button>
            )}
          </div>

          {/* Dropdown 1: Chi nhánh */}
          <div>
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              style={{
                width: "100%",
                height: "38px",
                padding: "0 10px",
                borderRadius: "9px",
                border: "1px solid var(--border)",
                fontSize: "13px",
                background: "white",
                color: "var(--text-1)",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="all">🏢 Tất cả Chi nhánh</option>
              <option value="TPHCM">TPHCM (LandMark 81)</option>
              <option value="Hà Nội">Hà Nội (Handico Tower)</option>
              <option value="Đà Nẵng">Đà Nẵng (Software Park)</option>
            </select>
          </div>

          {/* Dropdown 2: Chọn Phòng ban */}
          <div>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              style={{
                width: "100%",
                height: "38px",
                padding: "0 10px",
                borderRadius: "9px",
                border: "1px solid var(--border)",
                fontSize: "13px",
                background: "white",
                color: "var(--text-1)",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="all">📁 Chọn Phòng ban (Tất cả)</option>
              <option value="Product">Product</option>
              <option value="Dev">Dev</option>
              <option value="QA">QA</option>
              <option value="Helpdesk">Helpdesk</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          {/* Dropdown 3: Chọn Trạng thái */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: "100%",
                height: "38px",
                padding: "0 10px",
                borderRadius: "9px",
                border: "1px solid var(--border)",
                fontSize: "13px",
                background: "white",
                color: "var(--text-1)",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="all">⚡ Tất cả Trạng thái</option>
              <option value="on_time">🟢 Đúng giờ</option>
              <option value="late">🟡 Đi trễ (&gt;15p)</option>
              <option value="absent">🔴 Chưa Check-in (&gt;09:30)</option>
              <option value="wfh">🔵 Đang WFH</option>
              <option value="leave">⚪ Nghỉ phép</option>
            </select>
          </div>

          {/* Dropdown 4: Chọn Hình thức */}
          <div>
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              style={{
                width: "100%",
                height: "38px",
                padding: "0 10px",
                borderRadius: "9px",
                border: "1px solid var(--border)",
                fontSize: "13px",
                background: "white",
                color: "var(--text-1)",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="all">💻 Tất cả Hình thức</option>
              <option value="office">Tại văn phòng (VP)</option>
              <option value="wfh">Từ xa (WFH)</option>
            </select>
          </div>

          {/* Date Picker quan sát */}
          <div>
            <div style={{ position: "relative" }}>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  width: "100%",
                  height: "38px",
                  padding: "0 10px",
                  borderRadius: "9px",
                  border: "1px solid var(--border)",
                  fontSize: "13px",
                  background: "white",
                  color: "var(--text-1)",
                  outline: "none",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Toast Notification Banner --- */}
      {toastMessage && (
        <div
          style={{
            background: "#1e293b",
            color: "#ffffff",
            padding: "12px 18px",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            animation: "fade-up 0.25s ease",
          }}
        >
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            style={{ border: "none", background: "transparent", color: "#94a3b8", cursor: "pointer" }}
          >
            <MonitorIcon name="close" size={16} />
          </button>
        </div>
      )}

      {/* --- 3. BẢNG DANH SÁCH GIÁM SÁT CHẤM CÔNG REALTIME --- */}
      <div
        style={{
          background: "white",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          boxShadow: "var(--shadow-sm)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f8fafc",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MonitorIcon name="building" size={18} className="text-blue-600" />
            <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "var(--navy)" }}>
              Danh Sách Giám Sát Chấm Công Realtime ({selectedDate})
            </h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "12px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#059669" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} /> Đúng giờ / WFH
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#d97706" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b" }} /> Đi trễ &gt;15p
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#dc2626" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} /> Chưa Check-in (&gt;09:30)
            </span>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#f1f5f9", borderBottom: "1px solid var(--border)", color: "#475569", fontSize: "12px" }}>
                <th style={{ padding: "12px 16px", fontWeight: 700 }}>[Mã NV + Họ Tên]</th>
                <th style={{ padding: "12px 16px", fontWeight: 700 }}>[Phòng ban &amp; Chi nhánh]</th>
                <th style={{ padding: "12px 16px", fontWeight: 700 }}>[Trạng thái Đi làm]</th>
                <th style={{ padding: "12px 16px", fontWeight: 700 }}>[Giờ Check-in Realtime]</th>
                <th style={{ padding: "12px 16px", fontWeight: 700 }}>[Giờ Check-out Realtime]</th>
                <th style={{ padding: "12px 16px", fontWeight: 700 }}>[Hình thức]</th>
                <th style={{ padding: "12px 16px", fontWeight: 700 }}>[Xác thực An ninh]</th>
                <th style={{ padding: "12px 16px", fontWeight: 700, textAlign: "right" }}>[Thao tác (Actions)]</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: "30px", textAlign: "center", color: "var(--text-3)" }}>
                    Không tìm thấy nhân viên nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => {
                  // ROW HIGHLIGHTING LOGIC:
                  // 1. Dòng NV "Đi trễ": Nền vàng nhẹ (bg-amber-50/50) + Viền trái vàng
                  // 2. Dòng NV "Chưa check-in" sau 09:30: Nền đỏ nhẹ (bg-rose-50/50) + Viền trái đỏ
                  const isLate = r.status === "late";
                  const isAbsent = r.status === "absent";
                  const isWfh = r.status === "wfh";

                  let rowBg = "#ffffff";
                  let borderLeftStyle = "4px solid transparent";

                  if (isLate) {
                    rowBg = "rgba(254, 243, 199, 0.45)"; // Amber 50 tint
                    borderLeftStyle = "4px solid #f59e0b"; // Amber warning border
                  } else if (isAbsent) {
                    rowBg = "rgba(255, 228, 230, 0.55)"; // Rose 50 tint
                    borderLeftStyle = "4px solid #f43f5e"; // Rose alert border
                  } else if (isWfh) {
                    rowBg = "rgba(240, 253, 250, 0.40)"; // Teal tint
                    borderLeftStyle = "4px solid #14b8a6";
                  }

                  return (
                    <tr
                      key={r.id}
                      style={{
                        background: rowBg,
                        borderBottom: "1px solid var(--border-soft)",
                        borderLeft: borderLeftStyle,
                        transition: "background 0.15s",
                      }}
                    >
                      {/* [Mã NV + Họ Tên] */}
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          {r.avatar ? (
                            <img
                              src={r.avatar}
                              alt={r.name}
                              style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                background: isAbsent
                                  ? "linear-gradient(135deg, #f43f5e, #e11d48)"
                                  : isLate
                                  ? "linear-gradient(135deg, #f59e0b, #d97706)"
                                  : "linear-gradient(135deg, #1267e8, #13c8c8)",
                                color: "#ffffff",
                                fontSize: "12px",
                                fontWeight: 700,
                                display: "grid",
                                placeItems: "center",
                              }}
                            >
                              {r.initials}
                            </div>
                          )}
                          <div>
                            <div style={{ fontWeight: 700, color: "var(--text-1)", fontSize: "14px" }}>{r.name}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                              <span style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--text-2)", fontWeight: 600 }}>
                                {r.code}
                              </span>
                              <span
                                style={{
                                  fontSize: "10px",
                                  background: "#f1f5f9",
                                  color: "#475569",
                                  padding: "1px 6px",
                                  borderRadius: "4px",
                                }}
                              >
                                {r.roleTitle}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* [Phòng ban & Chi nhánh] */}
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 600, color: "var(--text-1)" }}>{r.dept} Dept</div>
                        <div style={{ fontSize: "11px", color: "var(--text-2)", marginTop: "2px" }}>
                          📍 {r.branch} ({r.officeDetail})
                        </div>
                      </td>

                      {/* [Trạng thái Đi làm] */}
                      <td style={{ padding: "14px 16px" }}>
                        {r.status === "on_time" && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "4px 10px",
                              borderRadius: "20px",
                              background: "#d1fae5",
                              color: "#065f46",
                              fontWeight: 700,
                              fontSize: "12px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            <MonitorIcon name="checkCircle" size={14} /> {r.statusText}
                          </span>
                        )}

                        {r.status === "late" && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "4px 10px",
                              borderRadius: "20px",
                              background: "#fef3c7",
                              color: "#92400e",
                              fontWeight: 700,
                              fontSize: "12px",
                              border: "1px solid #fde68a",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            <MonitorIcon name="clockAlert" size={14} /> {r.statusText}
                          </span>
                        )}

                        {r.status === "absent" && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "4px 10px",
                              borderRadius: "20px",
                              background: "#ffe4e6",
                              color: "#9f1239",
                              fontWeight: 700,
                              fontSize: "12px",
                              border: "1px solid #fecdd3",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            <MonitorIcon name="xCircle" size={14} /> {r.statusText}
                          </span>
                        )}

                        {r.status === "wfh" && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "4px 10px",
                              borderRadius: "20px",
                              background: "#ccfbf1",
                              color: "#115e59",
                              fontWeight: 700,
                              fontSize: "12px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            <MonitorIcon name="laptop" size={14} /> {r.statusText}
                          </span>
                        )}

                        {r.status === "leave" && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "4px 10px",
                              borderRadius: "20px",
                              background: "#f1f5f9",
                              color: "#475569",
                              fontWeight: 700,
                              fontSize: "12px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            <MonitorIcon name="calendarOff" size={14} /> {r.statusText}
                          </span>
                        )}
                      </td>

                      {/* [Giờ Check-in Realtime] */}
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ fontWeight: 700, color: "var(--text-1)", fontFamily: "monospace" }}>
                            {r.checkInTime}
                          </span>
                          {r.isVerified && (
                            <span
                              title="GPS / Wi-Fi Hợp lệ"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                color: "#10b981",
                                background: "#ecfdf5",
                                borderRadius: "50%",
                                padding: "2px",
                              }}
                            >
                              <MonitorIcon name={r.verificationType === "wifi" ? "wifi" : "mapPin"} size={14} />
                            </span>
                          )}
                        </div>
                      </td>

                      {/* [Giờ Check-out Realtime] */}
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            color: r.checkOutTime === "Chưa check-out" ? "var(--text-3)" : "var(--text-1)",
                            fontStyle: r.checkOutTime === "Chưa check-out" ? "italic" : "normal",
                            fontFamily: r.checkOutTime === "Chưa check-out" ? "inherit" : "monospace",
                            fontWeight: r.checkOutTime === "Chưa check-out" ? 400 : 700,
                          }}
                        >
                          {r.checkOutTime}
                        </span>
                      </td>

                      {/* [Hình thức] */}
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            padding: "3px 8px",
                            borderRadius: "6px",
                            background: r.workFormat === "wfh" ? "#e0f2fe" : "#f1f5f9",
                            color: r.workFormat === "wfh" ? "#0369a1" : "#334155",
                          }}
                        >
                          {r.workFormatText}
                        </span>
                      </td>

                      {/* [Xác thực An ninh] */}
                      <td style={{ padding: "14px 16px", maxWidth: "230px" }}>
                        <div style={{ fontSize: "11px" }}>
                          {r.verificationType === "wifi" && (
                            <div>
                              <div style={{ fontWeight: 600, color: "#0284c7", display: "flex", alignItems: "center", gap: "4px" }}>
                                <MonitorIcon name="wifi" size={13} /> IP: {r.ipAddress}
                              </div>
                              <div style={{ color: "var(--text-2)", marginTop: "1px" }}>
                                SSID: {r.wifiName} ({r.geofenceRadius})
                              </div>
                            </div>
                          )}

                          {r.verificationType === "ai_cam" && (
                            <div>
                              <div style={{ fontWeight: 600, color: "#0d9488", display: "flex", alignItems: "center", gap: "4px" }}>
                                <MonitorIcon name="laptop" size={13} /> WFH IP: {r.ipAddress}
                              </div>
                              <div style={{ color: "var(--text-2)", marginTop: "1px" }}>
                                📸 {r.geofenceRadius}
                              </div>
                            </div>
                          )}

                          {r.verificationType === "gps" && (
                            <div>
                              <div style={{ fontWeight: 600, color: "#16a34a", display: "flex", alignItems: "center", gap: "4px" }}>
                                <MonitorIcon name="mapPin" size={13} /> GPS: {r.gpsCoordinates}
                              </div>
                              <div style={{ color: "var(--text-2)", marginTop: "1px" }}>
                                🎯 {r.geofenceRadius}
                              </div>
                            </div>
                          )}

                          {r.verificationType === "none" && (
                            <div style={{ color: "#94a3b8", fontStyle: "italic" }}>Chưa có dữ liệu định vị</div>
                          )}
                        </div>
                      </td>

                      {/* [Thao tác (Actions)] */}
                      <td style={{ padding: "14px 16px", textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                          <button
                            onClick={() => {
                              setAdjustmentTarget(r);
                              setAdjustmentTime(r.status === "late" ? "08:30" : "08:30");
                            }}
                            title="Tạo đơn bổ sung công / giải trình giúp nhân viên"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "5px 10px",
                              borderRadius: "7px",
                              border: "1px solid #bfdbfe",
                              background: "#eff6ff",
                              color: "#1d4ed8",
                              fontSize: "11.5px",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            <MonitorIcon name="fileEdit" size={13} /> Tạo Đơn Giúp
                          </button>

                          <button
                            onClick={() => setHistoryTarget(r)}
                            title="Xem lịch sử & nhật ký an ninh chấm công"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "5px 9px",
                              borderRadius: "7px",
                              border: "1px solid var(--border)",
                              background: "#ffffff",
                              color: "var(--text-1)",
                              fontSize: "11.5px",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            <MonitorIcon name="history" size={13} /> Lịch Sử
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid var(--border)",
            background: "#f8fafc",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "12px",
            color: "var(--text-2)",
          }}
        >
          <span>Hiển thị <b>{filteredRecords.length}</b> kết quả chấm công realtime</span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <MonitorIcon name="shieldCheck" size={14} className="text-emerald-600" /> Hệ thống Gateway Wi-Fi Corp &amp; GPS Geofence 20m Hoạt động 100%
          </span>
        </div>
      </div>

      {/* --- MODAL 1: TẠO ĐƠN ĐIỀU CHỈNH GIÚP NHÂN VIÊN --- */}
      {adjustmentTarget && (
        <div
          className="modal-backdrop"
          onClick={() => setAdjustmentTarget(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.55)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "grid",
            placeItems: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "16px",
              width: "min(520px, 100%)",
              boxShadow: "var(--shadow-xl)",
              overflow: "hidden",
              animation: "modal-up 0.25s ease",
            }}
          >
            <div
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid var(--border)",
                background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--brand)", textTransform: "uppercase" }}>
                  HR Support Action
                </span>
                <h3 style={{ fontSize: "17px", fontWeight: 800, margin: 0, color: "var(--navy)" }}>
                  Tạo Đơn Điều Chỉnh Chấm Công Giúp Nhân Viên
                </h3>
              </div>
              <button
                onClick={() => setAdjustmentTarget(null)}
                style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--text-3)" }}
              >
                <MonitorIcon name="close" size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitAdjustment} style={{ padding: "20px 24px" }}>
              {/* Employee Pre-filled Info Box */}
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--brand)",
                    color: "white",
                    fontWeight: 700,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {adjustmentTarget.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text-1)" }}>
                    {adjustmentTarget.name} ({adjustmentTarget.code})
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-2)" }}>
                    Phòng {adjustmentTarget.dept} · {adjustmentTarget.branch} ({adjustmentTarget.roleTitle})
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-1)", display: "block", marginBottom: "6px" }}>
                    Loại đơn điều chỉnh
                  </label>
                  <select
                    value={adjustmentType}
                    onChange={(e) => setAdjustmentType(e.target.value)}
                    style={{
                      width: "100%",
                      height: "40px",
                      padding: "0 12px",
                      borderRadius: "9px",
                      border: "1px solid var(--border)",
                      fontSize: "13px",
                    }}
                  >
                    <option value="checkin_fix">Bổ sung giờ Check-in (Quên bấm máy / Lỗi Wifi)</option>
                    <option value="late_explain">Giải trình lý do đi muộn (&gt;15 phút)</option>
                    <option value="checkout_fix">Bổ sung giờ Check-out ra ca</option>
                    <option value="wfh_add">Đăng ký WFH đột xuất được duyệt</option>
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-1)", display: "block", marginBottom: "6px" }}>
                      Ngày áp dụng
                    </label>
                    <input
                      type="date"
                      defaultValue={selectedDate}
                      style={{
                        width: "100%",
                        height: "40px",
                        padding: "0 12px",
                        borderRadius: "9px",
                        border: "1px solid var(--border)",
                        fontSize: "13px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-1)", display: "block", marginBottom: "6px" }}>
                      Giờ Check-in thực tế
                    </label>
                    <input
                      type="text"
                      value={adjustmentTime}
                      onChange={(e) => setAdjustmentTime(e.target.value)}
                      placeholder="08:30"
                      style={{
                        width: "100%",
                        height: "40px",
                        padding: "0 12px",
                        borderRadius: "9px",
                        border: "1px solid var(--border)",
                        fontSize: "13px",
                        fontFamily: "monospace",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-1)", display: "block", marginBottom: "6px" }}>
                    Ghi chú / Lý do xác minh từ HR
                  </label>
                  <textarea
                    rows={3}
                    value={adjustmentReason}
                    onChange={(e) => setAdjustmentReason(e.target.value)}
                    placeholder="Nhập lý do chi tiết để chuyển duyệt tự động..."
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "9px",
                      border: "1px solid var(--border)",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "20px",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--border-soft)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setAdjustmentTarget(null)}
                  style={{
                    padding: "9px 16px",
                    borderRadius: "9px",
                    border: "1px solid var(--border)",
                    background: "white",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "9px 20px",
                    borderRadius: "9px",
                    border: "none",
                    background: "var(--brand)",
                    color: "white",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(18, 103, 232, 0.3)",
                  }}
                >
                  Gửi Đơn &amp; Cập Nhật Realtime
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: XEM LỊCH SỬ CHẤM CÔNG & AN NINH NV --- */}
      {historyTarget && (
        <div
          className="modal-backdrop"
          onClick={() => setHistoryTarget(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.55)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "grid",
            placeItems: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "16px",
              width: "min(680px, 100%)",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "var(--shadow-xl)",
              animation: "modal-up 0.25s ease",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid var(--border)",
                background: "linear-gradient(135deg, #062e78 0%, #1267e8 100%)",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#8bea19", textTransform: "uppercase" }}>
                  Security &amp; Attendance Logs
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "2px 0 0" }}>
                  Nhật Ký Chấm Công Chi Tiết &amp; Lịch Sử NV
                </h3>
              </div>
              <button
                onClick={() => setHistoryTarget(null)}
                style={{ border: "none", background: "transparent", cursor: "pointer", color: "white" }}
              >
                <MonitorIcon name="close" size={20} />
              </button>
            </div>

            <div style={{ padding: "24px" }}>
              {/* Employee Hero Card */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  background: "#f8fafc",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #1267e8, #13c8c8)",
                    color: "white",
                    fontWeight: 800,
                    fontSize: "16px",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {historyTarget.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-1)" }}>
                    {historyTarget.name} <span style={{ color: "var(--brand)", fontSize: "13px" }}>({historyTarget.code})</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-2)", marginTop: "2px" }}>
                    {historyTarget.roleTitle} · Phòng {historyTarget.dept} ({historyTarget.branch})
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "4px" }}>
                    📧 {historyTarget.email}
                  </div>
                </div>
              </div>

              {/* Security Audit Details */}
              <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--navy)", marginBottom: "10px" }}>
                🛡️ Thông Tin Xác Thực An Ninh Realtime Hôm Nay
              </h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  background: "#f0f9ff",
                  border: "1px solid #bae6fd",
                  borderRadius: "12px",
                  padding: "14px",
                  fontSize: "12.5px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <span style={{ color: "var(--text-3)", display: "block" }}>Wi-Fi IP / Mạng Corp</span>
                  <strong style={{ color: "var(--text-1)" }}>{historyTarget.ipAddress}</strong>
                  {historyTarget.wifiName && (
                    <div style={{ fontSize: "11px", color: "#0284c7" }}>SSID: {historyTarget.wifiName}</div>
                  )}
                </div>
                <div>
                  <span style={{ color: "var(--text-3)", display: "block" }}>Tọa độ GPS Geofence</span>
                  <strong style={{ color: "var(--text-1)" }}>{historyTarget.gpsCoordinates}</strong>
                  <div style={{ fontSize: "11px", color: "#16a34a" }}>Status: {historyTarget.geofenceRadius}</div>
                </div>
              </div>

              {/* 7-Day History Log Table */}
              <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--navy)", marginBottom: "10px" }}>
                📅 Lịch Sử Chấm Công 7 Ngày Gần Nhất
              </h4>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "#f1f5f9", textAlign: "left", color: "#475569" }}>
                    <th style={{ padding: "8px 12px" }}>Ngày</th>
                    <th style={{ padding: "8px 12px" }}>Giờ Check-in</th>
                    <th style={{ padding: "8px 12px" }}>Giờ Check-out</th>
                    <th style={{ padding: "8px 12px" }}>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {historyTarget.historyLog.map((log, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid var(--border-soft)" }}>
                      <td style={{ padding: "10px 12px", fontWeight: 600 }}>{log.date}/2026</td>
                      <td style={{ padding: "10px 12px", fontFamily: "monospace" }}>{log.checkIn}</td>
                      <td style={{ padding: "10px 12px", fontFamily: "monospace" }}>{log.checkOut}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontSize: "11px",
                            fontWeight: 700,
                            background:
                              log.status === "on_time"
                                ? "#d1fae5"
                                : log.status === "late"
                                ? "#fef3c7"
                                : "#e0f2fe",
                            color:
                              log.status === "on_time"
                                ? "#065f46"
                                : log.status === "late"
                                ? "#92400e"
                                : "#0369a1",
                          }}
                        >
                          {log.statusText}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setHistoryTarget(null)}
                  style={{
                    padding: "9px 20px",
                    borderRadius: "9px",
                    border: "none",
                    background: "var(--brand)",
                    color: "white",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Đóng Chi Tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
