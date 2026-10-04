import {
  NavItem,
  PermissionTemplate,
  BranchData,
  DeptData,
  UserAcc,
  AuditLogItem,
  AlertItem,
  DelegationItem,
  ApprovalRuleItem,
  NotificationItem,
  SessionItem,
} from "./types";

export const NAV_ITEMS: NavItem[] = [
  // Group 1: Giám sát & Báo cáo
  { id: "dash", label: "Tổng quan", sub: "Sức khỏe hệ thống và việc cần xử lý ngay", icon: "dash", group: "Giám sát & Báo cáo" },
  { id: "lg", label: "Nhật ký & cảnh báo", sub: "Audit trail và cảnh báo bất thường", icon: "logs", group: "Giám sát & Báo cáo", badgeKey: "alerts" },

  // Group 2: Tổ chức & Tài khoản
  { id: "us", label: "Tài khoản người dùng", sub: "Tạo, kích hoạt, vô hiệu hóa và đặt lại mật khẩu", icon: "users", group: "Tổ chức & Tài khoản", badgeKey: "users" },
  { id: "org", label: "Phòng ban & cơ cấu", sub: "Danh mục phòng ban, chức danh và các nhóm HR", icon: "org", group: "Tổ chức & Tài khoản" },
  { id: "br", label: "Chi nhánh & GPS", sub: "Quản lý chi nhánh và bán kính check-in hợp lệ", icon: "branch", group: "Tổ chức & Tài khoản" },

  // Group 3: Phân quyền & Bảo mật
  { id: "pm", label: "Phân quyền tài khoản", sub: "Gán template, tinh chỉnh quyền và phạm vi dữ liệu", icon: "perm", group: "Phân quyền & Bảo mật" },
  { id: "tp", label: "Template quyền", sub: "Tạo và quản lý bộ quyền theo từng nhóm nhân sự HR", icon: "template", group: "Phân quyền & Bảo mật" },
  { id: "dg", label: "Ủy quyền & quy tắc", sub: "Ủy quyền có thời hạn và quy tắc duyệt theo điều kiện", icon: "rules", group: "Phân quyền & Bảo mật" },
  { id: "rv", label: "Rà soát & duyệt quyền", sub: "Duyệt 2 người cho quyền nhạy cảm và rà soát định kỳ", icon: "review", group: "Phân quyền & Bảo mật", badgeKey: "duals" },

  // Group 4: Hệ thống & Dữ liệu nền
  { id: "st", label: "Danh mục nền", sub: "Ca làm việc, mẫu hợp đồng, dải lương theo chức danh", icon: "master", group: "Hệ thống & Dữ liệu nền" },
  { id: "sy", label: "Cấu hình hệ thống", sub: "Thiết bị chấm công, SMTP, push notification", icon: "config", group: "Hệ thống & Dữ liệu nền" },
  { id: "em", label: "Email & Hộp thư", sub: "Chính sách gửi ra ngoài, DLP, hộp thư dùng chung", icon: "email", group: "Hệ thống & Dữ liệu nền", badgeKey: "dlp" },
  { id: "nt", label: "Thông báo Admin", sub: "Hộp thư, quy tắc định tuyến và mẫu email hệ thống", icon: "notif", group: "Hệ thống & Dữ liệu nền", badgeKey: "notif" },

  // Group 5: Trí tuệ nhân tạo (AI)
  { id: "ai", label: "Hệ thống AI", sub: "Cấu hình và giám sát CV–JD matching, phân tích WFH", icon: "ai", group: "Trí tuệ nhân tạo (AI)" },
];

export const MODULE_NAMES: [string, string][] = [
  ["Hồ sơ nhân viên", "11101"],
  ["Hợp đồng lao động", "11111"],
  ["Onboarding", "11110"],
  ["Offboarding", "11110"],
  ["Thiết bị cấp phát", "11100"],
  ["Chấm công & Timesheet", "11111"],
  ["Chính sách WFH & lịch", "11100"],
  ["Đồng bộ MISA AMIS", "10001"],
  ["Tuyển dụng & CV AI", "11111"],
  ["Báo cáo & Dashboard", "10001"],
  ["Announcement", "11100"],
  ["Cơ cấu & chức danh", "11100"],
  ["Dải lương & ngân hàng", "10001"],
  ["Đào tạo & chứng chỉ", "11110"],
];

export const ACTION_COLS = ["Xem", "Tạo", "Sửa", "Duyệt", "Xuất"];
export const SENSITIVE_FIELDS = ["CCCD", "Tài khoản ngân hàng", "Mức lương", "Số điện thoại", "Địa chỉ"];
export const SENSITIVE_VISIBILITY = ["Hiện", "Che (••••)", "Ẩn"];
export const SENSITIVE_CELL_HIGHLIGHTS = ["7,4", "9,4", "12,0", "12,4", "1,3", "8,3", "3,3"];

export function parseMatrixStr(str: string): number[][] {
  return str.split(" ").map((r) => [...r].map(Number));
}

export const INITIAL_TEMPLATES: PermissionTemplate[] = [
  {
    id: "tt",
    n: "HR Tổng",
    d: "Toàn quyền nghiệp vụ nhân sự, phạm vi toàn công ty",
    s: "Toàn công ty",
    p: parseMatrixStr("11101 11111 11110 11110 11100 11111 11100 10001 11111 10001 11100 11100 10001 11110"),
    f: [0, 0, 0, 0, 0],
    sys: 1,
  },
  {
    id: "cn",
    n: "HR Chi nhánh",
    d: "Vận hành nhân sự trong một chi nhánh",
    s: "Chi nhánh",
    p: parseMatrixStr("11101 11110 11110 11100 11100 11110 11100 00000 11110 10001 11100 10000 00000 11100"),
    f: [1, 0, 0, 0, 0],
    sys: 1,
  },
  {
    id: "ta",
    n: "HR Tuyển dụng",
    d: "Talent Acquisition: tin tuyển dụng, CV AI, onboarding",
    s: "Toàn công ty",
    p: parseMatrixStr("10000 10000 11100 00000 00000 00000 00000 00000 11111 10000 10000 00000 00000 00000"),
    f: [1, 1, 2, 2, 1],
    sys: 1,
  },
  {
    id: "cb",
    n: "HR C&B",
    d: "Lương thưởng & phúc lợi: chốt công, xuất MISA",
    s: "Toàn công ty",
    p: parseMatrixStr("10000 10000 00000 00000 00000 11111 10000 10001 00000 10001 10000 00000 10001 00000"),
    f: [0, 0, 0, 1, 0],
    sys: 1,
  },
  {
    id: "ld",
    n: "HR Đào tạo & PT",
    d: "Đào tạo, chứng chỉ, phát triển năng lực",
    s: "Toàn công ty",
    p: parseMatrixStr("10000 00000 00000 00000 00000 00000 00000 00000 00000 10000 11100 00000 00000 11110"),
    f: [1, 2, 2, 2, 1],
    sys: 1,
  },
  {
    id: "op",
    n: "HR Operations",
    d: "Hợp đồng, onboarding, offboarding, thiết bị",
    s: "Chi nhánh",
    p: parseMatrixStr("11100 11110 11110 11110 11100 10000 00000 00000 00000 10000 10000 10000 00000 00000"),
    f: [0, 0, 2, 2, 1],
    sys: 1,
  },
  {
    id: "bp",
    n: "HRBP",
    d: "Đối tác nhân sự của phòng ban, xem và báo cáo",
    s: "Toàn công ty",
    p: parseMatrixStr("10000 10000 00000 00000 00000 10000 10000 00000 10000 10001 10000 10000 00000 10000"),
    f: [1, 2, 2, 1, 0],
    sys: 1,
  },
];

export const INITIAL_BRANCHES: BranchData[] = [
  ["HCM-Q1", "Trụ sở Quận 1", "12 Nguyễn Huệ, Q1, TP.HCM", 100, 128, 1],
  ["HCM-TD", "Chi nhánh Thủ Đức", "Khu CNC, TP. Thủ Đức", 150, 64, 1],
  ["HN-CG", "Chi nhánh Cầu Giấy", "Duy Tân, Cầu Giấy, Hà Nội", 100, 42, 1],
  ["DN-HC", "Chi nhánh Hải Châu", "Bạch Đằng, Đà Nẵng", 80, 23, 1],
  ["CT-NK", "Chi nhánh Ninh Kiều", "Cần Thơ", 100, 0, 0],
].map(([code, name, address, radius, empCount, active]) => ({
  code: code as string,
  name: name as string,
  address: address as string,
  radius: radius as number,
  empCount: empCount as number,
  active: active as number,
}));

export const INITIAL_DEPTS: DeptData[] = [
  ["BGĐ", "Ban Giám đốc", "Trần Quốc Việt", 8, "Giám đốc điều hành,Giám đốc tài chính,Giám đốc vận hành,Trợ lý BGĐ"],
  ["NS", "Nhân sự", "Nguyễn Thu Hà", 25, "Trưởng phòng nhân sự,HR Manager,HR Executive,Recruiter,C&B Specialist,L&D Specialist,HRBP"],
  ["KT", "Kế toán – Tài chính", "Phạm Thị Lan", 34, "Kế toán trưởng,Kế toán tổng hợp,Kế toán thuế,Kế toán công nợ,Thủ quỹ,Chuyên viên tài chính"],
  ["KD", "Kinh doanh", "Đỗ Minh Tuấn", 96, "Giám đốc kinh doanh,Account Manager,Sales Executive,Trưởng nhóm kinh doanh"],
  ["MKT", "Marketing", "Vũ Ngọc Mai", 38, "Marketing Manager,Content Marketer,Performance Marketer,Designer"],
  ["IT", "Công nghệ thông tin", "Hoàng Đức Long", 129, "CTO,Tech Lead,Backend Developer,Frontend Developer,QA Engineer,DevOps,Data Analyst,BA"],
  ["VH", "Vận hành & Logistics", "Bùi Văn Hải", 58, "Quản lý vận hành,Điều phối vận hành,Giám sát kho,Nhân viên giao nhận"],
  ["CSKH", "Chăm sóc khách hàng", "Võ Thanh Trúc", 46, "Trưởng bộ phận CSKH,Team Leader CS,CS Agent"],
  ["PC", "Pháp chế & Tuân thủ", "Phan Anh Tú", 12, "Trưởng pháp chế,Chuyên viên pháp chế,Chuyên viên tuân thủ"],
  ["MH", "Mua hàng & Kho vận", "Huỳnh Gia Bảo", 40, "Trưởng mua hàng,Nhân viên mua hàng,Thủ kho,Kiểm soát chất lượng"],
].map(([code, name, manager, count, titlesStr]) => ({
  code: code as string,
  name: name as string,
  manager: manager as string,
  count: count as number,
  titlesStr: titlesStr as string,
}));

export const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/\s+/g, "");

export function generateInitialUsers(): UserAcc[] {
  const HRU: [string, string, string][] = [
    ["Nguyễn Thu Hà", "tt", "Toàn công ty"],
    ["Trần Minh Quân", "cn", "HCM-Q1"],
    ["Lê Bảo Ngọc", "cn", "HN-CG"],
    ["Phạm Khánh Vy", "ta", "Toàn công ty"],
    ["Võ Hoàng Nam", "cb", "Toàn công ty"],
    ["Đặng Gia Linh", "ld", "HCM-Q1"],
    ["Bùi Ngọc Mai", "op", "HCM-TD"],
    ["Huỳnh Thanh Sơn", "bp", "Toàn công ty"],
  ];

  const FN = ["Nguyễn", "Trần", "Lê", "Phạm", "Võ", "Đặng", "Bùi", "Hoàng", "Phan", "Vũ", "Đỗ", "Huỳnh"];
  const MN = ["Thu", "Minh", "Bảo", "Đức", "Khánh", "Hoàng", "Thanh", "Quốc", "Ngọc", "Gia"];
  const GN = ["Hà", "Quân", "Ngọc", "Anh", "Linh", "Nam", "Tâm", "Phúc", "My", "Khoa", "Vy", "Sơn"];
  const DX = ["KD", "IT", "KT", "MKT", "IT", "VH", "CSKH", "KD", "IT", "MH", "PC", "CSKH", "KT"];

  const users: UserAcc[] = HRU.map((h) => ({
    name: h[0],
    email: `${slug(h[0].split(" ").pop() || "")}.${slug(h[0].split(" ")[0])[0]}${slug(h[0].split(" ")[1] || "")[0]}@ohriise.vn`,
    role: "HR",
    branch: h[2],
    active: 1,
    lastLogin: "08:12 hôm nay",
    deptCode: "NS",
    jobTitle: "",
    templateId: h[1],
  }));

  for (let i = 0; i < 52; i++) {
    const a = FN[i % 12];
    const b = MN[(i * 3) % 10];
    const c = GN[(i * 5) % 12];
    const d = DX[i % 13];
    const dept = INITIAL_DEPTS.find((x) => x.code === d);
    const titles = dept ? dept.titlesStr.split(",") : ["Chuyên viên"];
    users.push({
      name: `${a} ${b} ${c}`,
      email: `${slug(c)}.${slug(a)[0]}${slug(b)[0]}${i > 11 ? i : ""}@ohriise.vn`,
      role: "Employee",
      branch: ["HCM-Q1", "HCM-TD", "HN-CG", "DN-HC", "HCM-Q1"][i % 5],
      active: i % 11 === 7 ? 0 : 1,
      lastLogin: ["08:12 hôm nay", "Hôm qua", "07:55 hôm nay", "3 ngày trước", "12 ngày trước"][i % 5],
      deptCode: d,
      jobTitle: titles[i % titles.length],
      templateId: "",
    });
  }

  return users;
}

export const INITIAL_LOGS: AuditLogItem[] = [
  { time: "09:41", user: "Nguyễn Thu Hà", action: "Chốt bảng công T9 – HCM-Q1", type: "ok" },
  { time: "09:20", user: "Admin", action: "Đổi phạm vi HR Q1: toàn công ty → HCM-Q1", type: "w" },
  { time: "09:02", user: "Trần Minh Quân", action: "Xuất báo cáo bảng công (Excel)", type: "ok" },
  { time: "08:47", user: "Hệ thống", action: "Đồng bộ MISA AMIS thất bại lần 1, thử lại thành công", type: "w" },
  { time: "08:30", user: "Admin", action: "Vô hiệu hóa tài khoản nam.dh@ohriise.vn", type: "ok" },
  { time: "08:12", user: "Nguyễn Thu Hà", action: "Duyệt hợp đồng chính thức – Bùi Thanh Tâm", type: "ok" },
  { time: "07:58", user: "Lê Bảo Ngọc", action: "Sửa chứng chỉ nhân viên NV-0231", type: "ok" },
  { time: "07:40", user: "Hệ thống", action: "AI hoàn tất chấm điểm 14 CV – Vị trí Backend", type: "ok" },
];

export const INITIAL_ALERTS: AlertItem[] = [
  { type: "e", title: "Đăng nhập thất bại 6 lần liên tiếp", subtitle: "tài khoản linh.vk@… từ IP 113.161.x.x", time: "10 phút trước" },
  { type: "w", title: "Dung lượng lưu trữ đạt 82%", subtitle: "Bản scan hợp đồng và screenshot AI", time: "1 giờ trước" },
  { type: "w", title: "Thiết bị Kiosk HN-CG mất kết nối", subtitle: "QR động không làm mới từ 07:15", time: "2 giờ trước" },
  { type: "i", title: "FCM token hết hạn 14 thiết bị", subtitle: "Hệ thống tự làm mới", time: "Hôm qua" },
];

export const INITIAL_OFFBOARDING_QUEUE: [string, string, string][] = [
  ["Nguyễn Văn Bình", "KD", "Làm việc cuối 30/09 · HR đã chốt"],
  ["Trịnh Thu Hiền", "KT", "Hợp đồng không tái ký"],
  ["Lâm Quốc Đạt", "IT", "Hợp đồng Contractor kết thúc"],
];

export const TODAY = "2026-10-04";

export const INITIAL_DELEGATIONS: DelegationItem[] = [
  { delegator: "Phạm Đức Anh", delegatee: "Võ Khánh Linh", feature: "Duyệt nghỉ phép", startDate: "2026-10-01", endDate: "2026-10-08" },
  { delegator: "Võ Khánh Linh", delegatee: "Bùi Thanh Tâm", feature: "Duyệt WFH", startDate: "2026-10-12", endDate: "2026-10-16" },
  { delegator: "Bùi Thanh Tâm", delegatee: "Phạm Đức Anh", feature: "Duyệt expense claim", startDate: "2026-09-10", endDate: "2026-09-20" },
];

export const INITIAL_APPROVAL_RULES: ApprovalRuleItem[] = [
  { feature: "Duyệt nghỉ phép", field: "Số ngày nghỉ", operator: "≤", val: 5, approverRole: "Team Lead", overflowRule: "Vượt ngưỡng: thêm HR Chi nhánh duyệt", active: 1 },
  { feature: "Expense claim", field: "Giá trị (triệu đồng)", operator: "≤", val: 2, approverRole: "Team Lead", overflowRule: "Vượt ngưỡng: Team Lead → HR Chi nhánh → HR Tổng", active: 1 },
  { feature: "Duyệt WFH", field: "Số ngày WFH mỗi tuần", operator: "≤", val: 2, approverRole: "Team Lead", overflowRule: "Vượt chính sách: cần HR Chi nhánh", active: 1 },
  { feature: "Offboarding", field: "Loại hợp đồng", operator: "=", val: "Contractor", approverRole: "HR Chi nhánh", overflowRule: "Bỏ qua bước Team Lead duyệt đơn nghỉ việc", active: 1 },
];

export const INITIAL_PENDING_DUAL_APPROVALS: [string, string, number][] = [
  ["Gán template HR Tổng cho Đặng Gia Linh", "Admin Lê Hạnh", 0],
  ["Cấp quyền xuất dải lương cho HR C&B", "Admin Lê Hạnh", 0],
  ["Cập nhật quyền Đồng bộ MISA cho Võ Hoàng Nam", "Bạn", 1],
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { cat: "Bảo mật", type: "w", title: "3 thư gửi ra ngoài bị giữ do chống rò rỉ dữ liệu", time: "30 phút trước", processed: 0 },
  { cat: "Bảo mật", type: "e", title: "Đăng nhập thất bại 6 lần liên tiếp: linh.vk@ohriise.vn", time: "10 phút trước", processed: 0 },
  { cat: "Tích hợp", type: "w", title: "Kiosk HN-CG mất kết nối từ 07:15", time: "2 giờ trước", processed: 0 },
  { cat: "Yêu cầu quyền", type: "i", title: "Đề xuất cấp quyền xuất dải lương cho HR C&B", time: "3 giờ trước", processed: 0 },
  { cat: "Offboarding", type: "i", title: "3 tài khoản cần khóa sau khi HR chốt nghỉ việc", time: "Hôm qua", processed: 0 },
  { cat: "Lưu trữ", type: "w", title: "Dung lượng đạt 82%", time: "Hôm qua", processed: 1 },
  { cat: "AI", type: "i", title: "Đã tự xóa 1.204 screenshot quá 30 ngày", time: "2 ngày trước", processed: 1 },
];

export const MASTER_DATA_HEADERS = [
  ["Ca làm việc", "Giờ", "Quy tắc", "Áp dụng"],
  ["Mẫu hợp đồng", "Thời hạn", "Áp dụng", "Trạng thái"],
  ["Chức danh", "Cấp bậc", "Dải lương (triệu đồng)", "Phòng ban"],
  ["Loại phép", "Quỹ phép", "Áp dụng", "Trạng thái"],
];

export const INITIAL_MASTER_DATA = [
  [
    ["Hành chính", "08:30–17:30", "Nghỉ trưa 12:00–13:00", "Fulltime"],
    ["Flexible", "Đủ 8 giờ/ngày", "Giờ lõi 10:00–15:00", "Fulltime, Part-time"],
    ["On-call đêm", "22:00–06:00", "Phụ cấp 1,5×", "IT"],
  ],
  [
    ["Thử việc Fulltime", "2 tháng", "Fulltime", "Đang dùng"],
    ["Chính thức Fulltime", "12 tháng", "Fulltime", "Đang dùng"],
    ["Bán thời gian", "Theo tháng", "Part-time", "Đang dùng"],
    ["Dịch vụ/khoán", "Theo dự án", "Contractor", "Đang dùng"],
    ["Thực tập", "2–3 tháng", "Intern", "Đang dùng"],
  ],
  [
    ["Backend Developer", "Junior–Senior", "12–45", "IT"],
    ["Kế toán tổng hợp", "Chuyên viên", "10–22", "Kế toán – Tài chính"],
    ["Sales Executive", "Chuyên viên", "9–25 + hoa hồng", "Kinh doanh"],
    ["CS Agent", "Nhân viên", "8–14", "CSKH"],
  ],
  [
    ["Phép năm", "12 ngày/năm", "Fulltime, Part-time", "Đang dùng"],
    ["Phép ốm", "30 ngày/năm", "Fulltime", "Đang dùng"],
    ["Phép bù OT", "Theo OT được xác nhận", "Fulltime, Part-time", "Đang dùng"],
    ["Nghỉ không lương", "Không giới hạn", "Mọi loại hình", "Đang dùng"],
  ],
];

export const INITIAL_SESSIONS: SessionItem[] = [
  { user: "Nguyễn Thu Hà", device: "Chrome · Windows", ip: "10.0.4.21 (VPN)", time: "08:02 hôm nay", status: "Đang hoạt động" },
  { user: "Võ Khánh Linh", device: "Safari · iPhone", ip: "113.161.x.x", time: "07:58 hôm nay", status: "Thất bại ×6" },
  { user: "Trần Minh Quân", device: "Chrome · macOS", ip: "10.0.4.35", time: "07:55 hôm nay", status: "Đang hoạt động" },
  { user: "Bùi Thanh Tâm", device: "App Android", ip: "27.69.x.x", time: "Hôm qua 18:40", status: "Đã đăng xuất" },
];
