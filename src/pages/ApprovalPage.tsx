import React, { useState } from "react";
import { Icon, Status } from "../components/UI";

export interface ApprovalRequest {
  id: string;
  code: string;
  employeeName: string;
  avatarInitials: string;
  avatarColor: "cyan" | "blue" | "amber" | "lime" | "purple" | "indigo";
  role: string;
  department: string;
  type: "wfh" | "leave" | "attendance" | "expense" | "equipment";
  typeLabel: string;
  summary: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected" | "clarification";
  statusText: string;
  fields: { label: string; value: string; isHighlight?: boolean; isSuccess?: boolean }[];
  reason: string;
  ruleCheck: { passed: boolean; title: string; message: string };
  teamContext: { officeCount: number; wfhCount: number; leaveCount: number; notes: string };
  attachment?: { name: string; size: string; type: string };
  flow: { step: string; actor: string; status: "completed" | "current" | "pending"; time?: string }[];
  historyAction?: {
    actionBy: string;
    actionDate: string;
    actionType: "approved" | "rejected" | "clarification";
    note?: string;
  };
}

function parseViDate(dateStr?: string): Date | null {
  if (!dateStr) return null;
  const trimmed = dateStr.trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    return new Date(trimmed);
  }
  const firstPart = trimmed.split(" ")[0];
  const parts = firstPart.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  return null;
}

const INITIAL_REQUESTS: ApprovalRequest[] = [
  {
    id: "req-1",
    code: "#YCD-2026-089",
    employeeName: "Lê Hoài An",
    avatarInitials: "LA",
    avatarColor: "cyan",
    role: "Product Designer",
    department: "Phòng Phát triển Sản phẩm (Product Development)",
    type: "wfh",
    typeLabel: "Làm việc từ xa (WFH)",
    summary: "25/09/2026 · Cả ngày (08:00–17:00)",
    submittedAt: "24/09/2026 14:30",
    status: "pending",
    statusText: "Chờ duyệt",
    fields: [
      { label: "Ngày làm việc WFH", value: "Thứ Sáu, 25/09/2026", isHighlight: true },
      { label: "Thời gian đăng ký", value: "Cả ngày · 08:00 – 17:00" },
      { label: "Hạn ngạch WFH tháng 9", value: "Đã dùng 1/4 ngày (Còn 3 ngày)", isSuccess: true },
    ],
    reason: "Tập trung hoàn thiện hệ thống Design System & Wireframe prototype cho ứng dụng mobile. Không có lịch họp trực tiếp tại văn phòng trong ngày.",
    ruleCheck: {
      passed: true,
      title: "Hợp lệ theo chính sách WFH v2.4",
      message: "Nhân sự không vượt quá 2 ngày WFH/tuần và đã báo trước 24 giờ làm việc.",
    },
    teamContext: {
      officeCount: 5,
      wfhCount: 1,
      leaveCount: 1,
      notes: "Đủ 70% nhân sự trực tiếp tại văn phòng. Không có xung đột dự án.",
    },
    flow: [
      { step: "Tạo yêu cầu", actor: "Lê Hoài An", status: "completed", time: "24/09 14:30" },
      { step: "Quản lý trực tiếp (Lead)", actor: "Nguyễn Minh Anh (Bạn)", status: "current" },
      { step: "HR & Vận hành", actor: "Bộ phận Nhân sự", status: "pending" },
    ],
  },
  {
    id: "req-2",
    code: "#YCD-2026-092",
    employeeName: "Đỗ Thu Hà",
    avatarInitials: "TH",
    avatarColor: "blue",
    role: "Senior HR Specialist",
    department: "Phòng Nhân sự & Văn hóa (HR)",
    type: "leave",
    typeLabel: "Nghỉ phép năm",
    summary: "28–29/09/2026 · 2 ngày (Trừ 2 ngày phép năm)",
    submittedAt: "23/09/2026 09:15",
    status: "pending",
    statusText: "Chờ duyệt",
    fields: [
      { label: "Thời gian nghỉ phép", value: "28/09/2026 – 29/09/2026 (2 ngày)", isHighlight: true },
      { label: "Loại hình nghỉ", value: "Nghỉ phép năm hưởng nguyên lương" },
      { label: "Quỹ phép còn lại", value: "Còn 10.5 ngày phép năm 2026", isSuccess: true },
      { label: "Người bàn giao công việc", value: "Phạm Quốc Bảo (HR Associate)" },
    ],
    reason: "Giải quyết công việc gia đình cá nhân ở quê. Đã bàn giao toàn bộ lịch phỏng vấn tuyển dụng tuần tới cho Phạm Quốc Bảo.",
    ruleCheck: {
      passed: true,
      title: "Đủ điều kiện nghỉ phép năm",
      message: "Tài khoản phép năm đủ số dư và đã có nhân sự tiếp nhận bàn giao.",
    },
    teamContext: {
      officeCount: 6,
      wfhCount: 0,
      leaveCount: 1,
      notes: "Phòng HR bảo đảm có nhân sự trực hỗ trợ cán bộ nhân viên.",
    },
    flow: [
      { step: "Tạo yêu cầu", actor: "Đỗ Thu Hà", status: "completed", time: "23/09 09:15" },
      { step: "Quản lý trực tiếp (Lead)", actor: "Nguyễn Minh Anh (Bạn)", status: "current" },
      { step: "Cập nhật bảng lương", actor: "Hệ thống Payroll Auto", status: "pending" },
    ],
  },
  {
    id: "req-3",
    code: "#YCD-2026-095",
    employeeName: "Nguyễn Đức Phúc",
    avatarInitials: "ĐP",
    avatarColor: "amber",
    role: "Frontend Developer",
    department: "Phòng Công nghệ (Engineering)",
    type: "attendance",
    typeLabel: "Điều chỉnh chấm công",
    summary: "18/09/2026 · Quên Checkout lúc 18:15",
    submittedAt: "19/09/2026 08:30",
    status: "pending",
    statusText: "Chờ duyệt",
    fields: [
      { label: "Ngày cần điều chỉnh", value: "Thứ Sáu, 18/09/2026", isHighlight: true },
      { label: "Giờ Check-in thực tế", value: "08:28 (Đúng giờ)" },
      { label: "Giờ Check-out đề xuất", value: "18:15 (Làm thêm giờ OT 45 phút)" },
      { label: "Lý do bổ sung", value: "Quên quẹt thẻ khi ra về do vội họp với khách hàng" },
    ],
    reason: "Thứ 6 tuần trước rời công ty lúc 18:15 sau khi fix xong bug release khẩn cấp. Quên bấm Checkout trên app di động.",
    ruleCheck: {
      passed: true,
      title: "Xác minh WiFi & Nhật ký làm việc",
      message: "Hệ thống ghi nhận IP router văn phòng có lưu lượng dữ liệu gửi từ laptop đến 18:12.",
    },
    teamContext: {
      officeCount: 8,
      wfhCount: 1,
      leaveCount: 0,
      notes: "Nhật ký Commit Git khớp với khung giờ làm việc báo cáo.",
    },
    flow: [
      { step: "Gửi đề xuất", actor: "Nguyễn Đức Phúc", status: "completed", time: "19/09 08:30" },
      { step: "Xác nhận của Lead", actor: "Nguyễn Minh Anh (Bạn)", status: "current" },
      { step: "Đồng bộ Timekeeping", actor: "Hệ thống Chấm công", status: "pending" },
    ],
  },
  {
    id: "req-4",
    code: "#YCD-2026-098",
    employeeName: "Trần Thảo My",
    avatarInitials: "TM",
    avatarColor: "lime",
    role: "UI/UX Graphic Designer",
    department: "Phòng Phát triển Sản phẩm (Product Development)",
    type: "expense",
    typeLabel: "Bồi hoàn chi phí",
    summary: "1.850.000 ₫ · Đăng ký bản quyền Figma & Midjourney",
    submittedAt: "22/09/2026 16:45",
    status: "pending",
    statusText: "Chờ duyệt",
    fields: [
      { label: "Số tiền bồi hoàn", value: "1.850.000 ₫", isHighlight: true },
      { label: "Danh mục chi phí", value: "Phần mềm & Bản quyền thiết bị đồ họa" },
      { label: "Số hóa đơn VAT", value: "HD-FG-8892014 (Hóa đơn điện tử VAT)" },
      { label: "Hình thức thanh toán", value: "Chuyển khoản qua STK nhân sự" },
    ],
    reason: "Thanh toán gia hạn tài khoản Figma Organization và Midjourney AI để thiết kế bộ nhận diện thương hiệu cho dự án mới.",
    attachment: {
      name: "Hoa_don_VAT_Figma_Midjourney_T9.pdf",
      size: "1.2 MB",
      type: "PDF Document",
    },
    ruleCheck: {
      passed: true,
      title: "Đầy đủ chứng từ hợp lệ",
      message: "Có hóa đơn VAT đúng thông tin MST công ty oHRiise Việt Nam.",
    },
    teamContext: {
      officeCount: 6,
      wfhCount: 1,
      leaveCount: 0,
      notes: "Khoản chi nằm trong ngân sách phần mềm đã phê duyệt đầu quý.",
    },
    flow: [
      { step: "Tạo phiếu chi", actor: "Trần Thảo My", status: "completed", time: "22/09 16:45" },
      { step: "Duyệt chuyên môn", actor: "Nguyễn Minh Anh (Bạn)", status: "current" },
      { step: "Kế toán chi tiền", actor: "Phòng Kế toán Tài chính", status: "pending" },
    ],
  },
  {
    id: "req-5",
    code: "#YCD-2026-070",
    employeeName: "Hoàng Quốc Việt",
    avatarInitials: "QV",
    avatarColor: "purple",
    role: "DevOps Engineer",
    department: "Phòng Hạ tầng & Security",
    type: "equipment",
    typeLabel: "Cấp mới thiết bị",
    summary: "Đăng ký cấp bổ sung Màn hình 4K Dell UltraSharp 27\"",
    submittedAt: "20/09/2026 11:20",
    status: "approved",
    statusText: "Đã duyệt",
    fields: [
      { label: "Thiết bị đề xuất", value: "Dell UltraSharp 27\" 4K USB-C (U2723QE)", isHighlight: true },
      { label: "Loại thiết bị", value: "Màn hình mở rộng đồ họa & Server monitor" },
      { label: "Đơn vị ứng cứu", value: "IT Helpdesk & Quản trị tài sản" },
      { label: "Ngày giao dự kiến", value: "26/09/2026" },
    ],
    reason: "Phục vụ theo dõi hệ thống Server Kubernetes và trực canh cảnh báo hạ tầng Cloud 24/7.",
    ruleCheck: {
      passed: true,
      title: "Theo định mức vị trí công việc",
      message: "Vị trí DevOps Senior được tiêu chuẩn 2 màn hình hiển thị.",
    },
    teamContext: {
      officeCount: 7,
      wfhCount: 0,
      leaveCount: 0,
      notes: "Kho thiết bị IT hiện còn 2 màn hình nguyên seal.",
    },
    flow: [
      { step: "Tạo yêu cầu", actor: "Hoàng Quốc Việt", status: "completed", time: "20/09 11:20" },
      { step: "Duyệt quản lý", actor: "Nguyễn Minh Anh", status: "completed", time: "20/09 14:00" },
      { step: "Bàn giao tài sản", actor: "Bộ phận IT Admin", status: "completed", time: "21/09 10:30" },
    ],
    historyAction: {
      actionBy: "Nguyễn Minh Anh (Lead)",
      actionDate: "20/09/2026 14:00",
      actionType: "approved",
      note: "Đã đồng ý cấp bổ sung theo đúng tiêu chuẩn hạ tầng DevOps.",
    },
  },
  {
    id: "req-6",
    code: "#YCD-2026-065",
    employeeName: "Lý Minh Triết",
    avatarInitials: "MT",
    avatarColor: "indigo",
    role: "Backend Lead Engineer",
    department: "Phòng Công nghệ (Engineering)",
    type: "leave",
    typeLabel: "Nghỉ phép năm",
    summary: "15/09/2026 · 1 ngày (Khám sức khỏe)",
    submittedAt: "14/09/2026 16:00",
    status: "approved",
    statusText: "Đã duyệt",
    fields: [
      { label: "Ngày nghỉ phép", value: "15/09/2026", isHighlight: true },
      { label: "Số lượng", value: "1 ngày phép năm" },
    ],
    reason: "Nghỉ phép cá nhân đi khám sức khỏe định kỳ tại Bệnh viện ĐH Y Dược.",
    ruleCheck: { passed: true, title: "Hợp lệ", message: "Đủ số dư phép năm" },
    teamContext: { officeCount: 7, wfhCount: 0, leaveCount: 1, notes: "Đã ủy quyền duyệt code cho Senior Dev." },
    flow: [],
    historyAction: {
      actionBy: "Nguyễn Minh Anh (Lead)",
      actionDate: "15/09/2026 10:30",
      actionType: "approved",
      note: "Đã duyệt phép 1 ngày. Chúc anh khám sức khỏe tốt.",
    },
  },
  {
    id: "req-7",
    code: "#YCD-2026-058",
    employeeName: "Phạm Ngọc Anh",
    avatarInitials: "NA",
    avatarColor: "amber",
    role: "Content Creator Specialist",
    department: "Phòng Marketing",
    type: "expense",
    typeLabel: "Bồi hoàn chi phí",
    summary: "2.400.000 ₫ · Vé tham dự hội thảo Vietnam MarTech 2026",
    submittedAt: "09/09/2026 11:20",
    status: "rejected",
    statusText: "Từ chối",
    fields: [
      { label: "Chi phí đề xuất", value: "2.400.000 ₫", isHighlight: true },
      { label: "Chứng từ đính kèm", value: "Hóa đơn dịch vụ chưa có MST công ty" },
    ],
    reason: "Mua vé tham gia khóa đào tạo chiến lược Marketing trên các kênh TikTok & Youtube Shorts.",
    ruleCheck: { passed: false, title: "Chưa đúng quy định chứng từ", message: "Thiếu MST công ty trên hoá đơn VAT" },
    teamContext: { officeCount: 6, wfhCount: 0, leaveCount: 0, notes: "Cần bổ sung thông tin hóa đơn." },
    flow: [],
    historyAction: {
      actionBy: "Nguyễn Minh Anh (Lead)",
      actionDate: "10/09/2026 15:45",
      actionType: "rejected",
      note: "Hóa đơn chưa đúng MST công ty oHRiise. Đề nghị bạn liên hệ BTC xuất lại bản VAT chuẩn rồi nộp lại.",
    },
  },
  {
    id: "req-8",
    code: "#YCD-2026-042",
    employeeName: "Vũ Hải Nam",
    avatarInitials: "HN",
    avatarColor: "cyan",
    role: "QA Automation Tester",
    department: "Phòng Công nghệ (Engineering)",
    type: "attendance",
    typeLabel: "Điều chỉnh chấm công",
    summary: "04/09/2026 · Quên Check-in sáng",
    submittedAt: "04/09/2026 17:30",
    status: "clarification",
    statusText: "Cần làm rõ",
    fields: [
      { label: "Giờ Check-in đề xuất", value: "08:30 (Đúng giờ)" },
      { label: "Lý do bổ sung", value: "Cửa từ tầng 4 bị lỗi cảm ứng thẻ" },
    ],
    reason: "Thẻ từ bị chập chờn không nhận vân tay khi qua cửa bảo vệ sáng nay.",
    ruleCheck: { passed: true, title: "Cần xác minh", message: "Chưa thấy xác nhận của bảo vệ tòa nhà" },
    teamContext: { officeCount: 8, wfhCount: 0, leaveCount: 0, notes: "Đã báo ban quản lý tòa nhà." },
    flow: [],
    historyAction: {
      actionBy: "Nguyễn Minh Anh (Lead)",
      actionDate: "05/09/2026 09:15",
      actionType: "clarification",
      note: "Yêu cầu Hải Nam gửi kèm ảnh chụp email báo lỗi cửa từ cho IT Admin để làm căn cứ phê duyệt.",
    },
  },
  {
    id: "req-9",
    code: "#YCD-2026-031",
    employeeName: "Đặng Bích Ngọc",
    avatarInitials: "BN",
    avatarColor: "lime",
    role: "Senior UI Designer",
    department: "Phòng Phát triển Sản phẩm (Product Development)",
    type: "wfh",
    typeLabel: "Làm việc từ xa (WFH)",
    summary: "01/09/2026 · Cả ngày WFH",
    submittedAt: "31/08/2026 14:00",
    status: "approved",
    statusText: "Đã duyệt",
    fields: [
      { label: "Ngày WFH", value: "01/09/2026" },
      { label: "Lý do WFH", value: "Trực ca Release đầu tháng" },
    ],
    reason: "Tập trung thiết kế giao diện landing page chiến dịch 02/09.",
    ruleCheck: { passed: true, title: "Hợp lệ", message: "Đã đăng ký trước 24h" },
    teamContext: { officeCount: 7, wfhCount: 1, leaveCount: 0, notes: "Đảm bảo tiến độ công việc." },
    flow: [],
    historyAction: {
      actionBy: "Nguyễn Minh Anh (Lead)",
      actionDate: "01/09/2026 08:30",
      actionType: "approved",
      note: "Phê duyệt WFH hoàn thành kịp deadline chiến dịch 02/09.",
    },
  },
];

export default function ApprovalPage({ role }: { role?: string }) {
  const [requests, setRequests] = useState<ApprovalRequest[]>(INITIAL_REQUESTS);
  const [activeTab, setActiveTab] = useState<"pending" | "processed" | "history" | "all">("pending");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>("req-1");
  const [selectedBulkIds, setSelectedBulkIds] = useState<string[]>([]);

  // Modals
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReasonText, setRejectReasonText] = useState("");
  const [isClarifyModalOpen, setIsClarifyModalOpen] = useState(false);
  const [clarifyQuestionText, setClarifyQuestionText] = useState("");
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);

  // History Subtab Filter State
  const [histStartDate, setHistStartDate] = useState<string>("");
  const [histEndDate, setHistEndDate] = useState<string>("");
  const [histStatusFilter, setHistStatusFilter] = useState<string>("all");
  const [histTypeFilter, setHistTypeFilter] = useState<string>("all");
  const [histSearchQuery, setHistSearchQuery] = useState<string>("");

  // Filter requests by Tab, Type, Search
  const filteredRequests = requests.filter((r) => {
    if (activeTab === "pending" && r.status !== "pending") return false;
    if (activeTab === "processed" && r.status === "pending") return false;
    if (activeTab === "history" && r.status === "pending") return false;
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = r.employeeName.toLowerCase().includes(q);
      const matchCode = r.code.toLowerCase().includes(q);
      const matchType = r.typeLabel.toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchType) return false;
    }
    return true;
  });

  // Filter requests specifically for History Subtab (with Date Range, Status, Type, Search)
  const historyFilteredRequests = requests.filter((r) => {
    if (r.status === "pending") return false;
    if (histStatusFilter !== "all" && r.status !== histStatusFilter) return false;
    if (histTypeFilter !== "all" && r.type !== histTypeFilter) return false;
    if (histSearchQuery.trim()) {
      const q = histSearchQuery.toLowerCase();
      const matchName = r.employeeName.toLowerCase().includes(q);
      const matchCode = r.code.toLowerCase().includes(q);
      const matchType = r.typeLabel.toLowerCase().includes(q);
      const matchNote = (r.historyAction?.note || r.reason || "").toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchType && !matchNote) return false;
    }

    const recordDate = parseViDate(r.historyAction?.actionDate || r.submittedAt);
    if (recordDate) {
      if (histStartDate) {
        const start = new Date(histStartDate);
        start.setHours(0, 0, 0, 0);
        if (recordDate < start) return false;
      }
      if (histEndDate) {
        const end = new Date(histEndDate);
        end.setHours(23, 59, 59, 999);
        if (recordDate > end) return false;
      }
    }
    return true;
  });

  const selectedRequest = requests.find((r) => r.id === selectedId) || filteredRequests[0] || requests[0];
  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const processedCount = requests.filter((r) => r.status !== "pending").length;

  // Single Actions
  const handleApprove = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === reqId) {
          return {
            ...r,
            status: "approved",
            statusText: "Đã duyệt",
            historyAction: {
              actionBy: "Nguyễn Minh Anh (Lead)",
              actionDate: new Date().toLocaleString("vi-VN"),
              actionType: "approved",
              note: "Đã phê duyệt yêu cầu thành công!",
            },
          };
        }
        return r;
      })
    );

    // Auto advance to next pending request
    const remainingPending = requests.filter((r) => r.status === "pending" && r.id !== reqId);
    if (remainingPending.length > 0) {
      setSelectedId(remainingPending[0].id);
    }

    alert(`Đã phê duyệt thành công yêu cầu ${selectedRequest.code} của ${selectedRequest.employeeName}!`);
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectReasonText.trim()) {
      alert("Vui lòng nhập lý do từ chối yêu cầu.");
      return;
    }
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === selectedId) {
          return {
            ...r,
            status: "rejected",
            statusText: "Từ chối",
            historyAction: {
              actionBy: "Nguyễn Minh Anh (Lead)",
              actionDate: new Date().toLocaleString("vi-VN"),
              actionType: "rejected",
              note: rejectReasonText,
            },
          };
        }
        return r;
      })
    );
    setIsRejectModalOpen(false);
    setRejectReasonText("");
    alert(`Đã gửi phản hồi từ chối yêu cầu ${selectedRequest.code} cho ${selectedRequest.employeeName}.`);
  };

  const handleClarifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clarifyQuestionText.trim()) {
      alert("Vui lòng nhập nội dung cần làm rõ.");
      return;
    }
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === selectedId) {
          return {
            ...r,
            status: "clarification",
            statusText: "Cần làm rõ",
            historyAction: {
              actionBy: "Nguyễn Minh Anh (Lead)",
              actionDate: new Date().toLocaleString("vi-VN"),
              actionType: "clarification",
              note: clarifyQuestionText,
            },
          };
        }
        return r;
      })
    );
    setIsClarifyModalOpen(false);
    setClarifyQuestionText("");
    alert(`Đã gửi yêu cầu giải trình thêm tới ${selectedRequest.employeeName} thành công!`);
  };

  // Bulk Approve
  const toggleBulkSelect = (id: string) => {
    setSelectedBulkIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkApprove = () => {
    if (selectedBulkIds.length === 0) return;
    setRequests((prev) =>
      prev.map((r) => {
        if (selectedBulkIds.includes(r.id)) {
          return {
            ...r,
            status: "approved",
            statusText: "Đã duyệt",
            historyAction: {
              actionBy: "Nguyễn Minh Anh (Lead)",
              actionDate: new Date().toLocaleString("vi-VN"),
              actionType: "approved",
              note: "Phê duyệt hàng loạt",
            },
          };
        }
        return r;
      })
    );
    alert(`Đã phê duyệt hàng loạt ${selectedBulkIds.length} yêu cầu thành công!`);
    setSelectedBulkIds([]);
  };

  return (
    <div className="page inner-page" style={{ gap: "24px" }}>
      {/* PAGE HEADING */}
      <div
        className="page-heading"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "8px",
        }}
      >
        <div>
          <p style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.8px" }}>
            {role === "lead" ? "QUẢN LÝ THỜI GIAN & PHÊ DUYỆT TEAM" : "QUẢN TRỊ VẬN HÀNH NHÂN SỰ"}
          </p>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: "var(--text-main)", margin: "4px 0" }}>
            Trung tâm phê duyệt
          </h1>
          <span style={{ fontSize: "16px", color: "var(--text-sub)", fontWeight: 500 }}>
            Quản lý và xét duyệt các yêu cầu WFH, Nghỉ phép, Điều chỉnh chấm công & Bồi hoàn chi phí.
          </span>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {selectedBulkIds.length > 0 && (
            <button
              className="primary"
              onClick={handleBulkApprove}
              style={{
                padding: "12px 20px",
                fontSize: "15px",
                fontWeight: 900,
                background: "#166534",
                borderColor: "#166534",
                borderRadius: "14px",
              }}
            >
              <Icon name="check" size={18} /> Duyệt hàng loạt ({selectedBulkIds.length})
            </button>
          )}

        </div>
      </div>

      {/* METRICS OVERVIEW BAR */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px 24px",
            border: "1px solid var(--border-soft)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.02)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "#fff5df",
              color: "#a76a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="clock" size={24} />
          </div>
          <div>
            <b style={{ fontSize: "28px", fontWeight: 900, color: "var(--text-main)", display: "block", lineHeight: 1.1 }}>
              {pendingCount}
            </b>
            <span style={{ fontSize: "14px", color: "var(--text-sub)", fontWeight: 700 }}>Yêu cầu chờ tôi xử lý</span>
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px 24px",
            border: "1px solid var(--border-soft)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.02)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "#eaf8f1",
              color: "#16845d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="check" size={24} />
          </div>
          <div>
            <b style={{ fontSize: "28px", fontWeight: 900, color: "var(--text-main)", display: "block", lineHeight: 1.1 }}>
              {processedCount}
            </b>
            <span style={{ fontSize: "14px", color: "var(--text-sub)", fontWeight: 700 }}>Đã xử lý trong tháng</span>
          </div>
        </div>

      </div>

      {/* FILTER & TABS BAR */}
      <div
        className="page-sub-tabs"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          background: "white",
          borderRadius: "20px",
          padding: "16px 24px",
          border: "1px solid var(--border-soft)",
        }}
      >
        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            className={activeTab === "pending" ? "primary" : "secondary"}
            onClick={() => setActiveTab("pending")}
            style={{ padding: "10px 18px", fontSize: "15px", fontWeight: 800, borderRadius: "12px" }}
          >
            Chờ tôi xử lý {pendingCount > 0 && <em style={{ fontStyle: "normal", background: "#f59e0b", color: "white", padding: "2px 8px", borderRadius: "10px", marginLeft: "6px", fontSize: "13px" }}>{pendingCount}</em>}
          </button>
          <button
            className={activeTab === "processed" ? "primary" : "secondary"}
            onClick={() => setActiveTab("processed")}
            style={{ padding: "10px 18px", fontSize: "15px", fontWeight: 800, borderRadius: "12px" }}
          >
            Đã xử lý ({processedCount})
          </button>
          <button
            className={activeTab === "history" ? "primary" : "secondary"}
            onClick={() => setActiveTab("history")}
            style={{ padding: "10px 18px", fontSize: "15px", fontWeight: 800, borderRadius: "12px" }}
          >
            <Icon name="clock" size={16} /> Lịch sử phê duyệt
          </button>
          <button
            className={activeTab === "all" ? "primary" : "secondary"}
            onClick={() => setActiveTab("all")}
            style={{ padding: "10px 18px", fontSize: "15px", fontWeight: 800, borderRadius: "12px" }}
          >
            Toàn bộ danh sách ({requests.length})
          </button>
        </div>

        {/* Filter dropdowns & Search */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Tìm theo tên, mã..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "10px 14px 10px 36px",
                borderRadius: "12px",
                border: "1px solid var(--border-soft)",
                fontSize: "14px",
                fontWeight: 600,
                width: "200px",
              }}
            />
            <div style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-sub)" }}>
              <Icon name="search" size={16} />
            </div>
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: "12px",
              border: "1px solid var(--border-soft)",
              fontSize: "14px",
              fontWeight: 700,
              background: "white",
            }}
          >
            <option value="all">Tất cả loại yêu cầu</option>
            <option value="wfh">Làm việc từ xa (WFH)</option>
            <option value="leave">Nghỉ phép năm</option>
            <option value="attendance">Điều chỉnh chấm công</option>
            <option value="expense">Bồi hoàn chi phí</option>
            <option value="equipment">Cấp mới thiết bị</option>
          </select>
        </div>
      </div>
      {activeTab === "history" ? (
        <section
          className="panel"
          style={{
            background: "white",
            borderRadius: "28px",
            padding: "32px",
            border: "1px solid var(--border-soft)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.8px" }}>
                TRA CỨU VẾT THAO TÁC (AUDIT TRAIL)
              </p>
              <h2 style={{ fontSize: "24px", fontWeight: 900, color: "var(--text-main)", margin: "2px 0" }}>
                Sổ nhật ký & Lịch sử phê duyệt
              </h2>
            </div>
            <button
              className="secondary"
              onClick={() => alert("Đang xuất tập tin báo cáo nhật ký phê duyệt 'Audit_Log_Approval_2026.csv' thành công!")}
              style={{
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                borderRadius: "12px",
              }}
            >
              <Icon name="file" size={18} /> Tải báo cáo Audit Log (CSV)
            </button>
          </div>

          {/* ADVANCED FILTERS BAR */}
          <div
            style={{
              background: "#f8fafc",
              borderRadius: "20px",
              padding: "20px 24px",
              border: "1px solid var(--border-soft)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: 900, color: "var(--text-sub)", letterSpacing: "0.5px" }}>
                BỘ LỌC NGÀY THÁNG & ĐIỀU KIỆN TRA CỨU
              </span>
              {(histStartDate || histEndDate || histStatusFilter !== "all" || histTypeFilter !== "all" || histSearchQuery) && (
                <button
                  onClick={() => {
                    setHistStartDate("");
                    setHistEndDate("");
                    setHistStatusFilter("all");
                    setHistTypeFilter("all");
                    setHistSearchQuery("");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ef4444",
                    fontSize: "13px",
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  ✕ Đặt lại bộ lọc
                </button>
              )}
            </div>

            {/* Filter Inputs Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "14px",
                alignItems: "flex-end",
              }}
            >
              {/* Từ ngày */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "var(--text-main)", marginBottom: "6px" }}>
                  Từ ngày (From)
                </label>
                <input
                  type="date"
                  value={histStartDate}
                  onChange={(e) => setHistStartDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                    fontWeight: 700,
                    background: "white",
                  }}
                />
              </div>

              {/* Đến ngày */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "var(--text-main)", marginBottom: "6px" }}>
                  Đến ngày (To)
                </label>
                <input
                  type="date"
                  value={histEndDate}
                  onChange={(e) => setHistEndDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                    fontWeight: 700,
                    background: "white",
                  }}
                />
              </div>

              {/* Trạng thái kết quả */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "var(--text-main)", marginBottom: "6px" }}>
                  Kết quả phê duyệt
                </label>
                <select
                  value={histStatusFilter}
                  onChange={(e) => setHistStatusFilter(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                    fontWeight: 700,
                    background: "white",
                  }}
                >
                  <option value="all">Tất cả kết quả</option>
                  <option value="approved">Đã duyệt (Approved)</option>
                  <option value="rejected">Từ chối (Rejected)</option>
                  <option value="clarification">Cần làm rõ (Clarification)</option>
                </select>
              </div>

              {/* Loại yêu cầu */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "var(--text-main)", marginBottom: "6px" }}>
                  Loại yêu cầu đề xuất
                </label>
                <select
                  value={histTypeFilter}
                  onChange={(e) => setHistTypeFilter(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                    fontWeight: 700,
                    background: "white",
                  }}
                >
                  <option value="all">Tất cả loại đề xuất</option>
                  <option value="wfh">Làm việc từ xa (WFH)</option>
                  <option value="leave">Nghỉ phép năm</option>
                  <option value="attendance">Điều chỉnh chấm công</option>
                  <option value="expense">Bồi hoàn chi phí</option>
                  <option value="equipment">Cấp mới thiết bị</option>
                </select>
              </div>

              {/* Từ khóa */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "var(--text-main)", marginBottom: "6px" }}>
                  Từ khóa tra cứu
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Tên nhân sự, mã đơn, ghi chú..."
                    value={histSearchQuery}
                    onChange={(e) => setHistSearchQuery(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px 10px 36px",
                      borderRadius: "12px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "14px",
                      fontWeight: 600,
                      background: "white",
                    }}
                  />
                  <div style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-sub)" }}>
                    <Icon name="search" size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Date Presets Bar */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", paddingTop: "4px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-sub)", marginRight: "4px" }}>
                Chọn nhanh:
              </span>
              <button
                className="secondary"
                onClick={() => {
                  setHistStartDate("");
                  setHistEndDate("");
                }}
                style={{
                  padding: "6px 14px",
                  fontSize: "13px",
                  fontWeight: 800,
                  borderRadius: "10px",
                  background: !histStartDate && !histEndDate ? "#e2e8f0" : "white",
                }}
              >
                Tất cả thời gian
              </button>
              <button
                className="secondary"
                onClick={() => {
                  setHistStartDate("2026-09-01");
                  setHistEndDate("2026-09-30");
                }}
                style={{
                  padding: "6px 14px",
                  fontSize: "13px",
                  fontWeight: 800,
                  borderRadius: "10px",
                  background: histStartDate === "2026-09-01" && histEndDate === "2026-09-30" ? "#e2e8f0" : "white",
                }}
              >
                Tháng 9/2026
              </button>
              <button
                className="secondary"
                onClick={() => {
                  setHistStartDate("2026-09-19");
                  setHistEndDate("2026-09-25");
                }}
                style={{
                  padding: "6px 14px",
                  fontSize: "13px",
                  fontWeight: 800,
                  borderRadius: "10px",
                  background: histStartDate === "2026-09-19" && histEndDate === "2026-09-25" ? "#e2e8f0" : "white",
                }}
              >
                7 ngày vừa qua (19–25/09)
              </button>
              <button
                className="secondary"
                onClick={() => {
                  setHistStartDate("2026-09-21");
                  setHistEndDate("2026-09-27");
                }}
                style={{
                  padding: "6px 14px",
                  fontSize: "13px",
                  fontWeight: 800,
                  borderRadius: "10px",
                  background: histStartDate === "2026-09-21" && histEndDate === "2026-09-27" ? "#e2e8f0" : "white",
                }}
              >
                Tuần này
              </button>
            </div>
          </div>

          {/* Results Counter Banner */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-sub)" }}>
              Hiển thị <b style={{ color: "var(--brand)" }}>{historyFilteredRequests.length}</b> lượt xử lý trong nhật ký
            </span>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            {historyFilteredRequests.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 24px", color: "var(--text-sub)", background: "#f8fafc", borderRadius: "16px" }}>
                <Icon name="search" size={40} />
                <p style={{ marginTop: "12px", fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>
                  Không tìm thấy bản ghi lịch sử nào phù hợp với bộ lọc ngày tháng & điều kiện tra cứu!
                </p>
                <button
                  className="secondary"
                  onClick={() => {
                    setHistStartDate("");
                    setHistEndDate("");
                    setHistStatusFilter("all");
                    setHistTypeFilter("all");
                    setHistSearchQuery("");
                  }}
                  style={{ marginTop: "16px", padding: "10px 20px", fontSize: "14px", fontWeight: 800, borderRadius: "12px" }}
                >
                  Xóa toàn bộ bộ lọc
                </button>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "15px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-soft)", color: "var(--text-sub)", fontSize: "14px" }}>
                    <th style={{ padding: "16px", fontWeight: 800 }}>THỜI GIAN THAO TÁC</th>
                    <th style={{ padding: "16px", fontWeight: 800 }}>MÃ ĐƠN & LOẠI ĐỀ XUẤT</th>
                    <th style={{ padding: "16px", fontWeight: 800 }}>NHÂN SỰ ĐỀ XUẤT</th>
                    <th style={{ padding: "16px", fontWeight: 800 }}>NGƯỜI XỬ LÝ</th>
                    <th style={{ padding: "16px", fontWeight: 800 }}>KẾT QUẢ / TRẠNG THÁI</th>
                    <th style={{ padding: "16px", fontWeight: 800 }}>GHI CHÚ / BÌNH LUẬN XỬ LÝ</th>
                    <th style={{ padding: "16px", fontWeight: 800, textAlign: "right" }}>THAO TÁC</th>
                  </tr>
                </thead>
                <tbody>
                  {historyFilteredRequests.map((r) => (
                    <tr key={r.id} style={{ borderBottom: "1px solid var(--border-soft)" }}>
                      <td style={{ padding: "16px", fontWeight: 700, color: "var(--text-sub)", fontSize: "14px" }}>
                        {r.historyAction?.actionDate || r.submittedAt}
                      </td>
                      <td style={{ padding: "16px" }}>
                        <b style={{ fontSize: "15px", color: "var(--brand)", fontWeight: 900, display: "block" }}>
                          {r.code}
                        </b>
                        <small style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 600 }}>
                          {r.typeLabel}
                        </small>
                      </td>
                      <td style={{ padding: "16px", fontWeight: 800, color: "var(--text-main)" }}>
                        {r.employeeName}
                      </td>
                      <td style={{ padding: "16px", fontWeight: 700, color: "#1e40af" }}>
                        {r.historyAction?.actionBy || "Hệ thống Auto"}
                      </td>
                      <td style={{ padding: "16px" }}>
                        <Status tone={r.status === "approved" ? "green" : r.status === "rejected" ? "red" : "blue"}>
                          {r.statusText}
                        </Status>
                      </td>
                      <td style={{ padding: "16px", color: "var(--text-main)", fontWeight: 600, fontSize: "14px", maxWidth: "260px" }}>
                        {r.historyAction?.note || r.reason}
                      </td>
                      <td style={{ padding: "16px", textAlign: "right" }}>
                        <button
                          className="secondary"
                          onClick={() => {
                            setSelectedId(r.id);
                            setActiveTab("processed");
                          }}
                          style={{ padding: "6px 12px", fontSize: "13px", fontWeight: 800, borderRadius: "8px" }}
                        >
                          Xem lại đơn
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      ) : (
        /* MASTER-DETAIL DUAL PANEL LAYOUT */
        <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "24px", alignItems: "start" }}>
        {/* LEFT PANEL: REQUEST LIST */}
        <section
          className="panel"
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "20px",
            border: "1px solid var(--border-soft)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxHeight: "750px",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-sub)", textTransform: "uppercase" }}>
              Danh sách ({filteredRequests.length})
            </span>
            {activeTab === "pending" && (
              <small style={{ fontSize: "12px", color: "var(--text-sub)", fontWeight: 600 }}>
                Tích chọn để duyệt nhanh
              </small>
            )}
          </div>

          {filteredRequests.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-sub)" }}>
              <Icon name="check" size={32} />
              <p style={{ marginTop: "12px", fontWeight: 700 }}>Không có yêu cầu nào trong danh mục này.</p>
            </div>
          ) : (
            filteredRequests.map((r) => {
              const isSelected = r.id === selectedRequest.id;
              const isBulkChecked = selectedBulkIds.includes(r.id);

              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  style={{
                    padding: "16px",
                    borderRadius: "18px",
                    border: isSelected ? "2px solid var(--brand)" : "1px solid var(--border-soft)",
                    background: isSelected ? "#eff6ff" : "white",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    {/* Checkbox for bulk approve */}
                    {r.status === "pending" && (
                      <input
                        type="checkbox"
                        checked={isBulkChecked}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleBulkSelect(r.id);
                        }}
                        style={{ marginTop: "4px", width: "18px", height: "18px", cursor: "pointer" }}
                      />
                    )}

                    {/* Employee Avatar */}
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "14px",
                        background: r.avatarColor === "cyan" ? "#06b6d4" : r.avatarColor === "blue" ? "#3b82f6" : r.avatarColor === "amber" ? "#f59e0b" : "#84cc16",
                        color: "white",
                        fontWeight: 900,
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {r.avatarInitials}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <b style={{ fontSize: "16px", fontWeight: 900, color: "var(--text-main)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {r.employeeName}
                        </b>
                        <Status tone={r.status === "pending" ? "amber" : r.status === "approved" ? "green" : r.status === "rejected" ? "red" : "blue"}>
                          {r.statusText}
                        </Status>
                      </div>

                      <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--brand)", marginTop: "2px" }}>
                        {r.typeLabel}
                      </div>

                      <p style={{ fontSize: "13px", color: "var(--text-sub)", margin: "4px 0 0 0", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {r.summary}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </section>

        {/* RIGHT PANEL: REQUEST DETAIL VIEW */}
        <section
          className="panel"
          style={{
            background: "white",
            borderRadius: "28px",
            padding: "32px",
            border: "1px solid var(--border-soft)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          }}
        >
          {selectedRequest ? (
            <div>
              {/* TOP PROFILE BANNER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  borderBottom: "2px solid var(--border-soft)",
                  paddingBottom: "20px",
                  marginBottom: "24px",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "20px",
                      background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
                      color: "white",
                      fontSize: "24px",
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {selectedRequest.avatarInitials}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--brand)", background: "#eff6ff", padding: "3px 10px", borderRadius: "8px" }}>
                        {selectedRequest.code}
                      </span>
                      <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 600 }}>
                        Gửi lúc: {selectedRequest.submittedAt}
                      </span>
                    </div>
                    <h2 style={{ fontSize: "28px", fontWeight: 900, color: "var(--text-main)", margin: "2px 0" }}>
                      {selectedRequest.employeeName}
                    </h2>
                    <p style={{ fontSize: "15px", color: "var(--text-sub)", fontWeight: 700, margin: 0 }}>
                      {selectedRequest.role} · {selectedRequest.department}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                  <Status tone={selectedRequest.status === "pending" ? "amber" : selectedRequest.status === "approved" ? "green" : selectedRequest.status === "rejected" ? "red" : "blue"}>
                    {selectedRequest.statusText}
                  </Status>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--brand)" }}>
                    {selectedRequest.typeLabel}
                  </span>
                </div>
              </div>



              {/* DYNAMIC FIELD GRID */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                {selectedRequest.fields.map((f) => (
                  <div
                    key={f.label}
                    style={{
                      background: "#f8fafc",
                      padding: "16px 20px",
                      borderRadius: "16px",
                      border: "1px solid var(--border-soft)",
                    }}
                  >
                    <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                      {f.label}
                    </span>
                    <b
                      style={{
                        fontSize: f.isHighlight ? "18px" : "16px",
                        fontWeight: 900,
                        color: f.isHighlight ? "var(--brand)" : f.isSuccess ? "#166534" : "var(--text-main)",
                      }}
                    >
                      {f.value}
                    </b>
                  </div>
                ))}
              </div>

              {/* REASON & ATTACHMENTS */}
              <div
                style={{
                  background: "#f8fafc",
                  padding: "20px",
                  borderRadius: "18px",
                  border: "1px solid var(--border-soft)",
                  marginBottom: "24px",
                }}
              >
                <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                  LÝ DO & NỘI DUNG ĐỀ XUẤT
                </span>
                <p style={{ fontSize: "16px", color: "var(--text-main)", margin: 0, fontWeight: 600, lineHeight: 1.5 }}>
                  {selectedRequest.reason}
                </p>

                {selectedRequest.attachment && (
                  <div
                    style={{
                      marginTop: "16px",
                      paddingTop: "14px",
                      borderTop: "1px dashed var(--border-soft)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="file" size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <b style={{ fontSize: "14px", color: "var(--text-main)", display: "block" }}>{selectedRequest.attachment.name}</b>
                      <small style={{ fontSize: "12px", color: "var(--text-sub)" }}>{selectedRequest.attachment.type} · {selectedRequest.attachment.size}</small>
                    </div>
                    <button
                      className="secondary"
                      onClick={() => alert(`Đang tải tập tin "${selectedRequest.attachment?.name}"...`)}
                      style={{ padding: "6px 14px", fontSize: "13px", fontWeight: 700 }}
                    >
                      Tải file
                    </button>
                  </div>
                )}
              </div>



              {/* MULTI-LEVEL APPROVAL FLOW VISUALIZER */}
              <div style={{ marginBottom: "28px" }}>
                <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-sub)", display: "block", marginBottom: "12px" }}>
                  TIẾN TRÌNH LUỒNG PHÊ DUYỆT
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  {selectedRequest.flow.map((step, idx) => (
                    <div
                      key={step.step}
                      style={{
                        background: step.status === "completed" ? "#f0fdf4" : step.status === "current" ? "#eff6ff" : "#f8fafc",
                        border: `1px solid ${step.status === "completed" ? "#bbf7d0" : step.status === "current" ? "#bfdbfe" : "var(--border-soft)"}`,
                        borderRadius: "14px",
                        padding: "14px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 900, color: step.status === "completed" ? "#166534" : step.status === "current" ? "#1e40af" : "var(--text-sub)" }}>
                          Bước {idx + 1}: {step.step}
                        </span>
                      </div>
                      <b style={{ fontSize: "14px", color: "var(--text-main)", display: "block" }}>
                        {step.actor}
                      </b>
                      {step.time && <small style={{ fontSize: "12px", color: "var(--text-sub)" }}>{step.time}</small>}
                    </div>
                  ))}
                </div>
              </div>

              {/* HISTORY ACTION NOTE IF PROCESSED */}
              {selectedRequest.historyAction && (
                <div
                  style={{
                    background: selectedRequest.status === "approved" ? "#f0fdf4" : selectedRequest.status === "rejected" ? "#fef2f2" : "#fefce8",
                    padding: "16px 20px",
                    borderRadius: "16px",
                    border: `1px solid ${selectedRequest.status === "approved" ? "#bbf7d0" : selectedRequest.status === "rejected" ? "#fecaca" : "#fef08a"}`,
                    marginBottom: "24px",
                  }}
                >
                  <b style={{ fontSize: "15px", color: selectedRequest.status === "approved" ? "#166534" : "#991b1b", display: "block" }}>
                    Nhật ký xử lý: {selectedRequest.historyAction.actionBy} ({selectedRequest.historyAction.actionDate})
                  </b>
                  <p style={{ fontSize: "14px", color: "var(--text-main)", margin: "4px 0 0 0", fontWeight: 600 }}>
                    Ghi chú: {selectedRequest.historyAction.note}
                  </p>
                </div>
              )}

              {/* BOTTOM ACTION BUTTONS */}
              {selectedRequest.status === "pending" ? (
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "14px", borderTop: "2px solid var(--border-soft)", paddingTop: "20px" }}>

                  <button
                    className="reject"
                    onClick={() => setIsRejectModalOpen(true)}
                    style={{
                      padding: "14px 22px",
                      fontSize: "15px",
                      fontWeight: 800,
                      borderRadius: "14px",
                      color: "#dc2626",
                      borderColor: "#fca5a5",
                      background: "#fef2f2",
                    }}
                  >
                    Từ chối
                  </button>

                  <button
                    className="primary"
                    onClick={() => handleApprove(selectedRequest.id)}
                    style={{
                      padding: "14px 28px",
                      fontSize: "16px",
                      fontWeight: 900,
                      borderRadius: "14px",
                      background: "#166534",
                      borderColor: "#166534",
                      boxShadow: "0 8px 20px rgba(22, 101, 52, 0.3)",
                    }}
                  >
                    <Icon name="check" size={20} /> Phê duyệt ngay
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: "right", borderTop: "2px solid var(--border-soft)", paddingTop: "16px", color: "var(--text-sub)", fontWeight: 700 }}>
                  Yêu cầu đã hoàn tất xử lý.
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-sub)" }}>
              Vui lòng chọn một yêu cầu để xem chi tiết.
            </div>
          )}
        </section>
      </div>
    )}

      {/* MODAL 1: REJECTION REASON */}
      {isRejectModalOpen && selectedRequest && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setIsRejectModalOpen(false)}
        >
          <div
            className="modal-card"
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              width: "100%",
              maxWidth: "520px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ borderBottom: "2px solid var(--border-soft)", paddingBottom: "16px", marginBottom: "20px" }}>
              <p style={{ fontSize: "13px", fontWeight: 800, color: "#dc2626" }}>XÁC NHẬN TỪ CHỐI</p>
              <h3 style={{ fontSize: "22px", fontWeight: 900, margin: 0 }}>Từ chối yêu cầu {selectedRequest.code}</h3>
            </div>

            <form onSubmit={handleRejectSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "15px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                  Lý do từ chối (Gửi phản hồi cho {selectedRequest.employeeName}) <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <textarea
                  rows={4}
                  value={rejectReasonText}
                  onChange={(e) => setRejectReasonText(e.target.value)}
                  placeholder="Nhập lý do không thể duyệt yêu cầu lần này..."
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                <button type="button" className="secondary" onClick={() => setIsRejectModalOpen(false)}>
                  Hủy
                </button>
                <button type="submit" className="reject" style={{ background: "#dc2626", color: "white", padding: "12px 24px" }}>
                  Xác nhận từ chối
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CLARIFICATION QUESTION */}
      {isClarifyModalOpen && selectedRequest && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setIsClarifyModalOpen(false)}
        >
          <div
            className="modal-card"
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              width: "100%",
              maxWidth: "520px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ borderBottom: "2px solid var(--border-soft)", paddingBottom: "16px", marginBottom: "20px" }}>
              <p style={{ fontSize: "13px", fontWeight: 800, color: "var(--brand)" }}>YÊU CẦU LÀM RÕ NỘI DUNG</p>
              <h3 style={{ fontSize: "22px", fontWeight: 900, margin: 0 }}>Gửi câu hỏi cho {selectedRequest.employeeName}</h3>
            </div>

            <form onSubmit={handleClarifySubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "15px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                  Nội dung cần làm rõ / Bổ sung file <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <textarea
                  rows={4}
                  value={clarifyQuestionText}
                  onChange={(e) => setClarifyQuestionText(e.target.value)}
                  placeholder="Ví dụ: Vui lòng đính kèm thêm biên bản họp hoặc lịch trình họp..."
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                <button type="button" className="secondary" onClick={() => setIsClarifyModalOpen(false)}>
                  Hủy
                </button>
                <button type="submit" className="primary" style={{ padding: "12px 24px" }}>
                  Gửi yêu cầu làm rõ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: WORKFLOW RULES MATRIX */}
      {isWorkflowModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setIsWorkflowModalOpen(false)}
        >
          <div
            className="modal-card"
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              width: "100%",
              maxWidth: "680px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid var(--border-soft)", paddingBottom: "16px", marginBottom: "20px" }}>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 800, color: "var(--brand)" }}>MA TRẬN QUY TRÌNH DUYỆT</p>
                <h3 style={{ fontSize: "22px", fontWeight: 900, margin: 0 }}>Cấu hình luồng phê duyệt tự động</h3>
              </div>
              <button className="secondary" onClick={() => setIsWorkflowModalOpen(false)} style={{ padding: "8px" }}>
                <Icon name="close" size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
              {[
                ["Làm việc từ xa (WFH)", "Tối đa 2 ngày/tuần", "Quản lý trực tiếp (Lead) duyệt 1 cấp"],
                ["Nghỉ phép năm", "1 - 3 ngày", "Lead duyệt -> Tự động trừ quỹ phép"],
                ["Nghỉ phép dài hạn", "> 3 ngày", "Lead duyệt -> Trưởng phòng HR phê duyệt"],
                ["Bồi hoàn chi phí", "< 5.000.000 ₫", "Lead duyệt -> Kế toán chi tiền"],
                ["Bồi hoàn chi phí lớn", "≥ 5.000.000 ₫", "Lead -> Ban giám đốc -> Kế toán"],
              ].map(([t, cond, rule]) => (
                <div key={t} style={{ background: "#f8fafc", padding: "14px 18px", borderRadius: "14px", border: "1px solid var(--border-soft)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <b style={{ fontSize: "15px", color: "var(--text-main)", display: "block" }}>{t}</b>
                    <small style={{ fontSize: "13px", color: "var(--text-sub)" }}>Điều kiện: {cond}</small>
                  </div>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--brand)", background: "#eff6ff", padding: "6px 12px", borderRadius: "10px" }}>
                    {rule}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "right" }}>
              <button className="primary" onClick={() => setIsWorkflowModalOpen(false)} style={{ padding: "12px 24px" }}>
                Đã hiểu quy tắc
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
