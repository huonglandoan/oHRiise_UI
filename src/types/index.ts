export interface UserProfilePermissions {
  id: string;
  name: string;
  title: string;
  initials: string;
  scope: string;
  customRoleName: string;
  permissions: {
    canApproveRequests: boolean; // Approval Hub
    canManageEmployees: boolean; // Employee Directory & Drawer
    canManageRecruitment: boolean; // Recruitment Kanban
    canManagePayroll: boolean; // Payroll Sync
    canViewAnalytics: boolean; // Analytics Charts
    canManagePolicies: boolean; // Policy Config
    canManageAdmin: boolean; // System Admin & RBAC
    canMonitorAttendanceLive: boolean; // Live HR Attendance Monitor
    canManageAttendanceApproval: boolean; // HR Attendance Adjustment Approval Center
  };
}

export const DYNAMIC_PROFILES: Record<string, UserProfilePermissions> = {
  emp_standard: {
    id: "emp_standard",
    name: "Nguyễn Minh Anh",
    title: "Product Designer",
    initials: "MA",
    scope: "Hồ Chí Minh",
    customRoleName: "Nhân viên (Tiêu chuẩn)",
    permissions: {
      canApproveRequests: false,
      canManageEmployees: false,
      canManageRecruitment: false,
      canManagePayroll: false,
      canViewAnalytics: false,
      canManagePolicies: false,
      canManageAdmin: false,
      canMonitorAttendanceLive: false,
      canManageAttendanceApproval: false,
    },
  },
  emp_delegated_lead: {
    id: "emp_delegated_lead",
    name: "Trần Bảo Linh",
    title: "Senior Developer",
    initials: "BL",
    scope: "Dev Team Direct",
    customRoleName: "Nhân viên + Được gán quyền Duyệt Team & Tuyển dụng",
    permissions: {
      canApproveRequests: true,
      canManageEmployees: false,
      canManageRecruitment: true,
      canManagePayroll: false,
      canViewAnalytics: true,
      canManagePolicies: false,
      canManageAdmin: false,
      canMonitorAttendanceLive: false,
      canManageAttendanceApproval: false,
    },
  },
  lead_manager: {
    id: "lead_manager",
    name: "Trần Hoàng Nam",
    title: "Engineering Lead",
    initials: "HN",
    scope: "Product Development",
    customRoleName: "Trưởng phòng (Phê duyệt & Team Lead)",
    permissions: {
      canApproveRequests: true,
      canManageEmployees: true,
      canManageRecruitment: true,
      canManagePayroll: false,
      canViewAnalytics: true,
      canManagePolicies: false,
      canManageAdmin: false,
      canMonitorAttendanceLive: false,
      canManageAttendanceApproval: false,
    },
  },
  hr_ops: {
    id: "hr_ops",
    name: "Lê Khánh Linh",
    title: "HR Operations Specialist",
    initials: "KL",
    scope: "Chi nhánh Hồ Chí Minh",
    customRoleName: "Chuyên viên HR Chi nhánh",
    permissions: {
      canApproveRequests: true,
      canManageEmployees: true,
      canManageRecruitment: true,
      canManagePayroll: true,
      canViewAnalytics: true,
      canManagePolicies: true,
      canManageAdmin: false,
      canMonitorAttendanceLive: true,
      canManageAttendanceApproval: true,
    },
  },
  system_admin: {
    id: "system_admin",
    name: "Vũ Thanh Tùng",
    title: "System Administrator",
    initials: "TT",
    scope: "Toàn bộ hệ thống",
    customRoleName: "Quản trị Hệ thống & Phân quyền RBAC",
    permissions: {
      canApproveRequests: true,
      canManageEmployees: true,
      canManageRecruitment: true,
      canManagePayroll: true,
      canViewAnalytics: true,
      canManagePolicies: true,
      canManageAdmin: true,
      canMonitorAttendanceLive: true,
      canManageAttendanceApproval: true,
    },
  },
};

export type ProfileKey = string;
export type Page =
  | "dashboard"
  | "attendance"
  | "live_attendance"
  | "overtime"
  | "wfh"
  | "leave"
  | "expense"
  | "payslip"
  | "team"
  | "profile"
  | "contracts"
  | "devices"
  | "leave_approval"
  | "schedule"
  | "resignation"
  | "notifications"
  | "ai"
  | "approvals"
  | "employees"
  | "recruitment"
  | "payroll"
  | "analytics"
  | "policies"
  | "admin"
  | "rbac"
  | "branches"
  | "system"
  | "wfh_approval";
