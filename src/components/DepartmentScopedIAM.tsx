import React, { useState } from "react";
import { Icon, Status } from "./UI";

// ============================================================================
// TYPES & INTERFACES (ENTERPRISE IAM & SCOPED RBAC)
// ============================================================================

export type ScopedRoleType = "Dept Head" | "Line Manager" | "Reviewer" | "Member";
export type AppointmentType = "primary" | "concurrent";
export type AccessStatus = "active" | "scheduled_revocation" | "revoked" | "locked";

export interface NuclearPermission {
  id: string;
  name: string;
  category: "Approval" | "View" | "Manage" | "Export";
  description: string;
}

export interface DepartmentNode {
  id: string;
  code: string;
  name: string;
  type: "division" | "department" | "project" | "squad";
  costCenter: string;
  headName: string;
  parentPath: string;
  totalMembers: number;
  primaryCount: number;
  concurrentCount: number;
  children?: DepartmentNode[];
}

export interface DepartmentMemberAccess {
  id: string;
  empCode: string;
  fullName: string;
  email: string;
  avatarInitials: string;
  avatarColor: string;
  appointmentType: AppointmentType;
  allocationPercentage: number; // e.g. 70% or 30%
  jobTitleInUnit: string;
  scopedRoles: ScopedRoleType[];
  granularPermissions: string[];
  effectiveFrom: string;
  effectiveTo: string | "indefinite"; // e.g. "30/10/2026" or "indefinite"
  daysRemaining?: number; // < 7 triggers warning
  status: AccessStatus;
  statusLabel: string;
  pendingApprovalsCount: {
    leaveRequests: number;
    recruitmentRequisitions: number;
    expenseClaims: number;
  };
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  actionType: "REVOKE_INSTANT" | "REVOKE_SCHEDULED" | "TRANSFER_HANDOVER" | "GRANT_ACCESS" | "UPDATE_ROLE";
  actionBadge: string;
  targetEmployee: string;
  targetUnit: string;
  details: string;
  delegatedTo?: string;
  reason: string;
}

// ============================================================================
// MOCK DATA: ORG TREE (KHỐI -> PHÒNG BAN -> DỰ ÁN -> SQUAD)
// ============================================================================

const INITIAL_ORG_TREE: DepartmentNode[] = [
  {
    id: "div-tech",
    code: "DIV-TECH",
    name: "Khối Công nghệ & Sản phẩm (Tech & Product Division)",
    type: "division",
    costCenter: "CC-TECH-001",
    headName: "Trần Hoàng Nam (VP of Tech)",
    parentPath: "Tập đoàn oHRiise",
    totalMembers: 68,
    primaryCount: 52,
    concurrentCount: 16,
    children: [
      {
        id: "dept-engineering",
        code: "DEP-ENG",
        name: "Phòng Kỹ thuật & Hạ tầng (Engineering)",
        type: "department",
        costCenter: "CC-TECH-804",
        headName: "Nguyễn Minh Tuấn (Engineering Director)",
        parentPath: "Khối Công nghệ > Phòng Kỹ thuật",
        totalMembers: 24,
        primaryCount: 18,
        concurrentCount: 6,
        children: [
          {
            id: "proj-core-platform",
            code: "PRJ-CORE",
            name: "Ban Dự án Core Platform 2.0",
            type: "project",
            costCenter: "CC-PRJ-201",
            headName: "Lê Văn Hùng (Tech Lead)",
            parentPath: "Phòng Kỹ thuật > Ban Dự án Core Platform",
            totalMembers: 11,
            primaryCount: 8,
            concurrentCount: 3,
          },
          {
            id: "sqd-mobile-sdk",
            code: "SQD-MBL",
            name: "Nhóm Chức năng Mobile & Security Squad",
            type: "squad",
            costCenter: "CC-SQD-102",
            headName: "Hoàng Minh Tuấn (Squad Lead)",
            parentPath: "Phòng Kỹ thuật > Nhóm Mobile Squad",
            totalMembers: 7,
            primaryCount: 5,
            concurrentCount: 2,
          },
        ],
      },
      {
        id: "dept-product",
        code: "DEP-PROD",
        name: "Phòng Phát triển Sản phẩm (Product Development)",
        type: "department",
        costCenter: "CC-PROD-501",
        headName: "Phạm Quỳnh Chi (Head of Product)",
        parentPath: "Khối Công nghệ > Phòng Sản phẩm",
        totalMembers: 19,
        primaryCount: 15,
        concurrentCount: 4,
      },
      {
        id: "dept-data-ai",
        code: "DEP-DATA",
        name: "Phòng Dữ liệu & Trí tuệ Nhân tạo (Data & AI)",
        type: "department",
        costCenter: "CC-DATA-302",
        headName: "Đỗ Thu Hà (Data Principal)",
        parentPath: "Khối Công nghệ > Phòng Data & AI",
        totalMembers: 14,
        primaryCount: 11,
        concurrentCount: 3,
      },
    ],
  },
  {
    id: "div-people",
    code: "DIV-PEOPLE",
    name: "Khối Quản trị Nhân sự & Vận hành (People & Culture)",
    type: "division",
    costCenter: "CC-HR-002",
    headName: "Lê Thu Thủy (Chief People Officer)",
    parentPath: "Tập đoàn oHRiise",
    totalMembers: 22,
    primaryCount: 19,
    concurrentCount: 3,
    children: [
      {
        id: "dept-hr-ops",
        code: "DEP-HR-OPS",
        name: "Phòng Nhân sự & Tiền lương (HR & Payroll Ops)",
        type: "department",
        costCenter: "CC-HR-101",
        headName: "Nguyễn Minh Anh (HR Ops Lead)",
        parentPath: "Khối Nhân sự > Phòng Nhân sự & Payroll",
        totalMembers: 12,
        primaryCount: 10,
        concurrentCount: 2,
      },
    ],
  },
  {
    id: "div-growth",
    code: "DIV-GROWTH",
    name: "Khối Kinh doanh & Tiếp thị (Revenue & Growth)",
    type: "division",
    costCenter: "CC-SALES-003",
    headName: "Vũ Hải Đăng (Chief Revenue Officer)",
    parentPath: "Tập đoàn oHRiise",
    totalMembers: 35,
    primaryCount: 30,
    concurrentCount: 5,
  },
];

// ============================================================================
// MOCK DATA: MEMBERS AT "PHÒNG KỸ THUẬT & HẠ TẦNG (DEP-ENG)"
// ============================================================================

const INITIAL_MEMBERS: DepartmentMemberAccess[] = [
  {
    id: "mem-1",
    empCode: "EMP-2022-004",
    fullName: "Trần Hoàng Nam",
    email: "hoangnam.tran@ohriise.vn",
    avatarInitials: "HN",
    avatarColor: "#16a34a",
    appointmentType: "primary",
    allocationPercentage: 100,
    jobTitleInUnit: "VP of Engineering & Head of Tech",
    scopedRoles: ["Dept Head", "Line Manager"],
    granularPermissions: [
      "Duyệt nghỉ phép toàn phòng",
      "Đánh giá & Khóa sổ KPI quý",
      "Ký duyệt đề xuất ngân sách & tuyển dụng",
      "Xem bảng công & phiếu lương toàn bộ nhân viên",
      "Cấp phát & Phân bổ quyền đơn vị",
    ],
    effectiveFrom: "10/02/2022",
    effectiveTo: "indefinite",
    status: "active",
    statusLabel: "Đang hoạt động",
    pendingApprovalsCount: {
      leaveRequests: 5,
      recruitmentRequisitions: 2,
      expenseClaims: 3,
    },
  },
  {
    id: "mem-2",
    empCode: "EMP-2026-089",
    fullName: "Nguyễn Minh Anh",
    email: "minhanh.nguyen@ohriise.vn",
    avatarInitials: "MA",
    avatarColor: "#0284c7",
    appointmentType: "concurrent",
    allocationPercentage: 30,
    jobTitleInUnit: "Design System Lead Consultant",
    scopedRoles: ["Reviewer", "Line Manager"],
    granularPermissions: [
      "Thẩm định mã nguồn UI component",
      "Duyệt đề xuất thiết bị đồ họa",
      "Duyệt phép nhóm UI Dev (3 nhân sự)",
    ],
    effectiveFrom: "01/02/2025",
    effectiveTo: "04/10/2026",
    daysRemaining: 5,
    status: "active",
    statusLabel: "Sắp hết hạn quyền (5 ngày)",
    pendingApprovalsCount: {
      leaveRequests: 2,
      recruitmentRequisitions: 0,
      expenseClaims: 1,
    },
  },
  {
    id: "mem-3",
    empCode: "EMP-2023-019",
    fullName: "Lê Văn Hùng",
    email: "hung.le@ohriise.vn",
    avatarInitials: "VH",
    avatarColor: "#0891b2",
    appointmentType: "primary",
    allocationPercentage: 100,
    jobTitleInUnit: "Staff Backend Architect",
    scopedRoles: ["Line Manager"],
    granularPermissions: [
      "Duyệt nghỉ phép & Timesheet Squad Backend",
      "Duyệt chi phí hạ tầng Cloud AWS",
      "Đánh giá KPI kỹ sư Backend",
    ],
    effectiveFrom: "15/03/2023",
    effectiveTo: "indefinite",
    status: "active",
    statusLabel: "Đang hoạt động",
    pendingApprovalsCount: {
      leaveRequests: 3,
      recruitmentRequisitions: 1,
      expenseClaims: 0,
    },
  },
  {
    id: "mem-4",
    empCode: "EMP-2024-055",
    fullName: "Vũ Hải Nam",
    email: "nam.vu@ohriise.vn",
    avatarInitials: "HN",
    avatarColor: "#d97706",
    appointmentType: "primary",
    allocationPercentage: 100,
    jobTitleInUnit: "Lead QA Automation Engineer",
    scopedRoles: ["Reviewer", "Member"],
    granularPermissions: [
      "Ký duyệt Test Coverage & Release Gate",
      "Xem báo cáo kiểm thử bảo mật",
    ],
    effectiveFrom: "01/06/2024",
    effectiveTo: "15/10/2026",
    daysRemaining: 16,
    status: "active",
    statusLabel: "Đang hoạt động",
    pendingApprovalsCount: {
      leaveRequests: 0,
      recruitmentRequisitions: 0,
      expenseClaims: 0,
    },
  },
  {
    id: "mem-5",
    empCode: "EMP-2025-072",
    fullName: "Hoàng Minh Tuấn",
    email: "tuan.hoang@ohriise.vn",
    avatarInitials: "MT",
    avatarColor: "#8b5cf6",
    appointmentType: "concurrent",
    allocationPercentage: 40,
    jobTitleInUnit: "Security & IAM Compliance Auditor",
    scopedRoles: ["Reviewer"],
    granularPermissions: [
      "Xem nhật ký truy cập hệ thống (Audit Log)",
      "Thẩm định quyền hạn đặc quyền (PAM Review)",
    ],
    effectiveFrom: "01/01/2025",
    effectiveTo: "31/10/2026",
    status: "scheduled_revocation",
    statusLabel: "Đã lên lịch thu hồi (31/10)",
    pendingApprovalsCount: {
      leaveRequests: 0,
      recruitmentRequisitions: 0,
      expenseClaims: 0,
    },
  },
  {
    id: "mem-6",
    empCode: "EMP-2024-098",
    fullName: "Phạm Thảo My",
    email: "thaomy.pham@ohriise.vn",
    avatarInitials: "TM",
    avatarColor: "#ec4899",
    appointmentType: "primary",
    allocationPercentage: 100,
    jobTitleInUnit: "Senior DevOps & SRE Engineer",
    scopedRoles: ["Member"],
    granularPermissions: [
      "Thực thi Deployment Kubernetes Pipeline",
      "Xem nhật ký giám sát Grafana",
    ],
    effectiveFrom: "18/08/2024",
    effectiveTo: "indefinite",
    status: "active",
    statusLabel: "Đang hoạt động",
    pendingApprovalsCount: {
      leaveRequests: 0,
      recruitmentRequisitions: 0,
      expenseClaims: 0,
    },
  },
  {
    id: "mem-7",
    empCode: "EMP-2023-088",
    fullName: "Đinh Quốc Bảo",
    email: "bao.dinh@ohriise.vn",
    avatarInitials: "QB",
    avatarColor: "#64748b",
    appointmentType: "concurrent",
    allocationPercentage: 25,
    jobTitleInUnit: "Database Optimization Advisor",
    scopedRoles: ["Member"],
    granularPermissions: ["Xem sơ đồ cơ sở dữ liệu và truy vấn chậm"],
    effectiveFrom: "01/03/2024",
    effectiveTo: "30/09/2026",
    daysRemaining: 1,
    status: "locked",
    statusLabel: "Đã khóa quyền tạm thời",
    pendingApprovalsCount: {
      leaveRequests: 0,
      recruitmentRequisitions: 0,
      expenseClaims: 0,
    },
  },
];

// ============================================================================
// AUDIT LOG INITIAL MOCK
// ============================================================================

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-101",
    timestamp: "29/09/2026 - 15:40",
    actor: "Admin HR (Nguyễn Minh Anh)",
    actionType: "GRANT_ACCESS",
    actionBadge: "CẤP QUYỀN KIÊM NHIỆM",
    targetEmployee: "Hoàng Minh Tuấn (EMP-2025-072)",
    targetUnit: "Phòng Kỹ thuật & Hạ tầng",
    details: "Bổ nhiệm kiêm nhiệm 40% vị trí Security & IAM Auditor. Vai trò: Reviewer.",
    reason: "Thực hiện rà soát an ninh định kỳ Q4/2026.",
  },
  {
    id: "log-102",
    timestamp: "25/09/2026 - 10:15",
    actor: "Admin HR (Lê Thu Thủy)",
    actionType: "REVOKE_INSTANT",
    actionBadge: "THU HỒI QUYỀN NGAY",
    targetEmployee: "Đặng Bích Ngọc (EMP-2023-044)",
    targetUnit: "Phòng Kỹ thuật & Hạ tầng",
    details: "Thu hồi toàn bộ quyền Line Manager & Reviewer. Bàn giao 4 đơn nghỉ phép sang Trần Hoàng Nam.",
    delegatedTo: "Trần Hoàng Nam (EMP-2022-004)",
    reason: "Điều chuyển nhân sự sang Ban Dự án ERP Quốc tế.",
  },
  {
    id: "log-103",
    timestamp: "18/09/2026 - 09:30",
    actor: "System Scheduler (Auto)",
    actionType: "REVOKE_SCHEDULED",
    actionBadge: "KẾT THÚC KIÊM NHIỆM",
    targetEmployee: "Lý Minh Triết (EMP-2024-012)",
    targetUnit: "Ban Dự án Core Platform",
    details: "Hết hạn kiêm nhiệm 6 tháng. Đã tự động đóng vai trò Reviewer.",
    reason: "Dự án hoàn thành đúng tiến độ cam kết.",
  },
];

export default function DepartmentScopedIAM() {
  const [orgTree] = useState<DepartmentNode[]>(INITIAL_ORG_TREE);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("dept-engineering");
  const [treeSearchQuery, setTreeSearchQuery] = useState("");
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    "div-tech": true,
    "dept-engineering": true,
    "div-people": true,
  });

  // Members state
  const [members, setMembers] = useState<DepartmentMemberAccess[]>(INITIAL_MEMBERS);
  const [filterType, setFilterType] = useState<"all" | "primary" | "concurrent" | "manager" | "expiring">("all");
  const [memberSearchQuery, setMemberSearchQuery] = useState("");

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState(false);

  // Active Selected Member for Modals
  const [selectedMember, setSelectedMember] = useState<DepartmentMemberAccess | null>(null);

  // Modals state
  const [isInstantRevokeOpen, setIsInstantRevokeOpen] = useState(false);
  const [isScheduledRevokeOpen, setIsScheduledRevokeOpen] = useState(false);
  const [isTransferHandoverOpen, setIsTransferHandoverOpen] = useState(false);
  const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);

  // Hover Tooltip state
  const [hoveredPermissions, setHoveredPermissions] = useState<{ x: number; y: number; list: string[]; name: string } | null>(null);

  // Instant Revoke Form State
  const [revokeHandoverChoice, setRevokeHandoverChoice] = useState<"delegate" | "escalate">("delegate");
  const [revokeDelegateeId, setRevokeDelegateeId] = useState<string>("mem-1");
  const [revokeReason, setRevokeReason] = useState("Điều chuyển công tác nội bộ");
  const [revokeNote, setRevokeNote] = useState("");
  const [revokeConfirmChecked, setRevokeConfirmChecked] = useState(false);

  // Scheduled Revoke Form State
  const [schedEndDate, setSchedEndDate] = useState("2026-10-31");
  const [schedEndTime, setSchedEndTime] = useState("23:59:59");
  const [schedNotifyEmail, setSchedNotifyEmail] = useState(true);
  const [schedReason, setSchedReason] = useState("Kết thúc đợt kiêm nhiệm dự án theo kế hoạch");

  // Transfer Handover Form State
  const [transferDestDept, setTransferDestDept] = useState("Phòng Phát triển Sản phẩm (Product Development)");
  const [transferEffectiveDate, setTransferEffectiveDate] = useState("2026-10-01");
  const [transferRevokeSourceRoles, setTransferRevokeSourceRoles] = useState(true);
  const [transferDelegateApprovals, setTransferDelegateApprovals] = useState(true);
  const [transferDelegateeId, setTransferDelegateeId] = useState("mem-3");

  // Add Member / Grant Access Form State
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberCode, setNewMemberCode] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberType, setNewMemberType] = useState<AppointmentType>("concurrent");
  const [newMemberAllocation, setNewMemberAllocation] = useState(30);
  const [newMemberJobTitle, setNewMemberJobTitle] = useState("Senior Specialist Advisor");
  const [newMemberRole, setNewMemberRole] = useState<ScopedRoleType>("Reviewer");
  const [newMemberExpiry, setNewMemberExpiry] = useState("2026-12-31");

  // Current Selected Node
  const findNode = (nodes: DepartmentNode[], id: string): DepartmentNode | null => {
    for (const n of nodes) {
      if (n.id === id) return n;
      if (n.children) {
        const found = findNode(n.children, id);
        if (found) return found;
      }
    }
    return null;
  };
  const activeNode = findNode(orgTree, selectedNodeId) || orgTree[0].children![0];

  // Filtered members calculation
  const filteredMembers = members.filter((m) => {
    if (filterType === "primary" && m.appointmentType !== "primary") return false;
    if (filterType === "concurrent" && m.appointmentType !== "concurrent") return false;
    if (filterType === "manager" && !m.scopedRoles.some((r) => r === "Dept Head" || r === "Line Manager")) return false;
    if (filterType === "expiring" && (!m.daysRemaining || m.daysRemaining > 7)) return false;

    if (memberSearchQuery.trim()) {
      const q = memberSearchQuery.toLowerCase();
      return (
        m.fullName.toLowerCase().includes(q) ||
        m.empCode.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.jobTitleInUnit.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // KPI counts
  const totalCount = members.length;
  const primaryCount = members.filter((m) => m.appointmentType === "primary").length;
  const concurrentCount = members.filter((m) => m.appointmentType === "concurrent").length;
  const managerCount = members.filter((m) => m.scopedRoles.includes("Dept Head") || m.scopedRoles.includes("Line Manager")).length;
  const expiringCount = members.filter((m) => m.daysRemaining && m.daysRemaining <= 7).length;

  // Toggle Org Node Expand
  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ==========================================================================
  // HANDLERS: REVOCATION WORKFLOWS
  // ==========================================================================

  // Kịch bản A: Thu hồi quyền ngay lập tức (Instant Revoke)
  const handleConfirmInstantRevoke = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || !revokeConfirmChecked) return;

    const delegatee = members.find((m) => m.id === revokeDelegateeId);
    const updated = members.map((m) =>
      m.id === selectedMember.id
        ? {
            ...m,
            status: "revoked" as AccessStatus,
            statusLabel: "Đã thu hồi quyền",
            scopedRoles: ["Member" as ScopedRoleType],
            granularPermissions: [],
            pendingApprovalsCount: { leaveRequests: 0, recruitmentRequisitions: 0, expenseClaims: 0 },
          }
        : m
    );

    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString("vi-VN"),
      actor: "Admin HR (Nguyễn Minh Anh)",
      actionType: "REVOKE_INSTANT",
      actionBadge: "THU HỒI QUYỀN NGAY LẬP TỨC",
      targetEmployee: `${selectedMember.fullName} (${selectedMember.empCode})`,
      targetUnit: activeNode.name,
      details: `Thu hồi toàn bộ vai trò [${selectedMember.scopedRoles.join(", ")}]. ${
        revokeHandoverChoice === "delegate" && delegatee
          ? `Bàn giao ${selectedMember.pendingApprovalsCount.leaveRequests + selectedMember.pendingApprovalsCount.recruitmentRequisitions + selectedMember.pendingApprovalsCount.expenseClaims} đơn chờ duyệt sang ${delegatee.fullName}.`
          : "Escalate đơn chờ duyệt lên Giám đốc khối."
      }`,
      delegatedTo: revokeHandoverChoice === "delegate" ? delegatee?.fullName : "Trần Hoàng Nam (VP of Tech)",
      reason: `${revokeReason}${revokeNote ? ` - Ghi chú: ${revokeNote}` : ""}`,
    };

    setMembers(updated);
    setAuditLogs([newLog, ...auditLogs]);
    setIsInstantRevokeOpen(false);
    setSelectedMember(null);
    setRevokeConfirmChecked(false);
    alert(`ĐÃ THU HỒI QUYỀN AN TOÀN!\nToàn bộ quyền hạn và đơn từ chờ duyệt của ${selectedMember.fullName} đã được xử lý và ghi nhận vào Audit Log.`);
  };

  // Kịch bản B: Lên lịch thu hồi quyền (Scheduled Revoke)
  const handleConfirmScheduledRevoke = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    const updated = members.map((m) =>
      m.id === selectedMember.id
        ? {
            ...m,
            effectiveTo: new Date(schedEndDate).toLocaleDateString("vi-VN"),
            status: "scheduled_revocation" as AccessStatus,
            statusLabel: `Đã lên lịch thu hồi (${new Date(schedEndDate).toLocaleDateString("vi-VN")})`,
          }
        : m
    );

    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString("vi-VN"),
      actor: "Admin HR (Nguyễn Minh Anh)",
      actionType: "REVOKE_SCHEDULED",
      actionBadge: "LÊN LỊCH THU HỒI QUYỀN",
      targetEmployee: `${selectedMember.fullName} (${selectedMember.empCode})`,
      targetUnit: activeNode.name,
      details: `Thiết lập ngày kết thúc quyền hạn vào ${schedEndDate} lúc ${schedEndTime}. Tự động gửi email cảnh báo trước 3 ngày: ${schedNotifyEmail ? "BẬT" : "TẮT"}.`,
      reason: schedReason,
    };

    setMembers(updated);
    setAuditLogs([newLog, ...auditLogs]);
    setIsScheduledRevokeOpen(false);
    setSelectedMember(null);
    alert(`ĐÃ LÊN LỊCH THU HỒI THÀNH CÔNG!\nQuyền của ${selectedMember.fullName} sẽ tự động đóng vào 23:59 ngày ${schedEndDate}.`);
  };

  // Kịch bản C: Điều chuyển công tác & Bàn giao quyền (Transfer Handover)
  const handleConfirmTransferHandover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    const delegatee = members.find((m) => m.id === transferDelegateeId);
    const updated = members.map((m) =>
      m.id === selectedMember.id
        ? {
            ...m,
            status: "revoked" as AccessStatus,
            statusLabel: `Đã điều chuyển sang ${transferDestDept.split("(")[0]}`,
            scopedRoles: ["Member" as ScopedRoleType],
            granularPermissions: [],
            pendingApprovalsCount: { leaveRequests: 0, recruitmentRequisitions: 0, expenseClaims: 0 },
          }
        : m
    );

    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString("vi-VN"),
      actor: "Admin HR (Nguyễn Minh Anh)",
      actionType: "TRANSFER_HANDOVER",
      actionBadge: "ĐIỀU CHUYỂN & BÀN GIAO QUYỀN",
      targetEmployee: `${selectedMember.fullName} (${selectedMember.empCode})`,
      targetUnit: activeNode.name,
      details: `Điều chuyển sang [${transferDestDept}] hiệu lực từ ${transferEffectiveDate}. ${
        transferRevokeSourceRoles ? "Tự động đóng quyền tại phòng cũ." : "Duy trì vai trò kiêm nhiệm."
      } ${transferDelegateApprovals && delegatee ? `Bàn giao quyền duyệt đơn cho ${delegatee.fullName}.` : ""}`,
      delegatedTo: delegatee?.fullName,
      reason: `Điều động nhân sự sang đơn vị mới theo quyết định chiến lược.`,
    };

    setMembers(updated);
    setAuditLogs([newLog, ...auditLogs]);
    setIsTransferHandoverOpen(false);
    setSelectedMember(null);
    alert(`ĐÃ HOÀN TẤT ĐIỀU CHUYỂN & BÀN GIAO!\nNhân sự ${selectedMember.fullName} đã được bàn giao toàn diện sang đơn vị mới.`);
  };

  // Cấp quyền mới vào đơn vị
  const handleGrantAccess = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: DepartmentMemberAccess = {
      id: `mem-${Date.now()}`,
      empCode: newMemberCode || `EMP-2026-${Math.floor(100 + Math.random() * 900)}`,
      fullName: newMemberName,
      email: newMemberEmail || `${newMemberName.toLowerCase().replace(/\s+/g, "")}@ohriise.vn`,
      avatarInitials: newMemberName
        .split(" ")
        .slice(-2)
        .map((w) => w[0])
        .join("")
        .toUpperCase(),
      avatarColor: "#0284c7",
      appointmentType: newMemberType,
      allocationPercentage: Number(newMemberAllocation),
      jobTitleInUnit: newMemberJobTitle,
      scopedRoles: [newMemberRole],
      granularPermissions: ["Xem bảng công & lịch trực", "Duyệt đề xuất chuyên môn"],
      effectiveFrom: new Date().toLocaleDateString("vi-VN"),
      effectiveTo: newMemberExpiry ? new Date(newMemberExpiry).toLocaleDateString("vi-VN") : "indefinite",
      status: "active",
      statusLabel: "Đang hoạt động",
      pendingApprovalsCount: { leaveRequests: 0, recruitmentRequisitions: 0, expenseClaims: 0 },
    };

    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString("vi-VN"),
      actor: "Admin HR (Nguyễn Minh Anh)",
      actionType: "GRANT_ACCESS",
      actionBadge: "CẤP PHÁT QUYỀN MỚI",
      targetEmployee: `${newMember.fullName} (${newMember.empCode})`,
      targetUnit: activeNode.name,
      details: `Gán quyền bổ nhiệm [${newMemberType === "primary" ? "Chính" : "Kiêm nhiệm"}] với vai trò [${newMemberRole}] (${newMemberAllocation}% phân bổ).`,
      reason: "Bổ sung nhân sự vào đơn vị theo phê duyệt nhân sự.",
    };

    setMembers([newMember, ...members]);
    setAuditLogs([newLog, ...auditLogs]);
    setIsGrantModalOpen(false);
    setNewMemberName("");
    alert(`Đã thêm nhân sự "${newMember.fullName}" và gán quyền tại "${activeNode.name}" thành công!`);
  };

  // Helper Badge Color
  const getRoleBadgeStyle = (role: ScopedRoleType) => {
    switch (role) {
      case "Dept Head":
        return { bg: "#312e81", text: "#e0e7ff", border: "#4338ca", icon: "👑" };
      case "Line Manager":
        return { bg: "#083344", text: "#cffafe", border: "#0e7490", icon: "🎯" };
      case "Reviewer":
        return { bg: "#422006", text: "#fef08a", border: "#a16207", icon: "🔍" };
      default:
        return { bg: "#1e293b", text: "#f1f5f9", border: "#475569", icon: "👤" };
    }
  };

  return (
    <div
      className="department-iam-container"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "100%",
        maxWidth: "1600px",
        margin: "0 auto",
      }}
    >
      {/* ===================================================================== */}
      {/* 1. SPLIT-VIEW 2 CỘT ENTERPRISE (25% ORG TREE - 75% SCOPED IAM TABLE) */}
      {/* ===================================================================== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* ----------------------------------------------------------------- */}
        {/* CỘT TRÁI (25% WIDTH): CÂY SƠ ĐỒ ĐƠN VỊ TỔ CHỨC (ORG TREE) */}
        {/* ----------------------------------------------------------------- */}
        <aside
          className="panel"
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "24px 20px",
            border: "1px solid var(--border-soft)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            position: "sticky",
            top: "80px",
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
          }}
        >
          {/* Header Org Tree */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 900, color: "var(--text-sub)", letterSpacing: "0.8px" }}>
                ORGANIZATION IAM TREE
              </span>
              <h3 style={{ fontSize: "18px", fontWeight: 900, color: "var(--text-main)", margin: "2px 0 0 0" }}>
                Sơ đồ Cây Đơn vị
              </h3>
            </div>
            <span
              style={{
                background: "#f1f5f9",
                color: "#334155",
                padding: "3px 8px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 800,
              }}
            >
              3 Khối
            </span>
          </div>

          {/* Search tree */}
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Tìm nhanh phòng ban, squad..."
              value={treeSearchQuery}
              onChange={(e) => setTreeSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px 10px 36px",
                borderRadius: "12px",
                border: "1px solid var(--border-soft)",
                fontSize: "13px",
                fontWeight: 600,
                background: "#f8fafc",
              }}
            />
            <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-sub)" }}>
              <Icon name="search" size={15} />
            </div>
          </div>

          {/* Org Tree Nodes List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {orgTree.map((division) => {
              const isDivExpanded = expandedNodes[division.id];
              const isDivSelected = selectedNodeId === division.id;

              return (
                <div key={division.id} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {/* Division Node */}
                  <div
                    onClick={() => setSelectedNodeId(division.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 12px",
                      borderRadius: "12px",
                      background: isDivSelected ? "#eff6ff" : "transparent",
                      border: isDivSelected ? "1.5px solid #3b82f6" : "1px solid transparent",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: 0 }}>
                      <button
                        onClick={(e) => toggleExpand(division.id, e)}
                        style={{
                          background: "none",
                          border: "none",
                          padding: "2px",
                          cursor: "pointer",
                          color: "var(--text-sub)",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ transform: isDivExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s" }}>
                          ▶
                        </span>
                      </button>
                      <span style={{ fontSize: "16px" }}>🏛️</span>
                      <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        <b style={{ fontSize: "13px", color: isDivSelected ? "#1e40af" : "var(--text-main)", display: "block" }}>
                          {division.name.split("(")[0]}
                        </b>
                        <small style={{ fontSize: "11px", color: "var(--text-sub)", fontWeight: 600 }}>
                          {division.totalMembers} NS ({division.primaryCount} chính, {division.concurrentCount} kiêm)
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* Departments (Children Level 1) */}
                  {isDivExpanded && division.children && (
                    <div style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px", borderLeft: "2px dashed #e2e8f0", marginLeft: "14px" }}>
                      {division.children.map((dept) => {
                        const isDeptSelected = selectedNodeId === dept.id;
                        const isDeptExpanded = expandedNodes[dept.id];

                        return (
                          <div key={dept.id} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                            <div
                              onClick={() => setSelectedNodeId(dept.id)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "8px 10px",
                                borderRadius: "10px",
                                background: isDeptSelected ? "#1e40af" : "#f8fafc",
                                color: isDeptSelected ? "white" : "var(--text-main)",
                                cursor: "pointer",
                                transition: "all 0.15s ease",
                                border: isDeptSelected ? "1px solid #1e40af" : "1px solid var(--border-soft)",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1, minWidth: 0 }}>
                                {dept.children ? (
                                  <button
                                    onClick={(e) => toggleExpand(dept.id, e)}
                                    style={{
                                      background: "none",
                                      border: "none",
                                      padding: "1px",
                                      cursor: "pointer",
                                      color: isDeptSelected ? "white" : "var(--text-sub)",
                                      display: "flex",
                                    }}
                                  >
                                    <span style={{ transform: isDeptExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s", fontSize: "10px" }}>
                                      ▶
                                    </span>
                                  </button>
                                ) : (
                                  <span style={{ width: "12px" }} />
                                )}
                                <span style={{ fontSize: "14px" }}>📂</span>
                                <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  <b style={{ fontSize: "13px", display: "block" }}>{dept.name.split("(")[0]}</b>
                                  <small style={{ fontSize: "11px", opacity: 0.8, fontWeight: 600 }}>
                                    {dept.totalMembers} NS ({dept.primaryCount} chính, {dept.concurrentCount} kiêm)
                                  </small>
                                </div>
                              </div>
                            </div>

                            {/* Squads / Projects (Children Level 2) */}
                            {isDeptExpanded && dept.children && (
                              <div style={{ paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "3px", borderLeft: "2px dashed #cbd5e1", marginLeft: "10px" }}>
                                {dept.children.map((sub) => {
                                  const isSubSelected = selectedNodeId === sub.id;
                                  return (
                                    <div
                                      key={sub.id}
                                      onClick={() => setSelectedNodeId(sub.id)}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        padding: "6px 8px",
                                        borderRadius: "8px",
                                        background: isSubSelected ? "#eff6ff" : "transparent",
                                        color: isSubSelected ? "#1e40af" : "var(--text-main)",
                                        cursor: "pointer",
                                        fontWeight: isSubSelected ? 800 : 600,
                                        fontSize: "12px",
                                      }}
                                    >
                                      <span>{sub.type === "project" ? "🚀" : "⚡"}</span>
                                      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {sub.name}
                                      </span>
                                      <span style={{ fontSize: "11px", color: "var(--text-sub)", fontFamily: "monospace" }}>
                                        ({sub.totalMembers})
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* ----------------------------------------------------------------- */}
        {/* CỘT PHẢI (75% WIDTH): DANH SÁCH NHÂN SỰ & QUẢN LÝ QUYỀN TẠI ĐƠN VỊ */}
        {/* ----------------------------------------------------------------- */}
        <main style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Unit Header Card */}
          <section
            className="panel"
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "28px 32px",
              border: "1px solid var(--border-soft)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontSize: "12px", color: "var(--text-sub)", fontWeight: 700 }}>
                  {activeNode.parentPath}
                </span>
                <span style={{ color: "var(--text-sub)" }}>/</span>
                <span style={{ background: "#f1f5f9", color: "#334155", padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, fontFamily: "monospace" }}>
                  {activeNode.costCenter}
                </span>
              </div>

              <h2 style={{ fontSize: "24px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                {activeNode.name}
              </h2>

              <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: "var(--text-sub)", fontWeight: 600 }}>
                Trưởng đơn vị phụ trách: <b style={{ color: "#1e40af" }}>{activeNode.headName}</b> · Quản trị phân quyền theo phạm vi (Scoped IAM).
              </p>
            </div>

            {/* Top Action Buttons */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
              <button
                className="secondary"
                onClick={() => setIsAuditDrawerOpen(true)}
                style={{
                  padding: "10px 16px",
                  fontSize: "13px",
                  fontWeight: 800,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "white",
                  border: "1px solid var(--border-soft)",
                  cursor: "pointer",
                }}
              >
                <Icon name="clock" size={16} /> Lịch sử Cấp & Thu hồi (Audit Log)
              </button>

              <button
                className="primary"
                onClick={() => setIsGrantModalOpen(true)}
                style={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: 800,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
                  color: "white",
                  border: "none",
                  boxShadow: "0 4px 14px rgba(30, 64, 175, 0.35)",
                  cursor: "pointer",
                }}
              >
                <Icon name="plus" size={16} /> + Thêm Nhân sự & Gán Quyền
              </button>
            </div>
          </section>

          {/* Quick Filter KPI Chips Bar */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexWrap: "wrap",
              background: "white",
              padding: "12px 18px",
              borderRadius: "16px",
              border: "1px solid var(--border-soft)",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-sub)", marginRight: "4px" }}>
              Lọc danh sách:
            </span>

            <button
              onClick={() => setFilterType("all")}
              style={{
                padding: "6px 14px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                background: filterType === "all" ? "var(--brand)" : "#f8fafc",
                color: filterType === "all" ? "white" : "var(--text-main)",
                border: filterType === "all" ? "1px solid var(--brand)" : "1px solid var(--border-soft)",
              }}
            >
              Tất cả ({totalCount})
            </button>

            <button
              onClick={() => setFilterType("primary")}
              style={{
                padding: "6px 14px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                background: filterType === "primary" ? "#1e40af" : "#f8fafc",
                color: filterType === "primary" ? "white" : "#1e40af",
                border: filterType === "primary" ? "1px solid #1e40af" : "1px solid var(--border-soft)",
              }}
            >
              ⭐ Bổ nhiệm Chính ({primaryCount})
            </button>

            <button
              onClick={() => setFilterType("concurrent")}
              style={{
                padding: "6px 14px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                background: filterType === "concurrent" ? "#7c3aed" : "#f8fafc",
                color: filterType === "concurrent" ? "white" : "#7c3aed",
                border: filterType === "concurrent" ? "1px solid #7c3aed" : "1px solid var(--border-soft)",
              }}
            >
              ⚡ Kiêm nhiệm ({concurrentCount})
            </button>

            <button
              onClick={() => setFilterType("manager")}
              style={{
                padding: "6px 14px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                background: filterType === "manager" ? "#0f766e" : "#f8fafc",
                color: filterType === "manager" ? "white" : "#0f766e",
                border: filterType === "manager" ? "1px solid #0f766e" : "1px solid var(--border-soft)",
              }}
            >
              👑 Có quyền Quản lý / Duyệt ({managerCount})
            </button>

            {expiringCount > 0 && (
              <button
                onClick={() => setFilterType("expiring")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 800,
                  cursor: "pointer",
                  background: filterType === "expiring" ? "#b45309" : "#fffbeb",
                  color: filterType === "expiring" ? "white" : "#b45309",
                  border: "1px solid #fde68a",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>⚠️ Sắp hết hạn quyền</span>
                <span
                  style={{
                    background: filterType === "expiring" ? "rgba(255,255,255,0.3)" : "#fef3c7",
                    padding: "1px 6px",
                    borderRadius: "6px",
                    fontSize: "11px",
                  }}
                >
                  {expiringCount}
                </span>
              </button>
            )}

            {/* Member Search input */}
            <div style={{ marginLeft: "auto", position: "relative", minWidth: "240px" }}>
              <input
                type="text"
                placeholder="Tìm tên, mã NV, email..."
                value={memberSearchQuery}
                onChange={(e) => setMemberSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px 8px 34px",
                  borderRadius: "10px",
                  border: "1px solid var(--border-soft)",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              />
              <div style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-sub)" }}>
                <Icon name="search" size={14} />
              </div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* 2. BẢNG DANH SÁCH NHÂN SỰ TẠI ĐƠN VỊ (SCOPED ACCESS TABLE) */}
          {/* =============================================================== */}
          <section
            className="panel"
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "24px",
              border: "1px solid var(--border-soft)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e2e8f0", color: "var(--text-sub)", fontSize: "12px", textTransform: "uppercase" }}>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>NHÂN SỰ</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>LOẠI BỔ NHIỆM</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>CHỨC DANH TẠI ĐƠN VỊ</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>VAI TRÒ & QUYỀN HẠN (SCOPED)</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>THỜI HẠN HIỆU LỰC</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>TRẠNG THÁI</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800, textAlign: "right" }}>THAO TÁC</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((m) => {
                    const isPrimary = m.appointmentType === "primary";
                    const isExpiringSoon = m.daysRemaining && m.daysRemaining <= 7;

                    return (
                      <tr
                        key={m.id}
                        style={{
                          borderBottom: "1px solid var(--border-soft)",
                          background: m.status === "revoked" ? "#fef2f2" : isExpiringSoon ? "#fffdf5" : "white",
                          transition: "background 0.15s ease",
                        }}
                      >
                        {/* 1. Nhân sự */}
                        <td style={{ padding: "16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "12px",
                                background: m.avatarColor,
                                color: "white",
                                fontWeight: 900,
                                fontSize: "15px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              {m.avatarInitials}
                            </div>
                            <div>
                              <b style={{ fontSize: "15px", color: "var(--text-main)", display: "block" }}>
                                {m.fullName}
                              </b>
                              <span style={{ fontSize: "12px", fontFamily: "monospace", color: "var(--text-sub)", fontWeight: 700 }}>
                                {m.empCode} · {m.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 2. Loại bổ nhiệm */}
                        <td style={{ padding: "16px" }}>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: 800,
                              background: isPrimary ? "#dbeafe" : "#f3e8ff",
                              color: isPrimary ? "#1e40af" : "#7e22ce",
                              border: isPrimary ? "1px solid #bfdbfe" : "1px solid #e9d5ff",
                              display: "inline-block",
                            }}
                          >
                            {isPrimary ? "⭐ Bổ nhiệm Chính (100%)" : `⚡ Kiêm nhiệm (${m.allocationPercentage}%)`}
                          </span>
                        </td>

                        {/* 3. Chức danh tại đơn vị */}
                        <td style={{ padding: "16px", fontWeight: 700, color: "var(--text-main)" }}>
                          {m.jobTitleInUnit}
                        </td>

                        {/* 4. Vai trò & Quyền hạn (Scoped Roles & Nuclear Tooltip) */}
                        <td style={{ padding: "16px" }}>
                          <div
                            style={{ display: "flex", gap: "6px", flexWrap: "wrap", cursor: "help" }}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setHoveredPermissions({
                                x: rect.left,
                                y: rect.bottom + 8,
                                list: m.granularPermissions,
                                name: m.fullName,
                              });
                            }}
                            onMouseLeave={() => setHoveredPermissions(null)}
                          >
                            {m.scopedRoles.map((r, idx) => {
                              const st = getRoleBadgeStyle(r);
                              return (
                                <span
                                  key={idx}
                                  style={{
                                    padding: "4px 9px",
                                    borderRadius: "8px",
                                    fontSize: "12px",
                                    fontWeight: 900,
                                    background: st.bg,
                                    color: st.text,
                                    border: `1px solid ${st.border}`,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  <span>{st.icon}</span> {r}
                                </span>
                              );
                            })}
                          </div>
                        </td>

                        {/* 5. Thời hạn hiệu lực */}
                        <td style={{ padding: "16px", fontSize: "13px" }}>
                          <div style={{ color: "var(--text-main)", fontWeight: 700 }}>
                            {m.effectiveFrom} → {m.effectiveTo === "indefinite" ? "Vô thời hạn" : m.effectiveTo}
                          </div>
                          {isExpiringSoon && (
                            <span
                              style={{
                                background: "#fef3c7",
                                color: "#92400e",
                                border: "1px solid #fde68a",
                                padding: "2px 6px",
                                borderRadius: "6px",
                                fontSize: "11px",
                                fontWeight: 800,
                                display: "inline-block",
                                marginTop: "3px",
                              }}
                            >
                              ⚠️ Sắp hết hạn: {m.daysRemaining} ngày
                            </span>
                          )}
                        </td>

                        {/* 6. Trạng thái quyền */}
                        <td style={{ padding: "16px" }}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              fontSize: "12px",
                              fontWeight: 800,
                              color:
                                m.status === "active"
                                  ? "#059669"
                                  : m.status === "scheduled_revocation"
                                  ? "#d97706"
                                  : m.status === "locked"
                                  ? "#64748b"
                                  : "#dc2626",
                            }}
                          >
                            <span
                              style={{
                                width: "7px",
                                height: "7px",
                                borderRadius: "50%",
                                background:
                                  m.status === "active"
                                    ? "#10b981"
                                    : m.status === "scheduled_revocation"
                                    ? "#f59e0b"
                                    : m.status === "locked"
                                    ? "#94a3b8"
                                    : "#ef4444",
                              }}
                            />
                            {m.statusLabel}
                          </span>
                        </td>

                        {/* 7. Thao tác Actions */}
                        <td style={{ padding: "16px", textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                            {/* Chuyển giao quyền & bàn giao */}
                            <button
                              onClick={() => {
                                setSelectedMember(m);
                                setIsTransferHandoverOpen(true);
                              }}
                              style={{
                                padding: "6px 10px",
                                fontSize: "12px",
                                fontWeight: 700,
                                borderRadius: "8px",
                                background: "white",
                                border: "1px solid var(--border-soft)",
                                color: "#1e40af",
                                cursor: "pointer",
                              }}
                              title="Chuyển giao quyền & bàn giao duyệt đơn"
                            >
                              ⇄ Bàn giao
                            </button>

                            {/* Lên lịch thu hồi */}
                            <button
                              onClick={() => {
                                setSelectedMember(m);
                                setIsScheduledRevokeOpen(true);
                              }}
                              style={{
                                padding: "6px 10px",
                                fontSize: "12px",
                                fontWeight: 700,
                                borderRadius: "8px",
                                background: "white",
                                border: "1px solid var(--border-soft)",
                                color: "#d97706",
                                cursor: "pointer",
                              }}
                              title="Lên lịch thu hồi quyền theo mốc thời gian"
                            >
                              ⏳ Lên lịch
                            </button>

                            {/* Thu hồi quyền ngay (Màu đỏ) */}
                            <button
                              onClick={() => {
                                setSelectedMember(m);
                                setIsInstantRevokeOpen(true);
                              }}
                              style={{
                                padding: "6px 10px",
                                fontSize: "12px",
                                fontWeight: 800,
                                borderRadius: "8px",
                                background: "#fef2f2",
                                border: "1px solid #fecaca",
                                color: "#dc2626",
                                cursor: "pointer",
                              }}
                              title="Thu hồi quyền hạn ngay lập tức (Kèm phân tích tác động)"
                            >
                              🚫 Thu hồi
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* ===================================================================== */}
      {/* 3. HOVER TOOLTIP: QUYỀN HẠT NHÂN CỤ THỂ (GRANULAR PERMISSIONS) */}
      {/* ===================================================================== */}
      {hoveredPermissions && (
        <div
          style={{
            position: "fixed",
            left: hoveredPermissions.x,
            top: hoveredPermissions.y,
            background: "#0f172a",
            color: "white",
            padding: "12px 16px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
            zIndex: 99999,
            maxWidth: "340px",
            pointerEvents: "none",
            fontSize: "12px",
          }}
        >
          <b style={{ color: "#38bdf8", display: "block", marginBottom: "6px" }}>
            🔑 Quyền hạt nhân tại đơn vị ({hoveredPermissions.name}):
          </b>
          <ul style={{ margin: 0, paddingLeft: "16px", lineHeight: "1.6" }}>
            {hoveredPermissions.list.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. MODAL THU HỒI QUYỀN KỊCH BẢN A: THU HỒI NGAY LẬP TỨC (IMPACT ANALYSIS) */}
      {/* ===================================================================== */}
      {isInstantRevokeOpen && selectedMember && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setIsInstantRevokeOpen(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              width: "100%",
              maxWidth: "620px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
              border: "2px solid #ef4444",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal Cảnh báo Đỏ */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: "#fee2e2",
                  color: "#dc2626",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  flexShrink: 0,
                }}
              >
                ⚠️
              </div>
              <div>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#dc2626", textTransform: "uppercase" }}>
                  CRITICAL ACCESS REVOCATION
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)", margin: "2px 0 0 0" }}>
                  Thu hồi quyền hạn tại {activeNode.name}
                </h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "var(--text-sub)" }}>
                  Nhân sự: <b>{selectedMember.fullName}</b> ({selectedMember.empCode})
                </p>
              </div>
            </div>

            <form onSubmit={handleConfirmInstantRevoke} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* BẢNG PHÂN TÍCH TÁC ĐỘNG (IMPACT ANALYSIS) */}
              <div
                style={{
                  background: "#fff1f2",
                  border: "1.5px solid #fecdd3",
                  borderRadius: "16px",
                  padding: "18px",
                }}
              >
                <b style={{ fontSize: "14px", color: "#9f1239", display: "block", marginBottom: "8px" }}>
                  🔍 BẢNG PHÂN TÍCH TÁC ĐỘNG HỆ THỐNG (IMPACT ANALYSIS):
                </b>

                {/* Quyền sẽ mất */}
                <div style={{ marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#be123c" }}>1. QUYỀN HẠN SẼ BỊ VÔ HIỆU HÓA NGAY:</span>
                  <ul style={{ margin: "4px 0 0 0", paddingLeft: "18px", fontSize: "13px", color: "#881337" }}>
                    {selectedMember.granularPermissions.map((p, idx) => (
                      <li key={idx}>🚫 {p}</li>
                    ))}
                  </ul>
                </div>

                {/* Cảnh báo đơn từ đang chờ xử lý */}
                <div
                  style={{
                    background: "white",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid #f43f5e",
                  }}
                >
                  <b style={{ color: "#e11d48", fontSize: "13px", display: "block" }}>
                    ⚡ Cảnh báo Đơn từ đang chờ phê duyệt (Pending Approvals):
                  </b>
                  <p style={{ margin: "4px 0 8px 0", fontSize: "13px", color: "#475569" }}>
                    Nhân sự này hiện đang phụ trách: <b>{selectedMember.pendingApprovalsCount.leaveRequests}</b> đơn nghỉ phép, <b>{selectedMember.pendingApprovalsCount.recruitmentRequisitions}</b> yêu cầu tuyển dụng và <b>{selectedMember.pendingApprovalsCount.expenseClaims}</b> đề xuất chi phí đang chờ xử lý!
                  </p>

                  {/* Tùy chọn xử lý đơn */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
                      <input
                        type="radio"
                        name="handoverChoice"
                        checked={revokeHandoverChoice === "delegate"}
                        onChange={() => setRevokeHandoverChoice("delegate")}
                      />
                      (o) Tự động chuyển giao toàn bộ đơn chờ duyệt sang cho Quản lý thay thế:
                    </label>

                    {revokeHandoverChoice === "delegate" && (
                      <select
                        value={revokeDelegateeId}
                        onChange={(e) => setRevokeDelegateeId(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          borderRadius: "10px",
                          border: "1px solid #cbd5e1",
                          fontSize: "13px",
                          fontWeight: 700,
                          background: "#f8fafc",
                          marginLeft: "24px",
                        }}
                      >
                        {members
                          .filter((m) => m.id !== selectedMember.id)
                          .map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.fullName} ({m.jobTitleInUnit} - {m.scopedRoles.join(", ")})
                            </option>
                          ))}
                      </select>
                    )}

                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
                      <input
                        type="radio"
                        name="handoverChoice"
                        checked={revokeHandoverChoice === "escalate"}
                        onChange={() => setRevokeHandoverChoice("escalate")}
                      />
                      ( ) Trả về trạng thái Chờ (Escalate lên cấp trên trực tiếp: {activeNode.headName})
                    </label>
                  </div>
                </div>
              </div>

              {/* Lý do thu hồi */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Lý do thu hồi quyền <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <select
                  value={revokeReason}
                  onChange={(e) => setRevokeReason(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "13px",
                    fontWeight: 700,
                    background: "white",
                  }}
                  required
                >
                  <option value="Điều chuyển công tác nội bộ">Điều chuyển công tác nội bộ</option>
                  <option value="Hết hạn nhiệm vụ dự án / Biệt phái">Hết hạn nhiệm vụ dự án / Biệt phái</option>
                  <option value="Tái cơ cấu sơ đồ phòng ban">Tái cơ cấu sơ đồ phòng ban</option>
                  <option value="Vi phạm chính sách bảo mật IAM">Vi phạm chính sách bảo mật IAM</option>
                  <option value="Nhân sự chủ động xin rút">Nhân sự chủ động xin rút</option>
                  <option value="Khác">Lý do khác...</option>
                </select>
              </div>

              {/* Ghi chú thêm */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Ghi chú kiểm toán (Lưu vết Audit Log)
                </label>
                <textarea
                  rows={2}
                  value={revokeNote}
                  onChange={(e) => setRevokeNote(e.target.value)}
                  placeholder="Nhập số quyết định hoặc thông tin đối chiếu..."
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "13px",
                    resize: "none",
                  }}
                />
              </div>

              {/* Checkbox cam kết an toàn */}
              <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "12px", border: "1px solid var(--border-soft)" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", fontWeight: 800, color: "#991b1b", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={revokeConfirmChecked}
                    onChange={(e) => setRevokeConfirmChecked(e.target.checked)}
                    style={{ marginTop: "2px", width: "18px", height: "18px", cursor: "pointer" }}
                    required
                  />
                  <span>
                    Tôi đã hiểu rằng thao tác này sẽ tước bỏ toàn bộ quyền hạn tại đơn vị này ngay lập tức và hành động này được ghi nhận vĩnh viễn vào hệ thống Audit Trail.
                  </span>
                </label>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsInstantRevokeOpen(false)}
                  style={{ padding: "10px 18px", borderRadius: "12px", fontWeight: 800 }}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={!revokeConfirmChecked}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "12px",
                    fontWeight: 900,
                    background: revokeConfirmChecked ? "#dc2626" : "#94a3b8",
                    color: "white",
                    border: "none",
                    cursor: revokeConfirmChecked ? "pointer" : "not-allowed",
                    boxShadow: revokeConfirmChecked ? "0 4px 14px rgba(220, 38, 38, 0.4)" : "none",
                  }}
                >
                  Xác nhận Thu hồi Quyền Ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 5. MODAL KỊCH BẢN B: LÊN LỊCH THU HỒI / KẾT THÚC KIÊM NHIỆM */}
      {/* ===================================================================== */}
      {isScheduledRevokeOpen && selectedMember && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setIsScheduledRevokeOpen(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              width: "100%",
              maxWidth: "540px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h3 style={{ fontSize: "19px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                ⏳ Lên lịch Thu hồi / Kết thúc Kiêm nhiệm
              </h3>
              <button
                onClick={() => setIsScheduledRevokeOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-sub)" }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "var(--text-sub)" }}>
              Áp dụng cho nhân sự: <b>{selectedMember.fullName}</b> tại <b>{activeNode.name}</b>.
            </p>

            <form onSubmit={handleConfirmScheduledRevoke} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                    Ngày kết thúc hiệu lực <span style={{ color: "#e11d48" }}>*</span>
                  </label>
                  <input
                    type="date"
                    value={schedEndDate}
                    onChange={(e) => setSchedEndDate(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                    Thời gian chính xác
                  </label>
                  <input
                    type="text"
                    value={schedEndTime}
                    onChange={(e) => setSchedEndTime(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 700, fontFamily: "monospace" }}
                  />
                </div>
              </div>

              <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "12px", border: "1px solid var(--border-soft)" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={schedNotifyEmail}
                    onChange={(e) => setSchedNotifyEmail(e.target.checked)}
                    style={{ width: "18px", height: "18px" }}
                  />
                  <span>Tự động gửi email thông báo cho nhân sự trước 3 ngày trước khi đóng quyền</span>
                </label>
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Lý do lên lịch kết thúc
                </label>
                <textarea
                  rows={2}
                  value={schedReason}
                  onChange={(e) => setSchedReason(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontSize: "13px", resize: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "10px" }}>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsScheduledRevokeOpen(false)}
                  style={{ padding: "10px 18px", borderRadius: "12px", fontWeight: 800 }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="primary"
                  style={{ padding: "10px 22px", borderRadius: "12px", fontWeight: 800, background: "#d97706" }}
                >
                  Lưu lịch thu hồi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 6. MODAL KỊCH BẢN C: BÀN GIAO & THU HỒI KHI ĐIỀU CHUYỂN CÔNG TÁC */}
      {/* ===================================================================== */}
      {isTransferHandoverOpen && selectedMember && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setIsTransferHandoverOpen(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h3 style={{ fontSize: "19px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                ⇄ Bàn giao & Thu hồi khi Điều chuyển
              </h3>
              <button
                onClick={() => setIsTransferHandoverOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-sub)" }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <form onSubmit={handleConfirmTransferHandover} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Bước 1 */}
              <div>
                <b style={{ fontSize: "14px", color: "#1e40af", display: "block", marginBottom: "8px" }}>
                  Bước 1: Chọn Đơn vị mới (Destination Unit)
                </b>
                <select
                  value={transferDestDept}
                  onChange={(e) => setTransferDestDept(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                >
                  <option value="Phòng Phát triển Sản phẩm (Product Development)">Phòng Phát triển Sản phẩm (DEP-PROD)</option>
                  <option value="Phòng Dữ liệu & AI (Data & Intelligence)">Phòng Dữ liệu & AI (DEP-DATA)</option>
                  <option value="Ban Dự án ERP Quốc tế">Ban Dự án ERP Quốc tế (PRJ-ERP)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Ngày bắt đầu hiệu lực tại đơn vị mới
                </label>
                <input
                  type="date"
                  value={transferEffectiveDate}
                  onChange={(e) => setTransferEffectiveDate(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                  required
                />
              </div>

              {/* Bước 2 */}
              <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "14px", border: "1px solid var(--border-soft)" }}>
                <b style={{ fontSize: "14px", color: "#1e40af", display: "block", marginBottom: "10px" }}>
                  Bước 2: Xử lý quyền tại Phòng ban hiện tại ({activeNode.name})
                </b>

                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer", marginBottom: "10px" }}>
                  <input
                    type="checkbox"
                    checked={transferRevokeSourceRoles}
                    onChange={(e) => setTransferRevokeSourceRoles(e.target.checked)}
                    style={{ width: "18px", height: "18px" }}
                  />
                  <span>Tự động thu hồi quyền Quản lý [Dept Head / Line Manager] tại phòng cũ vào 23:59 ngày trước</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer", marginBottom: "8px" }}>
                  <input
                    type="checkbox"
                    checked={transferDelegateApprovals}
                    onChange={(e) => setTransferDelegateApprovals(e.target.checked)}
                    style={{ width: "18px", height: "18px" }}
                  />
                  <span>Bàn giao toàn bộ quyền duyệt đơn (Delegation) cho nhân sự tiếp quản:</span>
                </label>

                {transferDelegateApprovals && (
                  <select
                    value={transferDelegateeId}
                    onChange={(e) => setTransferDelegateeId(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", fontWeight: 700, background: "white", marginTop: "4px" }}
                  >
                    {members
                      .filter((m) => m.id !== selectedMember.id)
                      .map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.fullName} ({m.jobTitleInUnit})
                        </option>
                      ))}
                  </select>
                )}
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "10px" }}>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsTransferHandoverOpen(false)}
                  style={{ padding: "10px 18px", borderRadius: "12px", fontWeight: 800 }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="primary"
                  style={{ padding: "10px 24px", borderRadius: "12px", fontWeight: 800, background: "#1e40af" }}
                >
                  Xác nhận Bàn giao & Điều chuyển
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 7. MODAL: + THÊM NHÂN SỰ & GÁN QUYỀN VÀO ĐƠN VỊ */}
      {/* ===================================================================== */}
      {isGrantModalOpen && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setIsGrantModalOpen(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              width: "100%",
              maxWidth: "560px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <div>
                <h3 style={{ fontSize: "19px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                  Thêm Nhân sự & Gán Quyền vào Đơn vị
                </h3>
                <p style={{ margin: "3px 0 0 0", fontSize: "13px", color: "var(--text-sub)" }}>
                  Đơn vị thụ hưởng: <b>{activeNode.name}</b>
                </p>
              </div>
              <button
                onClick={() => setIsGrantModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-sub)" }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <form onSubmit={handleGrantAccess} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Họ và tên nhân sự <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Đỗ Thu Hà"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                    Loại bổ nhiệm
                  </label>
                  <select
                    value={newMemberType}
                    onChange={(e) => setNewMemberType(e.target.value as AppointmentType)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                  >
                    <option value="concurrent">⚡ Kiêm nhiệm (Concurrent)</option>
                    <option value="primary">⭐ Bổ nhiệm Chính (Primary)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                    Tỷ lệ phân bổ (%)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={100}
                    value={newMemberAllocation}
                    onChange={(e) => setNewMemberAllocation(Number(e.target.value))}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Chức danh tại đơn vị <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Senior Specialist Advisor"
                  value={newMemberJobTitle}
                  onChange={(e) => setNewMemberJobTitle(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 600 }}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                    Vai trò Scoped IAM
                  </label>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value as ScopedRoleType)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                  >
                    <option value="Reviewer">🔍 Reviewer (Thẩm định)</option>
                    <option value="Line Manager">🎯 Line Manager (Quản lý trực tiếp)</option>
                    <option value="Member">👤 Member (Thành viên)</option>
                    <option value="Dept Head">👑 Dept Head (Trưởng đơn vị)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                    Thời hạn hiệu lực đến
                  </label>
                  <input
                    type="date"
                    value={newMemberExpiry}
                    onChange={(e) => setNewMemberExpiry(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "10px" }}>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsGrantModalOpen(false)}
                  style={{ padding: "10px 18px", borderRadius: "12px", fontWeight: 800 }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="primary"
                  style={{ padding: "10px 24px", borderRadius: "12px", fontWeight: 800, background: "#1e40af" }}
                >
                  Cấp quyền & Bổ nhiệm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 8. DRAWER: NHẬT KÝ KIỂM TOÁN THU HỒI & CẤP PHÁT (AUDIT TRAIL LOG) */}
      {/* ===================================================================== */}
      {isAuditDrawerOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={() => setIsAuditDrawerOpen(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "560px",
              height: "100%",
              background: "white",
              boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.15)",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 900, color: "var(--text-sub)", letterSpacing: "0.8px" }}>
                  ENTERPRISE AUDIT TRAIL LOG
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)", margin: "2px 0 0 0" }}>
                  Sổ Nhật ký Phân quyền IAM
                </h3>
              </div>
              <button
                onClick={() => setIsAuditDrawerOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-sub)" }}
              >
                <Icon name="close" size={22} />
              </button>
            </div>

            <p style={{ margin: 0, fontSize: "13px", color: "var(--text-sub)", fontWeight: 600 }}>
              Ghi nhận toàn bộ thao tác Cấp phát, Thu hồi, Lên lịch và Bàn giao quyền hạn tại các đơn vị tổ chức.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "10px" }}>
              {auditLogs.map((log) => {
                const isRevoke = log.actionType.includes("REVOKE");
                const isTransfer = log.actionType.includes("TRANSFER");

                return (
                  <div
                    key={log.id}
                    style={{
                      background: "#f8fafc",
                      borderRadius: "16px",
                      padding: "16px",
                      border: "1px solid var(--border-soft)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 900,
                          background: isRevoke ? "#fee2e2" : isTransfer ? "#eff6ff" : "#ecfdf5",
                          color: isRevoke ? "#dc2626" : isTransfer ? "#1e40af" : "#059669",
                        }}
                      >
                        {log.actionBadge}
                      </span>
                      <small style={{ color: "var(--text-sub)", fontWeight: 700 }}>{log.timestamp}</small>
                    </div>

                    <b style={{ fontSize: "14px", color: "var(--text-main)", display: "block" }}>
                      {log.targetEmployee}
                    </b>
                    <span style={{ fontSize: "12px", color: "#1e40af", fontWeight: 700 }}>{log.targetUnit}</span>

                    <p style={{ margin: "6px 0 4px 0", fontSize: "13px", color: "var(--text-main)" }}>
                      {log.details}
                    </p>

                    {log.delegatedTo && (
                      <div style={{ fontSize: "12px", color: "#059669", fontWeight: 700 }}>
                        👤 Người nhận bàn giao duyệt đơn: <b>{log.delegatedTo}</b>
                      </div>
                    )}

                    <div style={{ fontSize: "12px", color: "var(--text-sub)", marginTop: "4px" }}>
                      Lý do: <i>{log.reason}</i> · Thực hiện bởi: <b>{log.actor}</b>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
