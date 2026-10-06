import React, { useState } from "react";
import {
  Box, Group, Text, Card, Grid, Table, ScrollArea, Avatar, TextInput, Select, Title, Pagination, ActionIcon, Menu, Tabs, Drawer, Stack, Badge, Button, ThemeIcon, Textarea, SimpleGrid
} from "@mantine/core";
import {
  IconSearch, IconCheck, IconX, IconChevronUp, IconChevronDown, IconSelector, IconDotsVertical, IconEye, IconFilter, IconFileText, IconClock, IconLink
} from "@tabler/icons-react";
import { StatusBadge } from "../components/UI";
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
  {
    id: "req-10",
    code: "#YCD-2026-104",
    employeeName: "Hoàng Minh Tuấn",
    avatarInitials: "MT",
    avatarColor: "cyan",
    role: "Mobile App Developer",
    department: "Phòng Công nghệ (Engineering)",
    type: "attendance",
    typeLabel: "Điều chỉnh chấm công",
    summary: "24/09/2026 · Lỗi GPS Chi nhánh (Đề xuất 08:30 - 17:35)",
    submittedAt: "25/09/2026 09:00",
    status: "pending",
    statusText: "Chờ duyệt",
    fields: [
      { label: "Ngày cần điều chỉnh", value: "Thứ Năm, 24/09/2026", isHighlight: true },
      { label: "Giờ gốc trên hệ thống", value: "Check-in: --:-- | Check-out: 17:35" },
      { label: "Giờ đề xuất điều chỉnh", value: "Check-in: 08:30 | Check-out: 17:35 (Đúng giờ)", isSuccess: true },
      { label: "Lý do điều chỉnh", value: "Lỗi GPS Chi nhánh (Tòa nhà Bitexco)" },
    ],
    reason: "Sáng 24/09 đến văn phòng lúc 08:25 nhưng app báo lỗi ngoài bán kính 50m do GPS trong thang máy/tòa nhà bị trôi. Đã có mặt đúng giờ và bắt đầu làm việc.",
    ruleCheck: {
      passed: true,
      title: "Xác thực địa chỉ IP Wi-Fi",
      message: "Đã kết nối Wi-Fi 'oHRiise-Corp-5G' từ 08:26 sáng (Khớp 100%).",
    },
    teamContext: {
      officeCount: 8,
      wfhCount: 0,
      leaveCount: 0,
      notes: "Khớp nhật ký router văn phòng và Git commit sáng.",
    },
    flow: [
      { step: "Gửi đơn", actor: "Hoàng Minh Tuấn", status: "completed", time: "25/09 09:00" },
      { step: "Lead / HR duyệt", actor: "Nguyễn Minh Anh (Bạn)", status: "current" },
      { step: "Cập nhật bảng công", actor: "Hệ thống Payroll Auto", status: "pending" },
    ],
  },
  {
    id: "req-11",
    code: "#YCD-2026-105",
    employeeName: "Võ Thị Quỳnh Như",
    avatarInitials: "QN",
    avatarColor: "lime",
    role: "Account Executive",
    department: "Phòng Kinh doanh (Sales & Partnerships)",
    type: "attendance",
    typeLabel: "Điều chỉnh chấm công",
    summary: "23/09/2026 · Gặp Khách hàng ngoài (Đề xuất 09:00 - 18:00)",
    submittedAt: "24/09/2026 08:45",
    status: "pending",
    statusText: "Chờ duyệt",
    fields: [
      { label: "Ngày cần điều chỉnh", value: "Thứ Tư, 23/09/2026", isHighlight: true },
      { label: "Giờ gốc trên hệ thống", value: "Check-in: --:-- | Check-out: --:--" },
      { label: "Giờ đề xuất điều chỉnh", value: "Check-in: 09:00 | Check-out: 18:00 (Đủ 8 giờ công)", isSuccess: true },
      { label: "Lý do điều chỉnh", value: "Gặp Khách hàng đối tác ngoài Onsite" },
    ],
    reason: "Đi gặp ban giám đốc Tập đoàn VinaTech ký hợp đồng triển khai giải pháp nhân sự cả ngày. Đính kèm biên bản làm việc & ảnh check-in tại trụ sở đối tác.",
    attachment: {
      name: "Bien_ban_hop_VinaTech_2309.pdf",
      size: "2.4 MB",
      type: "PDF Document",
    },
    ruleCheck: {
      passed: true,
      title: "Lịch trình công tác hợp lệ",
      message: "Có lịch hẹn Google Calendar được phê duyệt trước và ảnh check-in đối tác.",
    },
    teamContext: {
      officeCount: 5,
      wfhCount: 0,
      leaveCount: 0,
      notes: "Khách hàng xác nhận cuộc họp thành công.",
    },
    flow: [
      { step: "Gửi đơn", actor: "Võ Thị Quỳnh Như", status: "completed", time: "24/09 08:45" },
      { step: "Lead / HR duyệt", actor: "Nguyễn Minh Anh (Bạn)", status: "current" },
      { step: "Cập nhật bảng công", actor: "Hệ thống Payroll Auto", status: "pending" },
    ],
  },
];

export default function ApprovalPage({ role }: { role?: string }) {
  const [requests, setRequests] = useState<ApprovalRequest[]>(INITIAL_REQUESTS);
  const [statusFilter, setStatusFilter] = useState<string | null>("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  
  // Drawer state
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [selectedReq, setSelectedReq] = useState<ApprovalRequest | null>(null);

  // Sorting
  const [sortConfig, setSortConfig] = useState<{ key: keyof ApprovalRequest | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  const handleSort = (key: keyof ApprovalRequest) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const filteredRequests = requests.filter(r => {
    if (statusFilter !== "all" && statusFilter !== null) {
      if (statusFilter === "processed") {
        if (r.status === "pending") return false;
      } else if (r.status !== statusFilter) {
        return false;
      }
    }
    
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!r.employeeName.toLowerCase().includes(q) && !r.code.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  if (sortConfig.key) {
    filteredRequests.sort((a, b) => {
      let aVal = a[sortConfig.key!];
      let bVal = b[sortConfig.key!];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const Th = ({ children, columnKey }: { children: React.ReactNode, columnKey: keyof ApprovalRequest }) => {
    const isSorted = sortConfig.key === columnKey;
    const isAsc = isSorted && sortConfig.direction === 'asc';
    const isDesc = isSorted && sortConfig.direction === 'desc';
    return (
      <Table.Th>
        <Group justify="space-between" align="center" style={{ cursor: 'pointer' }} onClick={() => handleSort(columnKey)} wrap="nowrap">
          <Text fw={700} fz="sm" c="dark.9">{children}</Text>
          <Group gap={0}>
            {isAsc ? <IconChevronUp size={14} color="var(--mantine-color-blue-6)" /> : isDesc ? <IconChevronDown size={14} color="var(--mantine-color-blue-6)" /> : <IconSelector size={14} color="gray" opacity={0.5} />}
          </Group>
        </Group>
      </Table.Th>
    )
  }

  const openDrawer = (req: ApprovalRequest) => {
    setSelectedReq(req);
    setDrawerOpened(true);
  };

  const pendingCount = requests.filter(r => r.status === "pending").length;
  const processedCount = requests.filter(r => r.status !== "pending").length;

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "approved", statusText: "Đã duyệt" } : r));
    setDrawerOpened(false);
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "rejected", statusText: "Từ chối" } : r));
    setDrawerOpened(false);
  };

  return (
    <Box>
      <Group justify="space-between" align="center" mb="xl">
        <Box>
          <Title order={2} fw={700} c="dark.9">Trung tâm phê duyệt</Title>
          <Text c="dimmed">Quản lý và xét duyệt các yêu cầu WFH, Nghỉ phép, Điều chỉnh chấm công & Bồi hoàn chi phí.</Text>
        </Box>
      </Group>

      <Grid mb="xl">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card withBorder radius="lg" padding="lg" ta="center">
            <Text fz="xs" fw={700} c="dimmed" tt="uppercase" mb={4}>Yêu cầu chờ tôi xử lý</Text>
            <Group justify="center" align="baseline" gap="xs">
              <Text fw={900} fz={32} lh={1}>{pendingCount}</Text>
              <Text fz="xs" c="dimmed">Yêu cầu</Text>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card withBorder radius="lg" padding="lg" ta="center">
            <Text fz="xs" fw={700} c="dimmed" tt="uppercase" mb={4}>Đã xử lý trong tháng</Text>
            <Group justify="center" align="baseline" gap="xs">
              <Text fw={900} fz={32} lh={1}>{processedCount}</Text>
              <Text fz="xs" c="dimmed">Đơn</Text>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      <Card withBorder radius="lg" p={0} shadow="sm">
        <Box p="md" className="filter-section">
          <Group justify="flex-start" wrap="wrap" gap="sm">
            <TextInput
              placeholder="Tên nhân viên, mã đơn..."
              leftSection={<IconSearch size={14} />}
              size="sm"
              radius="md"
              w={{ base: "100%", sm: 250 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
            <Select
              placeholder="Tất cả trạng thái"
              size="sm"
              radius="md"
              w={180}
              data={[
                { value: "all", label: "Tất cả trạng thái" },
                { value: "pending", label: "Chờ xử lý" },
                { value: "processed", label: "Đã xử lý (Tất cả)" },
                { value: "approved", label: "Đã duyệt" },
                { value: "rejected", label: "Từ chối" },
                { value: "clarification", label: "Cần làm rõ" },
              ]}
              value={statusFilter}
              onChange={(v) => v && setStatusFilter(v)}
              allowDeselect={false}
            />
            <Select
              placeholder="Tất cả loại yêu cầu"
              size="sm"
              radius="md"
              w={200}
              data={[
                { value: "all", label: "Tất cả loại yêu cầu" },
                { value: "wfh", label: "Làm việc từ xa" },
                { value: "leave", label: "Nghỉ phép" },
                { value: "attendance", label: "Điều chỉnh chấm công" },
                { value: "expense", label: "Bồi hoàn chi phí" },
                { value: "equipment", label: "Cấp mới thiết bị" },
              ]}
              value={typeFilter}
              onChange={(v) => v && setTypeFilter(v)}
              allowDeselect={false}
            />
          </Group>
        </Box>

        <ScrollArea>
          <Table className="ohriise-table" verticalSpacing="md" horizontalSpacing="md" highlightOnHover striped={false}>
            <Table.Thead>
              <Table.Tr bg="transparent">
                <Th columnKey="employeeName">Nhân viên</Th>
                <Th columnKey="code">Mã đơn</Th>
                <Th columnKey="typeLabel">Loại yêu cầu</Th>
                <Th columnKey="summary">Chi tiết</Th>
                <Th columnKey="submittedAt">Ngày gửi</Th>
                <Th columnKey="status">Trạng thái</Th>
                <Table.Th style={{ textAlign: "right" }}></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredRequests.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={7} ta="center" py="xl">
                    <Text c="dimmed">Không tìm thấy yêu cầu nào phù hợp</Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                filteredRequests.map(req => (
                  <Table.Tr key={req.id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar size="md" radius="xl" color={req.avatarColor}>{req.avatarInitials}</Avatar>
                        <Box>
                          <Text fw={600} fz="sm" c="dark.9">{req.employeeName}</Text>
                          <Text fz="xs" c="dimmed">{req.role}</Text>
                        </Box>
                      </Group>
                    </Table.Td>
                    <Table.Td><Text fw={700} c="dark.9">{req.code}</Text></Table.Td>
                    <Table.Td>
                      <Badge variant="light" color={req.type === 'leave' ? 'orange' : req.type === 'wfh' ? 'blue' : req.type === 'expense' ? 'green' : 'gray'}>
                        {req.typeLabel}
                      </Badge>
                    </Table.Td>
                    <Table.Td><Text fz="sm" fw={500} lineClamp={2}>{req.summary}</Text></Table.Td>
                    <Table.Td><Text fz="sm" c="dimmed">{req.submittedAt}</Text></Table.Td>
                    <Table.Td>
                      <StatusBadge status={req.status === 'pending' ? 'new' : req.status} statusText={req.statusText} />
                    </Table.Td>
                    <Table.Td ta="right">
                      <Button variant="light" size="xs" color="blue" leftSection={<IconEye size={14} />} onClick={() => openDrawer(req)}>
                        Xem chi tiết
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
        <Box p="md">
          <Group justify="space-between" align="center">
            <Text fz="sm" c="dimmed">Hiển thị {filteredRequests.length} kết quả</Text>
            <Pagination total={1} value={1} size="sm" radius="sm" color="blue" />
          </Group>
        </Box>
      </Card>

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        position="right"
        size="lg"
        title={<Text fw={700} fz="lg">Chi tiết yêu cầu</Text>}
      >
        {selectedReq && (
          <Stack gap="md">
            <Card withBorder bg="gray.0" radius="md">
              <Group justify="space-between" mb="sm">
                <Group gap="sm">
                  <Avatar size="lg" radius="xl" color={selectedReq.avatarColor}>{selectedReq.avatarInitials}</Avatar>
                  <Box>
                    <Text fw={700} fz="md">{selectedReq.employeeName}</Text>
                    <Text fz="sm" c="dimmed">{selectedReq.role}</Text>
                  </Box>
                </Group>
                <Badge size="lg" color={selectedReq.type === 'leave' ? 'orange' : selectedReq.type === 'wfh' ? 'blue' : selectedReq.type === 'expense' ? 'green' : 'gray'}>
                  {selectedReq.typeLabel}
                </Badge>
              </Group>
              <Text fz="sm" c="dimmed">Mã đơn: <Text component="span" fw={600} c="dark.9">{selectedReq.code}</Text> • Gửi lúc: {selectedReq.submittedAt}</Text>
            </Card>

            <SimpleGrid cols={2} spacing="sm">
              {selectedReq.fields.map(f => (
                <Card key={f.label} withBorder radius="md" padding="sm" bg={f.isHighlight ? "blue.0" : "white"}>
                  <Text fz="xs" fw={700} c="dimmed">{f.label}</Text>
                  <Text fz="sm" fw={600} c={f.isSuccess ? "teal.7" : "dark.9"}>{f.value}</Text>
                </Card>
              ))}
            </SimpleGrid>

            <Card withBorder radius="md">
              <Text fw={700} fz="sm" mb="xs">Lý do & Nội dung</Text>
              <Text fz="sm">{selectedReq.reason}</Text>
              
              {selectedReq.attachment && (
                <Group mt="md" gap="sm" p="sm" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: 8 }}>
                   <ThemeIcon color="blue" variant="light"><IconFileText size={16} /></ThemeIcon>
                   <Box style={{ flex: 1 }}>
                     <Text fz="sm" fw={600}>{selectedReq.attachment.name}</Text>
                     <Text fz="xs" c="dimmed">{selectedReq.attachment.size}</Text>
                   </Box>
                </Group>
              )}
            </Card>

            {selectedReq.status === "pending" && (
              <Group justify="flex-end" mt="xl">
                <Button variant="outline" color="red" onClick={() => handleReject(selectedReq.id)}>Từ chối</Button>
                <Button color="green" leftSection={<IconCheck size={16} />} onClick={() => handleApprove(selectedReq.id)}>Phê duyệt</Button>
              </Group>
            )}
          </Stack>
        )}
      </Drawer>
    </Box>
  );
}
