import React, { useState, useMemo } from "react";

// --- Icons ---
export type ApprovalIconName =
  | "clock"
  | "check"
  | "close"
  | "search"
  | "filter"
  | "fileText"
  | "image"
  | "filePdf"
  | "alertTriangle"
  | "user"
  | "calendar"
  | "mapPin"
  | "wifi"
  | "chevronRight"
  | "info"
  | "shield"
  | "trendingUp"
  | "download"
  | "eye"
  | "messageSquare"
  | "refresh";

export function ApprovalIcon({ name, size = 18, className = "" }: { name: ApprovalIconName; size?: number; className?: string }) {
  const map: Record<ApprovalIconName, React.ReactNode> = {
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
    check: <polyline points="20 6 9 17 4 12" />,
    close: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    ),
    filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />,
    fileText: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </>
    ),
    filePdf: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 13v4M9 15h2a1 1 0 0 0 0-2H9M15 17v-4h2a1.5 1.5 0 0 1 0 3h-2" />
      </>
    ),
    alertTriangle: (
      <>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </>
    ),
    user: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
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
    chevronRight: <polyline points="9 18 15 12 9 6" />,
    info: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </>
    ),
    trendingUp: (
      <>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </>
    ),
    download: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    ),
    eye: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    messageSquare: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    ),
    refresh: (
      <>
        <path d="M23 4v6h-6" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
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
      {map[name] || map.info}
    </svg>
  );
}

// --- Data Models ---
export type ReasonTag =
  | "Quên Check-out"
  | "Lỗi GPS Chi nhánh"
  | "Gặp Khách hàng ngoài"
  | "Sự cố mạng"
  | "Quên bấm máy Check-in";

export interface AdjustmentRequest {
  id: string;
  code: string; // #ADJ-2026-0924
  submittedDate: string; // 24/09/2026 16:45
  employee: {
    code: string; // NV-1042
    name: string;
    avatar: string;
    initials: string;
    dept: string;
    branch: string;
    title: string;
  };
  targetDate: string; // 24/09/2026
  originalTime: {
    checkIn: string; // "--:--" | "08:48"
    checkOut: string; // "--:--"
  };
  proposedTime: {
    checkIn: string; // "08:30"
    checkOut: string; // "17:30"
  };
  reasonTag: ReasonTag;
  reasonDetail: string;
  attachment?: {
    type: "image" | "pdf";
    title: string;
    url: string;
    fileSize: string;
  };
  approvalState: {
    leadStatus: "approved" | "pending" | "rejected";
    leadName: string;
    leadApprovedAt?: string;
    hrStatus: "pending" | "approved" | "rejected";
    hrApprovedAt?: string;
    rejectionReason?: string;
  };
}

// --- Initial Mock Data (12 Requests) ---
const INITIAL_ADJUSTMENTS: AdjustmentRequest[] = [
  {
    id: "adj-1",
    code: "#ADJ-2026-0924",
    submittedDate: "24/09/2026 16:45",
    employee: {
      code: "NV-1042",
      name: "Nguyễn Văn An",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
      initials: "AN",
      dept: "Dev",
      branch: "TPHCM",
      title: "Senior Frontend Engineer",
    },
    targetDate: "24/09/2026",
    originalTime: { checkIn: "08:24", checkOut: "--:--" },
    proposedTime: { checkIn: "08:24", checkOut: "17:35" },
    reasonTag: "Quên Check-out",
    reasonDetail: "Tan ca vội họp online với team onsite nên quên bấm chấm công tại kiosk tầng 4.",
    attachment: {
      type: "image",
      title: "screenshot_slack_standup_1735.png",
      url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
      fileSize: "1.2 MB",
    },
    approvalState: {
      leadStatus: "approved",
      leadName: "Trần Hoàng Nam (Team Lead)",
      leadApprovedAt: "24/09/2026 17:10",
      hrStatus: "pending",
    },
  },
  {
    id: "adj-2",
    code: "#ADJ-2026-0923",
    submittedDate: "23/09/2026 09:15",
    employee: {
      code: "NV-1088",
      name: "Trần Thị Thu Thảo",
      avatar: "",
      initials: "TT",
      dept: "Product",
      branch: "TPHCM",
      title: "UI/UX Designer",
    },
    targetDate: "23/09/2026",
    originalTime: { checkIn: "--:--", checkOut: "--:--" },
    proposedTime: { checkIn: "08:30", checkOut: "17:30" },
    reasonTag: "Lỗi GPS Chi nhánh",
    reasonDetail: "App báo lỗi sai vị trí Geofence (chênh lệch 120m) dù đã kết nối đúng Wi-Fi Corp LandMark 81.",
    attachment: {
      type: "image",
      title: "gps_error_log.jpg",
      url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
      fileSize: "840 KB",
    },
    approvalState: {
      leadStatus: "approved",
      leadName: "Trần Hoàng Nam (Team Lead)",
      leadApprovedAt: "23/09/2026 10:00",
      hrStatus: "pending",
    },
  },
  {
    id: "adj-3",
    code: "#ADJ-2026-0922",
    submittedDate: "22/09/2026 18:20",
    employee: {
      code: "NV-1105",
      name: "Lê Hoàng Nam",
      avatar: "",
      initials: "HN",
      dept: "QA",
      branch: "Hà Nội",
      title: "Automation QA Lead",
    },
    targetDate: "22/09/2026",
    originalTime: { checkIn: "--:--", checkOut: "--:--" },
    proposedTime: { checkIn: "08:15", checkOut: "17:45" },
    reasonTag: "Gặp Khách hàng ngoài",
    reasonDetail: "Trực tiếp onsite tại văn phòng đối tác VNPay để nghiệm thu tích hợp cổng thanh toán.",
    attachment: {
      type: "pdf",
      title: "Bien_Ban_Nghiem_Thu_VNPay.pdf",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      fileSize: "2.4 MB",
    },
    approvalState: {
      leadStatus: "approved",
      leadName: "Nguyễn Minh Tuấn (QA Manager)",
      leadApprovedAt: "22/09/2026 19:00",
      hrStatus: "pending",
    },
  },
  {
    id: "adj-4",
    code: "#ADJ-2026-0921",
    submittedDate: "21/09/2026 14:10",
    employee: {
      code: "NV-1150",
      name: "Đặng Quốc Bảo",
      avatar: "",
      initials: "QB",
      dept: "Dev",
      branch: "Đà Nẵng",
      title: "Backend Architect",
    },
    targetDate: "21/09/2026",
    originalTime: { checkIn: "08:15", checkOut: "--:--" },
    proposedTime: { checkIn: "08:15", checkOut: "18:00" },
    reasonTag: "Quên Check-out",
    reasonDetail: "Ở lại debug sự cố release v2.2 muộn cùng team, quên quét thẻ lúc về.",
    attachment: {
      type: "image",
      title: "release_git_log.png",
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      fileSize: "1.5 MB",
    },
    approvalState: {
      leadStatus: "approved",
      leadName: "Trần Hoàng Nam (Team Lead)",
      leadApprovedAt: "21/09/2026 15:30",
      hrStatus: "pending",
    },
  },
  {
    id: "adj-5",
    code: "#ADJ-2026-0920",
    submittedDate: "20/09/2026 11:05",
    employee: {
      code: "NV-1033",
      name: "Vũ Minh Tuấn",
      avatar: "",
      initials: "MT",
      dept: "Helpdesk",
      branch: "Hà Nội",
      title: "IT Support Specialist",
    },
    targetDate: "20/09/2026",
    originalTime: { checkIn: "--:--", checkOut: "17:30" },
    proposedTime: { checkIn: "08:30", checkOut: "17:30" },
    reasonTag: "Sự cố mạng",
    reasonDetail: "Mất kết nối Internet tòa nhà Handico sáng 20/09 từ 08:00 đến 09:15, máy chấm công offline.",
    attachment: {
      type: "pdf",
      title: "IT_Incident_Report_Network.pdf",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      fileSize: "620 KB",
    },
    approvalState: {
      leadStatus: "approved",
      leadName: "Lê Khánh Linh (HR Ops)",
      leadApprovedAt: "20/09/2026 11:45",
      hrStatus: "pending",
    },
  },
  {
    id: "adj-6",
    code: "#ADJ-2026-0919",
    submittedDate: "19/09/2026 17:30",
    employee: {
      code: "NV-1201",
      name: "Đỗ Thanh Hà",
      avatar: "",
      initials: "TH",
      dept: "Sales",
      branch: "TPHCM",
      title: "Enterprise Account Exec",
    },
    targetDate: "19/09/2026",
    originalTime: { checkIn: "08:20", checkOut: "--:--" },
    proposedTime: { checkIn: "08:20", checkOut: "17:30" },
    reasonTag: "Gặp Khách hàng ngoài",
    reasonDetail: "Đi gặp khách hàng Viettel Solutions buổi chiều từ 14:00 đến hết giờ làm việc.",
    attachment: {
      type: "image",
      title: "meeting_checkin_viettel.jpg",
      url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
      fileSize: "2.1 MB",
    },
    approvalState: {
      leadStatus: "approved",
      leadName: "Nguyễn Đức Kiên (Sales Manager)",
      leadApprovedAt: "19/09/2026 18:00",
      hrStatus: "pending",
    },
  },
  {
    id: "adj-7",
    code: "#ADJ-2026-0918",
    submittedDate: "18/09/2026 09:00",
    employee: {
      code: "NV-1144",
      name: "Bùi Anh Dũng",
      avatar: "",
      initials: "AD",
      dept: "Dev",
      branch: "TPHCM",
      title: "DevOps Engineer",
    },
    targetDate: "17/09/2026",
    originalTime: { checkIn: "--:--", checkOut: "--:--" },
    proposedTime: { checkIn: "08:30", checkOut: "17:30" },
    reasonTag: "Quên bấm máy Check-in",
    reasonDetail: "Vào ca làm việc bình thường nhưng quên quẹt thẻ cửa ra vào.",
    approvalState: {
      leadStatus: "approved",
      leadName: "Trần Hoàng Nam (Team Lead)",
      leadApprovedAt: "18/09/2026 09:30",
      hrStatus: "approved",
      hrApprovedAt: "18/09/2026 14:00",
    },
  },
  {
    id: "adj-8",
    code: "#ADJ-2026-0917",
    submittedDate: "17/09/2026 16:00",
    employee: {
      code: "NV-1168",
      name: "Hoàng Ngọc Mai",
      avatar: "",
      initials: "NM",
      dept: "Product",
      branch: "TPHCM",
      title: "Product Owner",
    },
    targetDate: "16/09/2026",
    originalTime: { checkIn: "08:28", checkOut: "--:--" },
    proposedTime: { checkIn: "08:28", checkOut: "17:40" },
    reasonTag: "Quên Check-out",
    reasonDetail: "Bận workshop khách hàng cuối ngày nên ra về không qua kiosk.",
    approvalState: {
      leadStatus: "approved",
      leadName: "Trần Hoàng Nam (Team Lead)",
      leadApprovedAt: "17/09/2026 16:40",
      hrStatus: "approved",
      hrApprovedAt: "17/09/2026 17:15",
    },
  },
  {
    id: "adj-9",
    code: "#ADJ-2026-0916",
    submittedDate: "16/09/2026 10:20",
    employee: {
      code: "NV-1077",
      name: "Nguyễn Đức Kiên",
      avatar: "",
      initials: "DK",
      dept: "Sales",
      branch: "Đà Nẵng",
      title: "Sales Manager",
    },
    targetDate: "15/09/2026",
    originalTime: { checkIn: "--:--", checkOut: "--:--" },
    proposedTime: { checkIn: "08:00", checkOut: "17:00" },
    reasonTag: "Lỗi GPS Chi nhánh",
    reasonDetail: "Cột sóng định vị GPS chi nhánh Đà Nẵng bị nhiễu do thời tiết mưa bão.",
    approvalState: {
      leadStatus: "approved",
      leadName: "Trần Hoàng Nam (Team Lead)",
      leadApprovedAt: "16/09/2026 11:00",
      hrStatus: "approved",
      hrApprovedAt: "16/09/2026 14:30",
    },
  },
  {
    id: "adj-10",
    code: "#ADJ-2026-0915",
    submittedDate: "15/09/2026 13:45",
    employee: {
      code: "NV-1092",
      name: "Phạm Quỳnh Anh",
      avatar: "",
      initials: "QA",
      dept: "HR",
      branch: "TPHCM",
      title: "HR Business Partner",
    },
    targetDate: "14/09/2026",
    originalTime: { checkIn: "--:--", checkOut: "--:--" },
    proposedTime: { checkIn: "08:30", checkOut: "17:30" },
    reasonTag: "Quên Check-out",
    reasonDetail: "Không có minh chứng làm việc cụ thể ngoài thời gian biểu quy định.",
    approvalState: {
      leadStatus: "approved",
      leadName: "Lê Khánh Linh (HR Ops)",
      leadApprovedAt: "15/09/2026 14:00",
      hrStatus: "rejected",
      rejectionReason: "Đơn nộp trễ quá 48 giờ làm việc theo quy định chính sách chấm công v2.0.",
    },
  },
  {
    id: "adj-11",
    code: "#ADJ-2026-0914",
    submittedDate: "14/09/2026 15:20",
    employee: {
      code: "NV-1011",
      name: "Trần Văn Toàn",
      avatar: "",
      initials: "VT",
      dept: "Dev",
      branch: "TPHCM",
      title: "Fullstack Developer",
    },
    targetDate: "12/09/2026",
    originalTime: { checkIn: "--:--", checkOut: "--:--" },
    proposedTime: { checkIn: "08:30", checkOut: "17:30" },
    reasonTag: "Lỗi GPS Chi nhánh",
    reasonDetail: "Báo lỗi GPS nhưng log hệ thống ghi nhận thiết bị tại Quận 9 (cách VP 18km).",
    approvalState: {
      leadStatus: "approved",
      leadName: "Trần Hoàng Nam (Team Lead)",
      leadApprovedAt: "14/09/2026 16:00",
      hrStatus: "rejected",
      rejectionReason: "Tọa độ GPS không khớp với địa bàn làm việc đăng ký và không có biên bản xác nhận của Team Lead.",
    },
  },
  {
    id: "adj-12",
    code: "#ADJ-2026-0913",
    submittedDate: "13/09/2026 09:30",
    employee: {
      code: "NV-1022",
      name: "Ngô Mỹ Duyên",
      avatar: "",
      initials: "MD",
      dept: "Product",
      branch: "Hà Nội",
      title: "Content Creator",
    },
    targetDate: "12/09/2026",
    originalTime: { checkIn: "--:--", checkOut: "--:--" },
    proposedTime: { checkIn: "08:30", checkOut: "17:30" },
    reasonTag: "Quên Check-out",
    reasonDetail: "Quên quét thẻ vào ca sáng.",
    approvalState: {
      leadStatus: "approved",
      leadName: "Trần Hoàng Nam (Team Lead)",
      leadApprovedAt: "13/09/2026 10:00",
      hrStatus: "rejected",
      rejectionReason: "Đã vượt quá hạn mức 3 lần điều chỉnh quên quẹt thẻ trong tháng.",
    },
  },
];

export default function AttendanceApprovalCenter() {
  const [requests, setRequests] = useState<AdjustmentRequest[]>(INITIAL_ADJUSTMENTS);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [reasonFilter, setReasonFilter] = useState<string>("all");
  const [deptFilter, setDeptFilter] = useState<string>("all");

  // Interactive Modals
  const [rejectModalTarget, setRejectModalTarget] = useState<AdjustmentRequest | null>(null);
  const [rejectReasonInput, setRejectReasonInput] = useState("");
  const [previewAttachment, setPreviewAttachment] = useState<{
    request: AdjustmentRequest;
    attachment: NonNullable<AdjustmentRequest["attachment"]>;
  } | null>(null);

  // Toast System
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Stats calculation
  const pendingCount = useMemo(() => requests.filter((r) => r.approvalState.hrStatus === "pending").length, [requests]);
  const approvedCount = useMemo(() => requests.filter((r) => r.approvalState.hrStatus === "approved").length, [requests]);
  const rejectedCount = useMemo(() => requests.filter((r) => r.approvalState.hrStatus === "rejected").length, [requests]);

  // Handle Approve Request
  const handleApprove = (req: AdjustmentRequest) => {
    const now = new Date();
    const timeStr = `${now.toLocaleDateString("vi-VN")} ${now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`;

    setRequests((prev) =>
      prev.map((item) =>
        item.id === req.id
          ? {
              ...item,
              approvalState: {
                ...item.approvalState,
                hrStatus: "approved",
                hrApprovedAt: timeStr,
              },
            }
          : item
      )
    );

    showToast(`✅ Đã phê duyệt đơn điều chỉnh chấm công ${req.code} cho ${req.employee.name}!`);
  };

  // Handle Submit Reject
  const handleSubmitReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectModalTarget) return;

    setRequests((prev) =>
      prev.map((item) =>
        item.id === rejectModalTarget.id
          ? {
              ...item,
              approvalState: {
                ...item.approvalState,
                hrStatus: "rejected",
                rejectionReason: rejectReasonInput.trim() || "Không đủ điều kiện theo chính sách quy định",
              },
            }
          : item
      )
    );

    showToast(`❌ Đã từ chối đơn điều chỉnh ${rejectModalTarget.code} của ${rejectModalTarget.employee.name}`);
    setRejectModalTarget(null);
    setRejectReasonInput("");
  };

  // Filtered List
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      // Tab Filter
      if (r.approvalState.hrStatus !== activeTab) return false;

      // Search Query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchCode = r.code.toLowerCase().includes(q);
        const matchName = r.employee.name.toLowerCase().includes(q);
        const matchEmpCode = r.employee.code.toLowerCase().includes(q);
        if (!matchCode && !matchName && !matchEmpCode) return false;
      }

      // Reason Tag Filter
      if (reasonFilter !== "all" && r.reasonTag !== reasonFilter) return false;

      // Dept Filter
      if (deptFilter !== "all" && r.employee.dept !== deptFilter) return false;

      return true;
    });
  }, [requests, activeTab, searchQuery, reasonFilter, deptFilter]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* --- HEADER TITLE --- */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "16px",
          background: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
          border: "1px solid #bbf7d0",
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
                color: "#15803d",
                background: "#dcfce7",
                padding: "3px 10px",
                borderRadius: "20px",
              }}
            >
              HR Approval Center · Cấp Duyệt Cuối
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#0284c7",
                background: "#e0f2fe",
                padding: "3px 10px",
                borderRadius: "20px",
              }}
            >
              <ApprovalIcon name="shield" size={14} /> Quy trình 2 Cấp (Lead ➔ HR)
            </span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-1)", letterSpacing: "-0.5px", margin: 0 }}>
            Trung Tâm Phê Duyệt Điều Chỉnh Chấm Công
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-2)", marginTop: "4px" }}>
            Xét duyệt các đơn giải trình đi trễ, bổ sung giờ Check-in/out và sự cố kỹ thuật chấm công toàn công ty.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <ApprovalIcon name="clock" size={20} className="text-amber-500" />
            <div>
              <span style={{ fontSize: "11px", color: "var(--text-3)", display: "block" }}>Đang chờ HR xử lý</span>
              <strong style={{ fontSize: "16px", color: "#b45309" }}>{pendingCount} Đơn cần duyệt</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification Banner */}
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
            <ApprovalIcon name="close" size={16} />
          </button>
        </div>
      )}

      {/* --- MAIN 2-COLUMN LAYOUT (Table + Quick Stats Sidebar) --- */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px", alignItems: "start" }}>
        {/* LEFT COLUMN: TABS + FILTERS + TABLE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* 1. STATE TABS */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "10px",
              flexWrap: "wrap",
            }}
          >
            {/* Tab 1: Pending */}
            <button
              onClick={() => setActiveTab("pending")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "10px",
                border: "none",
                background: activeTab === "pending" ? "#fef3c7" : "transparent",
                color: activeTab === "pending" ? "#92400e" : "var(--text-2)",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <ApprovalIcon name="clock" size={16} className={activeTab === "pending" ? "text-amber-600" : ""} />
              ⏳ Chờ HR Duyệt (Pending)
              <span
                style={{
                  background: activeTab === "pending" ? "#f59e0b" : "#e2e8f0",
                  color: activeTab === "pending" ? "white" : "var(--text-2)",
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "2px 7px",
                  borderRadius: "12px",
                }}
              >
                {pendingCount}
              </span>
            </button>

            {/* Tab 2: Approved */}
            <button
              onClick={() => setActiveTab("approved")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "10px",
                border: "none",
                background: activeTab === "approved" ? "#dcfce7" : "transparent",
                color: activeTab === "approved" ? "#15803d" : "var(--text-2)",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <ApprovalIcon name="check" size={16} className={activeTab === "approved" ? "text-emerald-600" : ""} />
              ✅ Đã Duyệt ({approvedCount})
            </button>

            {/* Tab 3: Rejected */}
            <button
              onClick={() => setActiveTab("rejected")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "10px",
                border: "none",
                background: activeTab === "rejected" ? "#fee2e2" : "transparent",
                color: activeTab === "rejected" ? "#b91c1c" : "var(--text-2)",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <ApprovalIcon name="close" size={16} className={activeTab === "rejected" ? "text-rose-600" : ""} />
              ❌ Đã Từ Chối ({rejectedCount})
            </button>
          </div>

          {/* 2. ADVANCED FILTER BAR */}
          <div
            style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "12px 16px",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {/* Search Input */}
            <div style={{ position: "relative", flex: "1 1 200px" }}>
              <span
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-3)",
                  display: "flex",
                }}
              >
                <ApprovalIcon name="search" size={15} />
              </span>
              <input
                type="text"
                placeholder="Tìm mã đơn (#ADJ-xxx), tên hoặc mã NV..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  height: "36px",
                  paddingLeft: "32px",
                  paddingRight: "10px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  fontSize: "13px",
                  outline: "none",
                  background: "var(--bg)",
                }}
              />
            </div>

            {/* Filter Reason */}
            <div>
              <select
                value={reasonFilter}
                onChange={(e) => setReasonFilter(e.target.value)}
                style={{
                  height: "36px",
                  padding: "0 10px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  fontSize: "12.5px",
                  background: "white",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="all">⚡ Tất cả lý do</option>
                <option value="Quên Check-out">Quên Check-out</option>
                <option value="Lỗi GPS Chi nhánh">Lỗi GPS Chi nhánh</option>
                <option value="Gặp Khách hàng ngoài">Gặp Khách hàng ngoài</option>
                <option value="Sự cố mạng">Sự cố mạng</option>
                <option value="Quên bấm máy Check-in">Quên bấm máy Check-in</option>
              </select>
            </div>

            {/* Filter Dept */}
            <div>
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                style={{
                  height: "36px",
                  padding: "0 10px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  fontSize: "12.5px",
                  background: "white",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="all">🏢 Tất cả phòng ban</option>
                <option value="Dev">Dev</option>
                <option value="Product">Product</option>
                <option value="QA">QA</option>
                <option value="Helpdesk">Helpdesk</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>

          {/* 3. BẢNG CHI TIẾT ĐƠN XIN ĐIỀU CHỈNH CHẤM CÔNG */}
          <div
            style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              boxShadow: "var(--shadow-sm)",
              overflow: "hidden",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid var(--border)", color: "#475569", fontSize: "12px" }}>
                    <th style={{ padding: "12px 14px", fontWeight: 700 }}>[Mã đơn &amp; Ngày gửi]</th>
                    <th style={{ padding: "12px 14px", fontWeight: 700 }}>[Nhân viên]</th>
                    <th style={{ padding: "12px 14px", fontWeight: 700 }}>[Ngày điều chỉnh]</th>
                    <th style={{ padding: "12px 14px", fontWeight: 700 }}>[Giờ Gốc trên HT]</th>
                    <th style={{ padding: "12px 14px", fontWeight: 700 }}>[Giờ Đề xuất]</th>
                    <th style={{ padding: "12px 14px", fontWeight: 700 }}>[Lý do Điều chỉnh]</th>
                    <th style={{ padding: "12px 14px", fontWeight: 700 }}>[Minh chứng]</th>
                    <th style={{ padding: "12px 14px", fontWeight: 700 }}>[Duyệt 2 Cấp]</th>
                    <th style={{ padding: "12px 14px", fontWeight: 700, textAlign: "right" }}>[Thao tác]</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ padding: "36px", textAlign: "center", color: "var(--text-3)" }}>
                        Không có đơn điều chỉnh chấm công nào trong trạng thái này.
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((req) => {
                      const isPending = req.approvalState.hrStatus === "pending";

                      return (
                        <tr
                          key={req.id}
                          style={{
                            borderBottom: "1px solid var(--border-soft)",
                            background: isPending ? "#ffffff" : "#fbfcfd",
                            transition: "background 0.15s",
                          }}
                        >
                          {/* [Mã đơn & Ngày gửi] */}
                          <td style={{ padding: "14px" }}>
                            <div style={{ fontWeight: 700, color: "var(--brand)", fontFamily: "monospace" }}>
                              {req.code}
                            </div>
                            <div style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "2px" }}>
                              {req.submittedDate}
                            </div>
                          </td>

                          {/* [Nhân viên] */}
                          <td style={{ padding: "14px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                              {req.employee.avatar ? (
                                <img
                                  src={req.employee.avatar}
                                  alt={req.employee.name}
                                  style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover" }}
                                />
                              ) : (
                                <div
                                  style={{
                                    width: "34px",
                                    height: "34px",
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #1267e8, #13c8c8)",
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: "11px",
                                    display: "grid",
                                    placeItems: "center",
                                  }}
                                >
                                  {req.employee.initials}
                                </div>
                              )}
                              <div>
                                <div style={{ fontWeight: 700, color: "var(--text-1)" }}>{req.employee.name}</div>
                                <div style={{ fontSize: "11px", color: "var(--text-2)" }}>
                                  <span style={{ fontFamily: "monospace", fontWeight: 600 }}>{req.employee.code}</span> · {req.employee.dept} ({req.employee.branch})
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* [Ngày cần điều chỉnh] */}
                          <td style={{ padding: "14px" }}>
                            <div style={{ fontWeight: 600, color: "var(--text-1)" }}>{req.targetDate}</div>
                          </td>

                          {/* [Giờ Gốc trên Hệ thống] */}
                          <td style={{ padding: "14px" }}>
                            <div style={{ fontFamily: "monospace", fontSize: "12px", color: "#64748b" }}>
                              Vào: <b>{req.originalTime.checkIn}</b>
                            </div>
                            <div style={{ fontFamily: "monospace", fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                              Ra: <b>{req.originalTime.checkOut}</b>
                            </div>
                          </td>

                          {/* [Giờ Đề xuất Điều chỉnh] */}
                          <td style={{ padding: "14px" }}>
                            <div style={{ fontFamily: "monospace", fontSize: "12.5px", color: "#15803d", fontWeight: 700 }}>
                              Vào: {req.proposedTime.checkIn}
                            </div>
                            <div style={{ fontFamily: "monospace", fontSize: "12.5px", color: "#15803d", fontWeight: 700, marginTop: "2px" }}>
                              Ra: {req.proposedTime.checkOut}
                            </div>
                          </td>

                          {/* [Lý do Điều chỉnh] */}
                          <td style={{ padding: "14px", maxWidth: "200px" }}>
                            <span
                              style={{
                                display: "inline-block",
                                padding: "2px 8px",
                                borderRadius: "6px",
                                fontSize: "11px",
                                fontWeight: 700,
                                background:
                                  req.reasonTag === "Quên Check-out"
                                    ? "#fef3c7"
                                    : req.reasonTag === "Lỗi GPS Chi nhánh"
                                    ? "#fee2e2"
                                    : req.reasonTag === "Gặp Khách hàng ngoài"
                                    ? "#e0f2fe"
                                    : "#f3e8ff",
                                color:
                                  req.reasonTag === "Quên Check-out"
                                    ? "#92400e"
                                    : req.reasonTag === "Lỗi GPS Chi nhánh"
                                    ? "#991b1b"
                                    : req.reasonTag === "Gặp Khách hàng ngoài"
                                    ? "#075985"
                                    : "#6b21a8",
                                marginBottom: "4px",
                              }}
                            >
                              {req.reasonTag}
                            </span>
                            <p
                              title={req.reasonDetail}
                              style={{
                                fontSize: "11.5px",
                                color: "var(--text-2)",
                                margin: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {req.reasonDetail}
                            </p>
                          </td>

                          {/* [Minh chứng Đính kèm] */}
                          <td style={{ padding: "14px" }}>
                            {req.attachment ? (
                              <button
                                onClick={() => setPreviewAttachment({ request: req, attachment: req.attachment! })}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "5px",
                                  padding: "4px 8px",
                                  borderRadius: "6px",
                                  border: "1px solid #cbd5e1",
                                  background: "#f8fafc",
                                  color: "var(--brand)",
                                  fontSize: "11.5px",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                }}
                              >
                                <ApprovalIcon name={req.attachment.type === "image" ? "image" : "filePdf"} size={14} />
                                Xem minh chứng
                              </button>
                            ) : (
                              <span style={{ fontSize: "11px", color: "var(--text-3)", fontStyle: "italic" }}>Không có</span>
                            )}
                          </td>

                          {/* [Trạng thái Duyệt 2 Cấp] */}
                          <td style={{ padding: "14px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  color: "#166534",
                                  background: "#dcfce7",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                }}
                              >
                                <ApprovalIcon name="check" size={11} /> Lead: Đã duyệt
                              </span>

                              {req.approvalState.hrStatus === "pending" && (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    color: "#854d0e",
                                    background: "#fef9c3",
                                    padding: "2px 6px",
                                    borderRadius: "4px",
                                  }}
                                >
                                  <ApprovalIcon name="clock" size={11} /> HR: Chờ xử lý
                                </span>
                              )}

                              {req.approvalState.hrStatus === "approved" && (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    color: "#166534",
                                    background: "#bbf7d0",
                                    padding: "2px 6px",
                                    borderRadius: "4px",
                                  }}
                                >
                                  <ApprovalIcon name="check" size={11} /> HR: Đã duyệt
                                </span>
                              )}

                              {req.approvalState.hrStatus === "rejected" && (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    color: "#991b1b",
                                    background: "#fee2e2",
                                    padding: "2px 6px",
                                    borderRadius: "4px",
                                  }}
                                >
                                  <ApprovalIcon name="close" size={11} /> HR: Đã từ chối
                                </span>
                              )}
                            </div>
                          </td>

                          {/* [Thao tác Dòng] */}
                          <td style={{ padding: "14px", textAlign: "right" }}>
                            {isPending ? (
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                                <button
                                  onClick={() => handleApprove(req)}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    padding: "6px 12px",
                                    borderRadius: "7px",
                                    border: "none",
                                    background: "#16a34a",
                                    color: "white",
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    boxShadow: "0 1px 3px rgba(22, 163, 74, 0.3)",
                                  }}
                                >
                                  <ApprovalIcon name="check" size={14} /> Duyệt đơn
                                </button>

                                <button
                                  onClick={() => {
                                    setRejectModalTarget(req);
                                    setRejectReasonInput("");
                                  }}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    padding: "5px 10px",
                                    borderRadius: "7px",
                                    border: "1px solid #fca5a5",
                                    background: "#fff",
                                    color: "#dc2626",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                  }}
                                >
                                  <ApprovalIcon name="close" size={14} /> Từ chối
                                </button>
                              </div>
                            ) : (
                              <span style={{ fontSize: "11.5px", color: "var(--text-3)" }}>
                                {req.approvalState.hrApprovedAt || "Đã đóng đơn"}
                              </span>
                            )}
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
                padding: "12px 18px",
                borderTop: "1px solid var(--border)",
                background: "#f8fafc",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                color: "var(--text-2)",
              }}
            >
              <span>Tổng số: <b>{filteredRequests.length}</b> đơn điều chỉnh chấm công</span>
              <span>SLA phê duyệt HR: Tối đa 24 giờ sau khi Lead ký duyệt</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3. QUICK STATS SUMMARY CARD BÊN CẠNH */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Card 1: TOP 3 Lý do điều chỉnh nhiều nhất */}
          <div
            style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              padding: "18px 20px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <ApprovalIcon name="trendingUp" size={18} className="text-blue-600" />
              <h3 style={{ fontSize: "14px", fontWeight: 800, margin: 0, color: "var(--navy)" }}>
                TOP 3 Lý Do Điều Chỉnh (Tháng 09)
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Lý do 1: Quên check-out */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-1)" }}>1. Quên Check-out ra ca</span>
                  <strong style={{ color: "#d97706" }}>45%</strong>
                </div>
                <div style={{ height: "6px", width: "100%", background: "#fef3c7", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "45%", background: "linear-gradient(90deg, #f59e0b, #d97706)" }} />
                </div>
                <small style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "2px", display: "block" }}>
                  22 đơn · Chủ yếu vào các ngày thứ Sáu
                </small>
              </div>

              {/* Lý do 2: Lỗi GPS Wi-Fi */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-1)" }}>2. Lỗi GPS / Wi-Fi Chi nhánh</span>
                  <strong style={{ color: "#dc2626" }}>30%</strong>
                </div>
                <div style={{ height: "6px", width: "100%", background: "#fee2e2", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "30%", background: "linear-gradient(90deg, #f43f5e, #e11d48)" }} />
                </div>
                <small style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "2px", display: "block" }}>
                  14 đơn · Tòa nhà Handico &amp; Đà Nẵng
                </small>
              </div>

              {/* Lý do 3: Gặp khách hàng ngoài */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-1)" }}>3. Gặp Khách hàng ngoài</span>
                  <strong style={{ color: "#0284c7" }}>15%</strong>
                </div>
                <div style={{ height: "6px", width: "100%", background: "#e0f2fe", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "15%", background: "linear-gradient(90deg, #0284c7, #0369a1)" }} />
                </div>
                <small style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "2px", display: "block" }}>
                  7 đơn · Khối Sales &amp; Solution QA
                </small>
              </div>
            </div>
          </div>

          {/* Card 2: KPI & Hiệu suất Phê duyệt HR */}
          <div
            style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              padding: "18px 20px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h3 style={{ fontSize: "14px", fontWeight: 800, margin: "0 0 12px 0", color: "var(--navy)" }}>
              📊 Thống Kê Hiệu Suất Xử Lý
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: "11px", color: "var(--text-3)" }}>Tổng đơn tháng</span>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--navy)", marginTop: "2px" }}>48 Đơn</div>
              </div>

              <div style={{ background: "#f0fdf4", padding: "10px 12px", borderRadius: "10px", border: "1px solid #bbf7d0" }}>
                <span style={{ fontSize: "11px", color: "#166534" }}>Tỷ lệ duyệt</span>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "#15803d", marginTop: "2px" }}>92.5%</div>
              </div>

              <div style={{ background: "#eff6ff", padding: "10px 12px", borderRadius: "10px", border: "1px solid #bfdbfe", gridColumn: "span 2" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "11px", color: "#1e40af" }}>Thời gian xử lý trung bình</span>
                    <div style={{ fontSize: "16px", fontWeight: 800, color: "#1d4ed8", marginTop: "2px" }}>2.4 giờ / đơn</div>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#15803d", background: "#dcfce7", padding: "2px 8px", borderRadius: "10px" }}>
                    Nhanh hơn 40%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Chính sách & Cảnh báo Tuân thủ */}
          <div
            style={{
              background: "linear-gradient(135deg, #eff6ff 0%, #faf5ff 100%)",
              border: "1px solid #ddd6fe",
              borderRadius: "14px",
              padding: "16px 18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#6d28d9", marginBottom: "6px" }}>
              <ApprovalIcon name="shield" size={16} />
              <strong style={{ fontSize: "13px" }}>Quy Định Hạn Mức Điều Chỉnh</strong>
            </div>
            <p style={{ fontSize: "12px", color: "#4c1d95", margin: 0, lineHeight: 1.5 }}>
              Mỗi nhân viên chỉ được chấp thuận tối đa <b>3 lần/tháng</b> đối với lý do <i>Quên bấm máy</i>. Các trường hợp phát sinh thêm cần phê duyệt đặc biệt từ Giám đốc Khối.
            </p>
          </div>
        </div>
      </div>

      {/* --- MODAL 1: REJECT REASON MODAL --- */}
      {rejectModalTarget && (
        <div
          className="modal-backdrop"
          onClick={() => setRejectModalTarget(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
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
              width: "min(480px, 100%)",
              boxShadow: "var(--shadow-xl)",
              overflow: "hidden",
              animation: "modal-up 0.25s ease",
            }}
          >
            <div
              style={{
                padding: "18px 22px",
                borderBottom: "1px solid var(--border)",
                background: "#fff1f2",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#be123c", textTransform: "uppercase" }}>
                  HR Rejection Action
                </span>
                <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0, color: "#9f1239" }}>
                  Từ Chối Đơn Điều Chỉnh {rejectModalTarget.code}
                </h3>
              </div>
              <button
                onClick={() => setRejectModalTarget(null)}
                style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--text-3)" }}
              >
                <ApprovalIcon name="close" size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitReject} style={{ padding: "20px 22px" }}>
              <p style={{ fontSize: "13px", color: "var(--text-2)", marginBottom: "14px" }}>
                Bạn đang từ chối đơn điều chỉnh công ngày <b>{rejectModalTarget.targetDate}</b> của nhân viên{" "}
                <b>{rejectModalTarget.employee.name}</b> ({rejectModalTarget.employee.code}).
              </p>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-1)", display: "block", marginBottom: "6px" }}>
                  Lý do từ chối gửi nhân viên &amp; Team Lead:
                </label>
                <textarea
                  rows={3}
                  required
                  value={rejectReasonInput}
                  onChange={(e) => setRejectReasonInput(e.target.value)}
                  placeholder="Ví dụ: Đơn gửi trễ quá 48h / Không có minh chứng hình ảnh làm việc hợp lệ..."
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Preset Quick Reasons */}
              <div style={{ marginTop: "10px" }}>
                <span style={{ fontSize: "11px", color: "var(--text-3)", display: "block", marginBottom: "4px" }}>
                  Gợi ý nhanh lý do:
                </span>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {[
                    "Gửi trễ quá 48 giờ quy định",
                    "Thiếu minh chứng đính kèm",
                    "Vượt quá 3 lần/tháng",
                    "Tọa độ GPS không trùng khớp",
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setRejectReasonInput(preset)}
                      style={{
                        fontSize: "11px",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                        background: "#f8fafc",
                        cursor: "pointer",
                      }}
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "20px",
                  paddingTop: "14px",
                  borderTop: "1px solid var(--border-soft)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setRejectModalTarget(null)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
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
                    padding: "8px 18px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#dc2626",
                    color: "white",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Xác Nhận Từ Chối
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: PREVIEW ATTACHMENT MODAL --- */}
      {previewAttachment && (
        <div
          className="modal-backdrop"
          onClick={() => setPreviewAttachment(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(5px)",
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
              width: "min(640px, 100%)",
              boxShadow: "var(--shadow-xl)",
              overflow: "hidden",
              animation: "modal-up 0.25s ease",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f8fafc",
              }}
            >
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--navy)" }}>
                  📎 Minh Chứng Đính Kèm ({previewAttachment.request.code})
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-3)" }}>
                  Tải lên bởi {previewAttachment.request.employee.name} · {previewAttachment.attachment.fileSize}
                </div>
              </div>
              <button
                onClick={() => setPreviewAttachment(null)}
                style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--text-3)" }}
              >
                <ApprovalIcon name="close" size={18} />
              </button>
            </div>

            <div style={{ padding: "20px", textAlign: "center", maxHeight: "65vh", overflowY: "auto" }}>
              {previewAttachment.attachment.type === "image" ? (
                <img
                  src={previewAttachment.attachment.url}
                  alt="Proof screenshot"
                  style={{ maxWidth: "100%", maxHeight: "380px", borderRadius: "8px", objectFit: "contain", border: "1px solid #e2e8f0" }}
                />
              ) : (
                <div
                  style={{
                    padding: "36px 20px",
                    background: "#f1f5f9",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <ApprovalIcon name="filePdf" size={48} className="text-rose-500" />
                  <strong style={{ fontSize: "15px", color: "var(--text-1)" }}>
                    {previewAttachment.attachment.title}
                  </strong>
                  <span style={{ fontSize: "12px", color: "var(--text-2)" }}>Tài liệu PDF ({previewAttachment.attachment.fileSize})</span>
                  <a
                    href={previewAttachment.attachment.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      marginTop: "10px",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      background: "var(--brand)",
                      color: "white",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <ApprovalIcon name="download" size={14} /> Mở toàn màn hình / Tải về
                  </a>
                </div>
              )}
            </div>

            <div
              style={{
                padding: "14px 20px",
                borderTop: "1px solid var(--border)",
                background: "#f8fafc",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setPreviewAttachment(null)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "white",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
